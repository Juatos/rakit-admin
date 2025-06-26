<script lang="ts" setup>
import type { DTableQueries, DTableQuery, DTableSearchForm } from "$kit"
import { useElementSize } from "@vueuse/core"
import { computed, onMounted, ref } from "vue"

// Props 定义
interface Props {
  // 表单项定义
  queries: DTableQueries
}

const props = defineProps<Props>()

// Emits 定义
const emits = defineEmits<{
  search: []
}>()

// 使用 defineModel 定义表单数据
const form = defineModel<DTableSearchForm>("form", { default: () => ({}) })

// 用于控制搜索区域展开收起状态
const isCollapsed = ref(true)

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}

// 用于测量表单容器的大小
const formContainer = ref(null)
const { width } = useElementSize(formContainer)

// 计算默认值
const defaultValues = computed(() => {
  const defaults: DTableSearchForm = {}
  props.queries.forEach((query) => {
    if (query.defaultValue !== undefined) {
      // 用户设置了默认值，使用用户的值
      defaults[query.field] = query.defaultValue
    }
    else {
      // 用户没有设置默认值，根据组件类型自动设置空值
      switch (query.component) {
        case "input":
          defaults[query.field] = ""
          break
        case "input-number":
          defaults[query.field] = null
          break
        case "select":
          defaults[query.field] = null
          break
        case "date":
        case "datetime":
        case "time":
          defaults[query.field] = null
          break
        case "date-range":
        case "datetime-range":
        case "time-range":
          defaults[query.field] = null
          break
        default:
          // 自定义组件或其他类型，默认为 null
          defaults[query.field] = null
          break
      }
    }
  })
  return defaults
})

// 初始化表单默认值
onMounted(() => {
  // 初始化所有字段的默认值
  form.value = { ...defaultValues.value, ...form.value }
})

// 计算每行可以显示多少表单项
const colCount = computed(() => {
  // 根据容器宽度决定能放下几列，最小为1列
  const minColumns = 1
  const maxColumns = 5
  const containerWidth = width.value

  // 根据容器宽度动态计算列数
  if (containerWidth < 500) { return minColumns }
  if (containerWidth < 920) { return 2 }
  if (containerWidth < 1160) { return 3 }
  if (containerWidth < 1560) { return 4 }
  return maxColumns
})

// 根据当前状态过滤需要显示的表单项
const visibleQueries = computed(() => {
  // 创建 queries 的副本，而不是直接修改 props
  return [...props.queries]
    // .sort((a, b) => a.priority - b.priority)
    .slice(0, isCollapsed.value ? Math.min(props.queries.length, 3) : props.queries.length)
})

// 判断是否需要显示"更多"按钮
const shouldShowToggleButton = computed(() => {
  return props.queries.length > 3
})

// 定义网格单元格类型
interface GridCell {
  type: "form-item" | "button-group" | "empty"
  query?: DTableQuery
  span?: number
}

// 创建网格布局算法
const gridLayout = computed(() => {
  const cols = colCount.value
  const queries = visibleQueries.value
  const cells: GridCell[] = []

  let currentRow = 0
  let currentCol = 0

  // 处理每个表单项
  for (const query of queries) {
    const span = Math.min(query.giSpan || 1, cols) // 确保span不超过总列数

    // 检查当前行是否能放下这个元素
    if (currentCol + span > cols) {
      // 当前行放不下，填充空格并换行
      while (currentCol < cols) {
        cells.push({ type: "empty" })
        currentCol++
      }
      currentRow++
      currentCol = 0
    }

    // 添加表单项
    cells.push({
      type: "form-item",
      query,
      span,
    })

    currentCol += span

    // 如果当前行已满，换行
    if (currentCol >= cols) {
      currentRow++
      currentCol = 0
    }
  }

  // 为按钮组找位置 - 始终放在最后一行的尾部
  const buttonSpan = 1

  // 计算最后一行还能放多少个按钮组
  const remainingCols = cols - currentCol

  if (remainingCols >= buttonSpan) {
    // 当前行能放下按钮组，先填充空格到倒数第二个位置
    const spacesToFill = remainingCols - buttonSpan
    for (let i = 0; i < spacesToFill; i++) {
      cells.push({ type: "empty" })
    }

    // 添加按钮组到最后位置
    cells.push({
      type: "button-group",
      span: buttonSpan,
    })
  }
  else {
    // 当前行放不下，填充当前行剩余空格并换行
    while (currentCol < cols) {
      cells.push({ type: "empty" })
      currentCol++
    }

    // 新行：先填充空格，再在最后位置放按钮组
    for (let i = 0; i < cols - buttonSpan; i++) {
      cells.push({ type: "empty" })
    }

    cells.push({
      type: "button-group",
      span: buttonSpan,
    })
  }

  return {
    cells,
    totalRows: currentRow + 1,
    totalCols: cols,
  }
})

// 处理搜索表单的变化
function handleValueChange(field: string, value: any) {
  form.value = { ...form.value, [field]: value }
}

// 处理搜索
function handleSearch() {
  emits("search")
}

// 处理重置
function handleReset() {
  form.value = { ...defaultValues.value }
  handleSearch()
}
</script>

