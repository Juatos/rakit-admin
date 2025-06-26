<script lang="ts" setup>
import type { DropdownOption } from "naive-ui"
import { useRakit } from "$rk"

const { store, router, homePath, tabs } = useRakit()

// 注入刷新方法
const refreshCurrentRoute = inject<() => void>("refreshCurrentRoute")

// 注入局部全屏状态和切换方法
const togglePartialFullscreen = inject<() => void>("togglePartialFullscreen")
const isPartialFullscreen = inject<Readonly<Ref<boolean>>>("isPartialFullscreen")

const hoverIndex = ref<number>(-9)

const hiddenDividerCollection = computed<number[]>(() => {
  const activeIndex = tabs.model.findIndex(tab => tab.key === tabs.activeTab)
  const tabIndex = activeIndex === -1 ? -2 : activeIndex
  return [
    hoverIndex.value,
    hoverIndex.value + 1,
    tabIndex,
    tabIndex + 1,
    0, // 始终隐藏第一个标签（首页）左侧的分隔线
  ]
})

// 添加滚动区域的引用
const scrollableTabsRef = ref<HTMLElement | null>(null)

// 初始化时将首页标签居中
onMounted(() => {
  // 首页默认居中
  nextTick(() => {
    centerHomeTab()
  })
})

// 监听 activeTab 的变化，实现标签居中
watch(() => tabs.activeTab, () => {
  nextTick(() => {
    if (tabs.activeTab === homePath) {
      centerHomeTab()
      return
    }

    const activeTabEl = document.querySelector(`[data-key="${tabs.activeTab}"]`) as HTMLElement
    const scrollContainer = scrollableTabsRef.value

    if (activeTabEl && scrollContainer) {
      const containerWidth = scrollContainer.clientWidth
      const tabWidth = activeTabEl.offsetWidth
      const tabLeft = activeTabEl.offsetLeft

      // 计算目标滚动位置，使标签居中
      const targetScroll = tabLeft - (containerWidth - tabWidth) / 2

      // 确保不会滚动超出边界
      const maxScroll = scrollContainer.scrollWidth - containerWidth
      const finalScroll = Math.max(0, Math.min(targetScroll, maxScroll))

      scrollContainer.scrollTo({
        left: finalScroll,
        behavior: "smooth",
      })
    }
  })
}, { immediate: true })

// 首页居中函数
function centerHomeTab() {
  const homeTabEl = document.querySelector(`[data-key="${homePath}"]`) as HTMLElement
  const scrollContainer = scrollableTabsRef.value

  if (homeTabEl && scrollContainer) {
    const containerWidth = scrollContainer.clientWidth
    const tabWidth = homeTabEl.offsetWidth

    // 计算居中位置
    const targetScroll = (homeTabEl.offsetLeft - (containerWidth - tabWidth) / 2)

    // 确保不会滚动超出边界
    const maxScroll = Math.max(0, scrollContainer.scrollWidth - containerWidth)
    const finalScroll = Math.max(0, Math.min(targetScroll, maxScroll))

    scrollContainer.scrollTo({
      left: finalScroll,
      behavior: "smooth",
    })
  }
}

function switchTab(key: string) {
  // 不让 store.switchTab 进行路由跳转，由组件自己处理
  store.switchTab(key)
  // 组件级别的路由跳转
  router.push(key)
}

// 下拉菜单选项
const dropdownOptions = computed(() => {
  const options: DropdownOption[] = []

  // 如果当前不是首页，添加"关闭当前标签页"选项
  if (tabs.activeTab !== homePath) {
    options.push({
      label: "关闭当前标签页",
      key: "close-current",
    })
  }

  // 添加其他选项
  options.push(
    {
      label: "关闭其他标签页",
      key: "close-others",
    },
    {
      label: "关闭所有标签页",
      key: "close-all",
    },
  )

  return options
})

// 处理下拉菜单选择
function handleDropdownSelect(key: string | number) {
  const currentActiveTab = tabs.activeTab

  switch (key) {
    case "close-current":
      store.closeTab(tabs.activeTab)
      break
    case "close-others":
      store.closeOtherTabs(tabs.activeTab)
      break
    case "close-all":
      store.closeAllTabs()
      break
  }

  // 检查是否需要路由跳转
  nextTick(() => {
    if (tabs.activeTab !== currentActiveTab) {
      router.push(tabs.activeTab)
    }
  })
}

function handleCloseTab(key: string) {
  const currentActiveTab = tabs.activeTab

  if (key === currentActiveTab) {
    // 如果关闭当前标签，先切换到目标标签（不路由跳转）
    const { homePath } = useRakit()
    const index = tabs.model.findIndex(item => item.key === key)
    const newActiveKey = tabs.model[index - 1]?.key || homePath

    // 先切换activeTab状态，不路由跳转
    store.switchTab(newActiveKey)

    // 自己进行路由跳转，完成后再移除标签
    router.push(newActiveKey).then(() => {
      store.remTab(key)
    })
  }
  else {
    // 如果关闭非当前标签，直接移除（使用store方法）
    store.remTab(key)
  }
}

