<script lang="ts" setup="">
import type { ButtonProps } from "$ra"

const props = withDefaults(defineProps<ButtonProps>(), {
  icon: "",
  title: "",
})

// 提取除 icon 以外的所有属性
const { icon, title, ...bind } = props
</script>

<template>
  <n-button class="ra-button" v-bind="bind">
    <template #icon>
      <ra-icon :name="icon" size="16" />
    </template>
    <template v-if="title">
      {{ title }}
    </template>
    <slot v-else />
  </n-button>
</template>

<style lang="scss">
.ra-button.n-button .n-button__icon {
  margin-right: 2px !important;
}
</style>