<template>
  <k-card>
    <div ref="formContainer" class="w-full">
      <n-form inline label-placement="left" :show-feedback="false">
        <n-grid :cols="colCount" :x-gap="36" :y-gap="12">
          <!-- 动态生成网格单元格 -->
          <n-gi v-for="(cell, index) in gridLayout.cells" :key="index" :span="cell.span || 1">
            <!-- 表单项 -->
            <template v-if="cell.type === 'form-item' && cell.query">
              <n-form-item
                :label="cell.query.label"
                class="search-item !mr-0"
                :style="{
                  maxWidth: typeof cell.query.maxWidth === 'number'
                    ? `${cell.query.maxWidth}px`
                    : cell.query.maxWidth,
                }"
              >
                <!-- 根据组件类型渲染不同的表单控件 -->
                <n-input
                  v-if="cell.query.component === 'input'"
                  :value="form[cell.query.field] as any"
                  :placeholder="cell.query.placeholder"
                  clearable
                  v-bind="cell.query.props || {}"
                  @update:value="(val: string) => handleValueChange(cell.query!.field, val)"
                />
                <n-input-number
                  v-else-if="cell.query.component === 'input-number'"
                  :value="form[cell.query.field] as any"
                  :placeholder="cell.query.placeholder"
                  clearable
                  class="w-full"
                  v-bind="cell.query.props || {}"
                  @update:value="(val: number | null) => handleValueChange(cell.query!.field, val)"
                />
                <n-select
                  v-else-if="cell.query.component === 'select'"
                  :value="form[cell.query.field] as any"
                  :options="cell.query.options"
                  :placeholder="cell.query.placeholder"
                  clearable
                  v-bind="cell.query.props || {}"
                  @update:value="(val: string | number | null) => handleValueChange(cell.query!.field, val)"
                />
                <n-date-picker
                  v-else-if="cell.query.component === 'date'"
                  :value="form[cell.query.field] as any"
                  :placeholder="cell.query.placeholder"
                  type="date"
                  clearable
                  class="w-full"
                  v-bind="cell.query.props || {}"
                  @update:value="(val: number | null) => handleValueChange(cell.query!.field, val)"
                />
                <n-date-picker
                  v-else-if="cell.query.component === 'datetime'"
                  :value="form[cell.query.field] as any"
                  :placeholder="cell.query.placeholder"
                  type="datetime"
                  clearable
                  class="w-full"
                  v-bind="cell.query.props || {}"
                  @update:value="(val: number | null) => handleValueChange(cell.query!.field, val)"
                />
                <n-time-picker
                  v-else-if="cell.query.component === 'time'"
                  :value="form[cell.query.field] as any"
                  :placeholder="cell.query.placeholder"
                  clearable
                  class="w-full"
                  v-bind="cell.query.props || {}"
                  @update:value="(val: number | null) => handleValueChange(cell.query!.field, val)"
                />
                <n-date-picker
                  v-else-if="cell.query.component === 'date-range'"
                  :value="form[cell.query.field] as any"
                  :placeholder="cell.query.placeholder"
                  type="daterange"
                  clearable
                  class="w-full"
                  v-bind="cell.query.props || {}"
                  @update:value="(val: [number, number] | null) => handleValueChange(cell.query!.field, val)"
                />
                <n-date-picker
                  v-else-if="cell.query.component === 'datetime-range'"
                  :value="form[cell.query.field] as any"
                  :placeholder="cell.query.placeholder"
                  type="datetimerange"
                  clearable
                  class="w-full"
                  v-bind="cell.query.props || {}"
                  @update:value="(val: [number, number] | null) => handleValueChange(cell.query!.field, val)"
                />
                <n-time-picker
                  v-else-if="cell.query.component === 'time-range'"
                  :value="form[cell.query.field] as any"
                  :placeholder="cell.query.placeholder"
                  is-range
                  clearable
                  class="w-full"
                  v-bind="cell.query.props || {}"
                  @update:value="(val: any) => handleValueChange(cell.query!.field, val)"
                />
                <!-- 自定义组件的渲染逻辑 -->
                <component
                  :is="cell.query.component"
                  v-else
                  :value="form[cell.query.field]"
                  v-bind="cell.query.props || {}"
                  @update:value="(val: any) => handleValueChange(cell.query!.field, val)"
                />
              </n-form-item>
            </template>

            <!-- 按钮组 -->
            <template v-else-if="cell.type === 'button-group'">
              <div class="button-group">
                <n-flex>
                  <n-button v-if="shouldShowToggleButton" size="tiny" text @click="toggleCollapse">
                    {{ isCollapsed ? '更多' : '收起' }}
                    <template #icon>
                      <k-icon v-if="isCollapsed" name="kit:chevron-down" />
                      <k-icon v-else name="kit:chevron-up" />
                    </template>
                  </n-button>
                  <k-button ghost type="warning" icon="kit:trash" title="重置" @click="handleReset" />
                  <k-button type="primary" icon="kit:search" title="搜索" @click="handleSearch" />
                </n-flex>
              </div>
            </template>
          </n-gi>
        </n-grid>
      </n-form>
    </div>
  </k-card>
</template>

<style scoped>
.search-item {
  min-width: 0;
  margin-bottom: 0;
}

/* 让表单项的输入控件自适应宽度 */
.search-item :deep(.n-input),
.search-item :deep(.n-select),
.search-item :deep(.n-input-number),
.search-item :deep(.n-date-picker),
.search-item :deep(.n-time-picker) {
  width: 100%;
}

/* 确保标签和输入框在同一行 */
.search-item :deep(.n-form-item-feedback-wrapper) {
  min-height: 0;
}

.search-item :deep(.n-form-item-label) {
  height: auto;
  line-height: 32px;
}

.button-group {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 32px;
}
</style>