async function refreshRoute() {
  // 调用注入的刷新方法
  refreshCurrentRoute?.()
}

// 切换局部全屏
function handleToggleFullscreen() {
  togglePartialFullscreen?.()
}
</script>

<template>
  <n-layout-header bordered class="h-36px layout-main">
    <div class="relative h-36px flex w-full">
      <!-- 可滚动的标签区域 -->
      <div
        ref="scrollableTabsRef"
        class="flex flex-1 overflow-x-auto transition-[scroll-left] duration-300 scrollbar-none pl-1"
      >
        <div
          v-for="(tab, i) in tabs.model" :key="i" :data-key="tab.key"
          class="relative mt-3px h-[calc(100%-3px)] px-4px items-center select-none transition-width duration-300"
          :class="{
            'z-20': tab.key === tabs.activeTab,
            'hover:z-1': tab.key !== tabs.activeTab,
          }"
          @click="switchTab(tab.key)"
          @mouseenter="hoverIndex = i"
          @mouseleave="hoverIndex = -9"
        >
          <div class="h-full w-full" :class="{ 'bg-[var(--primary-item-color-active)] rounded-t-10px': tab.key === tabs.activeTab }">
            <n-divider
              v-if="!hiddenDividerCollection.includes(i)"
              class="w-2px! absolute! h-18px left-[-6px] top-7px z-99 bg-[var(--tab-color-divider)]!"
              vertical
            />
            <div
              class="h-30px px-2 gap-0 flex items-center justify-between rounded-10px min-w-85px"
              :class="[
                tab.key === tabs.activeTab ? `bg-[var(--primary-item-color-active)] min-w-105px` : 'hover:bg-[var(--hover-color)]',
                i === 0 ? 'text-center min-w-80px!' : '',
              ]"
            >
              <div
                class="text-[#5f6368] truncate flex-1 text-13px pl-1"
                :class="{ 'text-[var(--tab-color-active)]': tab.key === tabs.activeTab }"
              >
                {{ tab.title }}
              </div>
              <span
                v-if="tab.closable"
                class="flex-center w-4 h-4 ml-2 leading-4 text-center align-middle rounded-full opacity-80 hover:bg-#4d6bfe/30"
                @click.stop="handleCloseTab(tab.key)"
              >
                <rk-icon name="rk:xmark" size="14" class="xmark-icon" />
              </span>
            </div>
            <svg v-if="tab.key === tabs.activeTab" width="10" height="10" class="absolute bottom-0 left-[-6px] color-[var(--primary-item-color-active)]">
              <path d="M 0 10 A 10 10 0 0 0 10 0 L 10 10 Z" fill="currentColor" />
            </svg>
            <svg v-if="tab.key === tabs.activeTab" class="absolute bottom-0 right-[-6px] color-[var(--primary-item-color-active)]" width="10" height="10">
              <path d="M 0 0 A 10 10 0 0 0 10 10 L 0 10 Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
      <!-- 工具栏 -->
      <div
        class="flex items-center h-full shadow-[-4px_0_6px_-4px_rgba(0,0,0,0.08)]"
      >
        <!-- 标签操作下拉菜单按钮 -->
        <n-dropdown
          :options="dropdownOptions"
          placement="bottom-start"
          trigger="click"
          :on-select="handleDropdownSelect"
        >
          <div class="flex-center tool-item tab-dropdown-button">
            <rk-icon name="rk:chevron-down" size="20" class="cursor-pointer" />
          </div>
        </n-dropdown>
        <div class="flex-center tool-item" @click="refreshRoute">
          <rk-icon name="rk:refresh" size="18" class="cursor-pointer" />
        </div>
        <div class="flex-center tool-item" @click="handleToggleFullscreen">
          <rk-icon
            :name="isPartialFullscreen ? 'rk:screen-exit' : 'rk:screen-full'"
            size="20"
            class="cursor-pointer"
          />
        </div>
      </div>
    </div>
  </n-layout-header>
</template>

<style lang="scss">
.scrollbar-none::-webkit-scrollbar {
  display: none;
}

.layout-main {
  /* 自定义工具类 */
  .flex-center {
    --at-apply: flex items-center justify-center;
  }
  .tool-item {
    --at-apply: w-36px h36px relative;
    border-left: 1px solid var(--border-color);
    &:hover {
      background: var(--hover-color);
    }
  }

  .xmark-icon {
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: rotate(90deg);
    }
  }
}
</style>
