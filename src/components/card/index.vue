<script lang="ts" setup>
import type { KCardProps } from "$rk"

withDefaults(defineProps <KCardProps>(), {
  spin: false,
  title: "",
  bordered: true,
})

// const styles = computed(() => ({
//   height: props.over ? '100%' : props.height ? (isNumber(props.height) ? `${props.height}px` : props.height) : 'auto',
// }))
</script>

<template>
  <n-card
    class="rk-card"
    content-class="!p-4"
    :title="title"
    :bordered="bordered"
  >
    <n-spin :show="spin" class="h-full" content-class="h-full">
      <slot />
    </n-spin>
  </n-card>
</template>

<style lang="scss">
</style>
