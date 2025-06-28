<script lang="ts" setup>
import type { KCardProps } from "$rk"
import { computed } from "vue"

const props = withDefaults(defineProps<KCardProps>(), {
  spin: false,
  title: "",
  bordered: true,
  fillview: false,
})

const cardClass = computed(() => {
  if (props.fillview) {
    return "rk-card rk-card-fillview h-full w-full"
  }
  return "rk-card"
})

const contentClass = computed(() => {
  if (props.fillview) {
    return "!p-0 h-full overflow-auto"
  }
  return "!p-4"
})

const spinContentClass = computed(() => {
  if (props.fillview) {
    return "h-full overflow-auto"
  }
  return "h-full"
})
</script>

<template>
  <n-card
    :class="cardClass"
    :content-class="contentClass"
    :title="title"
    :bordered="bordered"
  >
    <n-scrollbar v-if="fillview" content-class="!p-4">
      <n-spin :show="spin" :content-class="spinContentClass">
        <slot />
      </n-spin>
    </n-scrollbar>
    <n-spin v-else :show="spin" :content-class="spinContentClass">
      <slot />
    </n-spin>
  </n-card>
</template>

<style lang="scss">
.rk-card .n-card-header {
  --at-apply: p-4 p-t-6 p-b-2;
}
</style>
