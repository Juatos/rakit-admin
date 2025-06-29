<script lang="ts" setup="">
import { useRakit } from "$rk"
import { useToggle, useWindowSize } from "@vueuse/core"
import LayoutFooter from "./components/layout-footer.vue"
import LayoutHeader from "./components/layout-header.vue"
import LayoutSider from "./components/layout-sider.vue"
import LayoutTabs from "./components/layout-tabs.vue"
import LayoutView from "./components/layout-view.vue"

const { layoutStore } = useRakit()

// 创建组件引用
const viewRef = ref<InstanceType<typeof LayoutView>>()

// 局部全屏状态管理
const [isPartialFullscreen, togglePartialFullscreen] = useToggle(false)

// 提供刷新方法给LayoutTabs组件
provide("refreshCurrentRoute", () => {
  viewRef.value?.refresh()
})

// 响应式窗口大小
const { width } = useWindowSize()

function initMenuCollapsed() {
  const { menuStore } = useRakit()
  if (width.value < 860 && menuStore.isAllowCollapsed) {
    menuStore.setAllowCollapsed(false)
  }
  if (width.value >= 860 && !menuStore.isAllowCollapsed) {
    menuStore.setAllowCollapsed(true)
  }
}

watch(() => width.value, initMenuCollapsed)
onMounted(() => {
  initMenuCollapsed()
})

// 提供全屏切换方法给子组件
provide("togglePartialFullscreen", togglePartialFullscreen)
provide("isPartialFullscreen", readonly(isPartialFullscreen))
</script>

<template>
  <n-layout has-sider class="w-full h-full">
    <LayoutSider v-show="!isPartialFullscreen" />
    <n-layout
      class="h-full flex flex-col overflow-hidden"
      content-class="overflow-hidden"
      :class="{ 'w-full': isPartialFullscreen }"
    >
      <LayoutHeader v-show="!isPartialFullscreen" />
      <LayoutTabs />
      <LayoutView ref="viewRef" />
      <LayoutFooter v-if="layoutStore.footer.show" />
    </n-layout>
  </n-layout>
</template>
