import type { DTableProps, DTableSearchFn, DTableSearchForm } from "$kit"
import type { PaginationProps } from "naive-ui"
import { sleep } from "radash"
import { computed, ref } from "vue"
import { PAGE_SIZES } from "../consts"

export function useTable(onSearch: DTableSearchFn, props?: DTableProps) {
  // 搜索表单状态
  const form = ref<DTableSearchForm>({})
  const spin = ref(false)
  const dataSource = ref<any[]>([])
  const total = ref<number>(0)
  const current = ref<number>(1)
  const pageSize = ref<number>(
    props?.pagination && typeof props.pagination === "object"
      ? props.pagination.size
      : 10,
  )

  // 获取数据的核心方法
  async function handleSearch() {
    spin.value = true
    try {
      // 根据 pagination 的配置决定是否传入分页参数
      const queries = props?.pagination !== false
        ? { page: current.value, pageSize: pageSize.value, ...form.value }
        : form.value

      await sleep(200)
      const result = await onSearch(queries)
      total.value = result?.total || 0
      dataSource.value = result?.dataSource || []
    }
    catch (error) {
      console.error("获取数据时出错:", error)
    }
    finally {
      spin.value = false
    }
  }

  // 计算分页配置
  const pagination = computed<PaginationProps | false>(() => {
    if (props?.pagination === false) {
      return false
    }

    return {
      page: current.value,
      pageSize: pageSize.value,
      itemCount: total.value,
      pageSizes: PAGE_SIZES,
      showSizePicker: true,
      prefix: ({ itemCount }: { itemCount: number }) => `共 ${itemCount} 条`,
      onChange: async (page: number) => {
        current.value = page
        await handleSearch()
      },
      onUpdatePageSize: async (size: number) => {
        pageSize.value = size
        current.value = 1
        await handleSearch()
      },
    } as PaginationProps
  })

  return {
    spin,
    form,
    dataSource,
    pagination,
    handleSearch,
  }
}
