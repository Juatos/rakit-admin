<script lang="ts" setup>
import type { IconProps } from "$ra"
import { manager } from "$ra/components/icon/manager"
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

  // const [collection, name] = props.name?.split(":")
  // if (collection && name) {
  //   try {
  //     const iconServer = getIconServer()
  //     const response = await fetch(`${iconServer}${collection}/${name}.svg`)
  //     content.value = await response.text()
  //   }
  //   catch (error) {
  //     console.error("Failed to load icon:", error)
  //   }
  // }
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
    class: "ra-icon",
  })
})
</script>

<template>
  <component :is="iconComponent" v-if="content" class="ra-icon" />
</template>

<style>
</style>
