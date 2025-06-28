<script lang="ts" setup>
import type { IconProps } from "$rk"
import { manager } from "$rk/components/icon/manager"
import { NIcon } from "naive-ui"
import { computed, h, ref } from "vue"

const props = withDefaults(defineProps<IconProps>(), {
  size: "18",
  color: "currentColor",
})

const content = ref<string>("")

async function initContent() {
  try {
    content.value = await manager.getContent(props.name)
  }
  catch (error) {
    console.error("Failed to load icon:", error)
  }
}
watch(
  () => props.name,
  () => initContent(),
)
onMounted(() => {
  initContent()
})

const iconComponent = computed(() => {
  if (!content.value) {
    return ""
  }
  return h(NIcon, {
    size: props.size,
    color: props.color,
    innerHTML: content.value,
    class: "rk-icon",
  })
})
</script>

<template>
  <component :is="iconComponent" v-if="content" />
</template>

<style>
</style>
