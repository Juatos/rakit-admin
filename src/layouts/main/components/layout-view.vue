<script lang="ts" setup>
import type { Ref } from "vue"
import { useRakit } from "$rk"
import { computed, inject, ref, watch } from "vue"

const { tabs, router } = useRakit()

// 注入局部全屏状态
const isPartialFullscreen = inject<Readonly<Ref<boolean>>>("isPartialFullscreen")

// 跟踪已经渲染过的组件
const cachedComponents = ref<Map<string, number>>(new Map())

// 监听tabs变化，清理已关闭标签对应的渲染记录
watch(
  () => tabs.model,
  (newTabs) => {
    // 获取当前存在的标签keys
    const currentTabKeys = new Set(newTabs.map(t => t.key))
    // 记录新添加的标签
    newTabs.forEach((tab) => {
      if (!cachedComponents.value.has(tab.key)) {
        cachedComponents.value.set(tab.key, 0)
      }
    })

    // 清理已关闭标签对应的渲染记录
    cachedComponents.value.forEach((_, key) => {
      if (!currentTabKeys.has(key)) {
        cachedComponents.value.delete(key)
      }
    })
  },
  { immediate: true, deep: true },
)

// 判断路由是否应该被缓存
function shouldCache(path: string) {
  // 只有已经渲染过的组件才使用keep-alive
  return cachedComponents.value.has(path)
}

// 计算内容区域高度
const contentHeight = computed(() => {
  if (isPartialFullscreen?.value) {
    // 全屏模式: 100vh - 标签栏高度(36px) - footer高度(30px)
    return "calc(100vh - 66px)"
  }
  else {
    // 正常模式: 100vh - header(50px) - 标签栏(36px) - footer(30px) - 其他间距
    return "calc(100vh - 116px)"
  }
})

// 提供给父组件调用的刷新方法
function refresh() {
  const routePath = router.currentRoute.value.path
  cachedComponents.value.set(routePath, (cachedComponents.value.get(routePath) || 0) + 1)
}

function getComponentKey(routePath: string) {
  const count = cachedComponents.value.get(routePath) || 0
  return `${routePath}-${count}`
}

// 暴露刷新方法给父组件
defineExpose({ refresh })
</script>

<template>
  <n-layout-content
    :style="{ height: contentHeight }"
    class="shadow-lg p-4 bg-[#4d6bfe]/3 rounded"
    native-scrollbar
  >
    <router-view v-slot="{ Component, route }">
      <template v-if="shouldCache(route.path)">
        <keep-alive>
          <component
            :is="Component"
            :key="getComponentKey(route.path)"
          />
        </keep-alive>
      </template>
      <template v-else>
        <component
          :is="Component"
          :key="route.path"
        />
      </template>
    </router-view>
  </n-layout-content>
</template>
