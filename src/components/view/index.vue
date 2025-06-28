<script lang="ts" setup>
import type { RkViewProps } from "$rk"

const props = withDefaults(defineProps<RkViewProps>(), {
  scroll: true,
  viewClass: "",
})

const contentClass = computed(() => {
  return `${props.viewClass} p-4`
})
console.log(contentClass.value, "content-class=")
</script>

<template>
  <n-scrollbar v-if="scroll" :content-class="contentClass">
    <slot />
  </n-scrollbar>
  <div v-else class="h-full" :class="contentClass">
    <slot />
  </div>
</template>
