<script setup lang="ts">
import type { DTableAction } from "$rk"
import { isEmpty } from "radash"

interface Props {
  row: any
  index: number
  actions: DTableAction[]
}

withDefaults(defineProps<Props>(), {})

// 判断按钮是否显示
function isShow(action: DTableAction, row: any, idx?: number) {
  if (!isEmpty(action?.show)) {
    return typeof action.show === "function" ? action?.show(row, idx) : action.show
  }
  return true
}

// 判断按钮是否禁用
function isDisabled(action: DTableAction, row: any, idx?: number) {
  if (!isEmpty(action?.disabled)) {
    return typeof action.disabled === "function" ? action?.disabled(row, idx) : action.disabled
  }
  return false
}

// 点击按钮时调用操作函数
function handleClick(action: DTableAction, row: any, index: number) {
  action.handler(row, index)
}
</script>

<template>
  <n-flex justify="center">
    <rk-button
      v-for="(action, idx) in actions"
      v-show="isShow(action, row, idx)"
      :key="idx"
      :type="action.type || 'default'"
      size="small"
      text
      :icon="String(action.icon)"
      :title="action.label"
      :disabled="isDisabled(action, row, idx)"
      @click="handleClick(action, row, index)"
    />
  </n-flex>
</template>
