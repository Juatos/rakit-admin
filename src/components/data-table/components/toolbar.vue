<script lang="ts" setup>
import type { DropdownOption } from "naive-ui"
import type { TableDensityType } from "../consts"
import type { DTableBatchExtra, DTableColumn, DTableExtra } from "../types"
import { ref, watch } from "vue"
import { COLUMN_SETTING_WIDTH, DEFAULT_TABLE_DENSITY, TABLE_DENSITY_OPTIONS } from "../consts"

const props = withDefaults(defineProps<{
  // 左侧功能按钮
  extras?: (DTableExtra | DTableBatchExtra)[]

  // 表格列配置
  columns?: DTableColumn[]
  // 选中的行数据
  selectedRows?: any[]
}>(), {
  extras: () => [],
  columns: () => [],
  selectedRows: () => [],
})

const emit = defineEmits<{
  // 刷新事件
  refresh: []
  // 切换表格密度/高度
  toggleDensity: [density: TableDensityType]
  // 列设置事件
  columnSetting: [columns: DTableColumn[]]
}>()

// 表格密度选项
const densityOptions: DropdownOption[] = TABLE_DENSITY_OPTIONS

// 当前表格密度
const currentDensity = ref<TableDensityType>(DEFAULT_TABLE_DENSITY)

// 处理密度切换
function handleDensityChange(key: string) {
  currentDensity.value = key as TableDensityType
  emit("toggleDensity", key as TableDensityType)
}

// 处理刷新
function handleRefresh() {
  emit("refresh")
}

// 列设置下拉框显示状态
const showColumnSetting = ref(false)

// 关闭列设置弹窗
function handleCloseColumnSetting() {
  showColumnSetting.value = false
}

// 获取列标题
function getColumnTitle(column: DTableColumn): string {
  if (!column.title) { return "未命名" }
  return typeof column.title === "function" ? "未命名" : column.title
}

// 内部列配置
const columnList = ref<Array<DTableColumn & { checked: boolean }>>([])

// 初始化列配置
function initColumns() {
  if (!props.columns) { return }
  columnList.value = props.columns.map(col => ({
    ...col,
    checked: col.hidden !== true,
  }))
}

// 监听显示状态变化
watch(() => showColumnSetting.value, (visible) => {
  if (visible) {
    initColumns()
  }
})

// 应用列配置变更
function applyColumnChange() {
  const result = columnList.value.map((col, idx) => ({
    ...col,
    hidden: !col.checked,
    // 更新排序
    index: idx,
  }))
  emit("columnSetting", result)
}

// 处理单行复选框变化
function handleCheckboxChange(idx: number) {
  columnList.value[idx].checked = !columnList.value[idx].checked
  // 直接应用更改
  applyColumnChange()
}

// 重置列配置
function handleResetColumns() {
  emit("columnSetting", [])
  handleCloseColumnSetting()
}

// 拖动开始时的索引
const dragStartIdx = ref(-1)

// 开始拖动
function handleDragStart(idx: number) {
  dragStartIdx.value = idx
}

// 放置元素
function handleDrop(idx: number) {
  if (dragStartIdx.value === -1 || dragStartIdx.value === idx) { return }

  // 交换元素
  const dragItem = columnList.value[dragStartIdx.value]
  columnList.value.splice(dragStartIdx.value, 1)
  columnList.value.splice(idx, 0, dragItem)

  dragStartIdx.value = -1

  // 拖拽后直接应用更改
  applyColumnChange()
}

// 拖动经过元素
function handleDragOver(e: DragEvent) {
  e.preventDefault()
}

// 判断是否为批量操作按钮
function isBatchFunc(func: DTableExtra | DTableBatchExtra): func is DTableBatchExtra {
  return "isBatch" in func && func.isBatch
}
</script>

<template>
  <n-flex class="w-full px-0 mb-3" align="center" justify="space-between">
    <!-- 左侧操作按钮区 -->
    <div class="flex items-center gap-2">
      <template v-for="(func, idx) in extras" :key="idx">
        <!-- 批量操作按钮 -->
        <template v-if="isBatchFunc(func)">
          <k-button
            v-if="!func.show || func.show(selectedRows)"
            class="text-sm"
            :type="func.type || 'default'"
            :icon="func.icon || ''"
            :title="func.label"
            :disabled="func.disabled ? func.disabled(selectedRows) : false"
            @click="() => func.handler(selectedRows)"
          />
        </template>

        <!-- 普通功能按钮 -->
        <template v-else>
          <k-button
            v-if="typeof func.show === 'function' ? func.show() : func.show !== false"
            class="text-sm"
            :type="func.type || 'default'"
            :icon="func.icon || ''"
            :title="func.label"
            :disabled="typeof func.disabled === 'function' ? func.disabled() : func.disabled"
            @click="func.handler"
          />
        </template>
      </template>
      <slot name="actions" />
    </div>

    <!-- 右侧工具区 -->
    <n-flex :size="4" class="flex-1" justify="flex-end" align="center" :wrap="false">
      <!-- 刷新按钮 -->
      <n-button quaternary circle class="text-base hover:bg-gray-100" title="刷新" @click="handleRefresh">
        <template #icon>
          <k-icon name="kit:refresh" size="18" />
        </template>
      </n-button>

      <!-- 表格密度下拉菜单 -->
      <n-dropdown trigger="click" :options="densityOptions" @select="handleDensityChange">
        <n-button quaternary circle class="text-base hover:bg-gray-100" title="表格密度">
          <template #icon>
            <k-icon name="kit:column-density" size="20" />
          </template>
        </n-button>
      </n-dropdown>

      <!-- 列设置下拉菜单 -->
      <n-popover
        v-if="columns"
        trigger="click"
        placement="bottom-end"
        :show="showColumnSetting"
        class="p-0 w-250px"
        @update:show="showColumnSetting = $event"
      >
        <template #trigger>
          <n-button quaternary circle class="text-base hover:bg-gray-100" title="列设置">
            <template #icon>
              <k-icon name="kit:column-todo" size="20" />
            </template>
          </n-button>
        </template>

        <div :class="`w-${COLUMN_SETTING_WIDTH} p-3`">
          <div class="flex justify-between items-center mb-4">
            <span class="text-primary text-16px font-500">列展示 / 排序</span>
            <n-button text type="primary" class="font-500" @click="handleResetColumns">
              重置
            </n-button>
          </div>

          <!-- 列表项 -->
          <div class="max-h-400px overflow-y-auto scrollbar scrollbar-track-transparent scrollbar-thumb-gray-200 scrollbar-thumb-rounded scrollbar-w-1">
            <div
              v-for="(column, idx) in columnList"
              :key="idx"
              class="flex items-center py-2 cursor-move border-b border-gray-100 hover:bg-gray-50"
              draggable="true"
              @dragstart="handleDragStart(idx)"
              @dragover="handleDragOver"
              @drop="handleDrop(idx)"
            >
              <n-flex align="center" justify="space-between" class="w-full">
                <div class="flex items-center">
                  <span class="mr-2 text-gray-400 inline-flex items-center h-full">
                    <k-icon name="kit:sort-dots" />
                  </span>
                  <n-checkbox
                    :checked="column.checked"
                    class="flex items-center"
                    @click="handleCheckboxChange(idx)"
                  />
                  <span class="ml-2 flex items-center">{{ getColumnTitle(column) }}</span>
                </div>
              </n-flex>
            </div>
          </div>
        </div>
      </n-popover>

      <slot name="tools" />
    </n-flex>
  </n-flex>
</template>

<style scoped>
/* 使用UnoCSS替代原有的自定义滚动条样式 */
</style>
