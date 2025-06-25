<script lang="ts" setup>
import type { TableColumns } from "naive-ui/es/data-table/src/interface"
import type { TableDensityType } from "./consts"
import type { DTableColumn, DTableProps } from "./types"
import SearchAlone from "./components/search-alone.vue"
import Toolbar from "./components/toolbar.vue"
import { DEFAULT_TABLE_DENSITY } from "./consts"
import { useColumns } from "./hooks/use-columns"
import { useElement } from "./hooks/use-element"
import { useTable } from "./hooks/use-table"
import Wrapper from "./wrapper.vue"

const props = withDefaults(defineProps<DTableProps>(), {
  isSimple: false,
  showToolbar: true,
  rowSelection: false,
  columns: () => [],
  queries: () => [],
  actions: () => [],
  extras: () => [],
  pagination: () => ({ size: 20 }),
})

// 使用搜索钩子
const {
  form,
  spin,
  dataSource,
  pagination: fromatPagination,

  handleSearch,
} = useTable(props.onSearch, props)

const {
  tableHeight,
  maxHeight,
  tableCntRef,
} = useElement(props.showToolbar)

const { formatColumns } = useColumns(props)

const scrollX = ref(formatColumns.value.reduce((acc: any, col: any) => acc + (Number(col.width) || 120), 0))

// 表格密度
const tableDensity = ref<TableDensityType>(DEFAULT_TABLE_DENSITY)

// 选中的行数据
const selectedRowKeys = ref<(string | number)[]>([])
const selectedRows = ref<any[]>([])

// 表格选择配置
const rowSelectionConfig = computed(() => {
  if (!props.rowSelection) {
    return null
  }

  return {
    type: "checkbox",
    onChange: (keys: (string | number)[], rows: any[]) => {
      selectedRowKeys.value = keys
      selectedRows.value = rows
    },
  }
})

// 列配置（不包含操作列）
const originalColumnsWithoutAction = computed(() => {
  return formatColumns.value.filter((col: any) => col.key !== "_action_")
})

// 列配置
const columnsConfig = ref<DTableColumn[]>([...originalColumnsWithoutAction.value])

// 当前实际显示的列
const displayColumns = computed<TableColumns>(() => {
  // 先过滤掉 show 为 false 的列
  const visibleColumns = formatColumns.value.filter((col) => {
    if (col.show === undefined) { return true }
    if (typeof col.show === "boolean") { return col.show }
    if (typeof col.show === "function") { return col.show() }
    return true
  })

  // 如果有自定义列配置，按照配置的顺序和显示状态过滤
  if (columnsConfig.value.length > 0) {
    // 过滤且排序后的列表
    const filterSortColumns = [...columnsConfig.value]
      .sort((a, b) => (a.index ?? 999) - (b.index ?? 999))
      .filter(col => !col.hidden)
      .filter((col) => {
        if (col.show === undefined) { return true }
        if (typeof col.show === "boolean") { return col.show }
        if (typeof col.show === "function") { return col.show() }
        return true
      })

    // 应用操作列处理
    if (props.actions?.length) {
      // 查找原始列中的操作栏列
      const actionCol = visibleColumns.find((col: any) => col.key === "_action_")

      // 如果原始列中有操作列，则添加回来
      if (actionCol) {
        filterSortColumns.push(actionCol)
      }
    }

    return filterSortColumns as TableColumns
  }

  // 否则返回过滤后的列
  return visibleColumns as TableColumns
})

// 处理表格刷新
async function handleRefresh() {
  await handleSearch()
}

// 处理表格密度切换
function handleToggleDensity(density: TableDensityType) {
  tableDensity.value = density
}

// 处理列设置
function handleColumnSetting(columns: DTableColumn[]) {
  if (columns.length === 0) {
    // 重置列设置
    columnsConfig.value = [...originalColumnsWithoutAction.value]
    return
  }

  // 应用新的列设置
  columnsConfig.value = columns
}

// 初始加载数据
onMounted(async () => {
  await handleSearch()
})

// 暴露方法和数据
defineExpose({
  handleSearch,
})
</script>

<template>
  <n-flex vertical size="medium" class="w-full h-full overflow-hidden">
    <!-- 搜索区域 -->
    <search-alone
      v-if="queries?.length > 0 && !isSimple"
      v-model:form="form"
      :queries="queries"
      @search="handleSearch"
    />

    <!-- 表格区域 -->
    <Wrapper ref="tableCntRef" :is-simple="isSimple" class="flex-1" :spin="spin">
      <!-- 工具栏 -->
      <toolbar
        v-if="showToolbar"
        :extras="extras"
        :columns="originalColumnsWithoutAction"
        :selected-rows="selectedRows"
        @refresh="handleRefresh"
        @toggle-density="handleToggleDensity"
        @column-setting="handleColumnSetting"
      >
        <!-- 自定义操作按钮插槽 -->
        <template #actions>
          <slot name="actions" />
        </template>

        <!-- 自定义工具插槽 -->
        <template #tools>
          <slot name="tools" />
        </template>
      </toolbar>

      <!-- 表格 -->
      <n-data-table
        :style="{ 'max-height': `${tableHeight}px` }"
        :max-height="maxHeight"
        :scroll-x="scrollX"
        :columns="displayColumns"
        :data="dataSource"
        :pagination="fromatPagination"
        :size="tableDensity"
        :row-key="(row: any) => row.id"
        :row-selection="rowSelectionConfig"
        empty="暂无数据"
        remote
      />
    </Wrapper>
  </n-flex>
</template>
