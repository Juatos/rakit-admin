<script lang="ts" setup="">
import type { ButtonProps } from "$rk"

const props = withDefaults(defineProps<ButtonProps>(), {
  icon: "",
  title: "",
})

// 提取除 icon 以外的所有属性
const { icon, title, ...bind } = props
</script>

<template>
  <n-button class="rk-button" v-bind="bind">
    <template #icon>
      <rk-icon :name="icon" size="16" />
    </template>
    <template v-if="title">
      {{ title }}
    </template>
    <slot v-else />
  </n-button>
</template>

<style lang="scss">
.k-button.n-button .n-button__icon {
  margin-right: 2px !important;
}
</style>
