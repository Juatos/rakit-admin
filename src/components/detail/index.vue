<script setup lang="ts">
import type { KDetailProps } from "$rk"
import { useRender } from "./hooks"

const props = withDefaults(defineProps <KDetailProps>(), {
  column: 2,
  bordered: true,
  labelPlacement: "left",
  size: "medium",
  labelBold: true,
})

const { renderContent } = useRender()

// 计算显示的详情项
const showItems = computed(() => {
  return props.schema.filter((item) => {
    if (typeof item.show === "boolean") {
      return item.show
    }
    if (typeof item.show === "function") {
      return item.show(props.data)
    }
    return true
  })
})

// 计算标签样式
const computedLabelStyle = computed(() => {
  const baseStyle = props.labelStyle || {}
  if (props.labelBold) {
    return {
      ...baseStyle,
      fontWeight: "500",
    }
  }
  return baseStyle
})
</script>

<template>
  <n-descriptions
    :column="column"
    :bordered="bordered"
    :label-placement="labelPlacement"
    :label-style="computedLabelStyle"
    :content-style="contentStyle"
    :size="size"
  >
    <n-descriptions-item
      v-for="item in showItems"
      :key="item.field"
      :label="item.label"
      :span="item.span"
    >
      <component :is="renderContent(item, props.data)" />
    </n-descriptions-item>
  </n-descriptions>
</template>
