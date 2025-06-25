import type { TabItem } from "$ra"
import { useRakitRouter } from "$ra/router"

export function useTabs() {
  const { homePath } = useRakitRouter()

  // 当前激活的标签页
  const activeTab = ref<string>(homePath)

  // 标签页列表
  const model = ref<TabItem[]>([
    { key: homePath, title: "首页", closable: false, count: 1 },
  ])

  function setActive(value: string = "") {
    activeTab.value = value
  }

  // 添加标签页
  function addTab(tab: Omit<TabItem, "count"> & { count?: number }) {
    const existTab = model.value.find(item => item.key === tab.key)

    if (!existTab) {
      // 新增标签
      model.value.push({
        ...tab,
        count: tab.count || 1,
      })
    }
    else {
      // 更新已存在的标签
      existTab.count++
    }

    // 更新激活的标签
    activeTab.value = tab.key
  }

  // 切换标签
  function switchTab(key: string) {
    activeTab.value = key
    const existTab = model.value.find(item => item.key === key)
    if (existTab) {
      existTab.count++
    }
  }

  // 关闭标签页
  function closeTab(key: string) {
    // 不允许关闭首页
    if (key === homePath) { return }

    const index = model.value.findIndex(item => item.key === key)

    if (index !== -1) {
      // 如果关闭的是当前激活的标签页，则激活前一个标签页
      if (key === activeTab.value) {
        activeTab.value = model.value[index - 1]?.key || homePath
      }

      // 移除标签
      model.value.splice(index, 1)
    }
  }

  // 关闭其他标签页
  function closeOtherTabs(key: string) {
    model.value = model.value.filter((item: TabItem) => item.key === key || item.key === homePath)
    activeTab.value = key
  }

  // 关闭所有可关闭的标签页
  function closeAllTabs() {
    model.value = model.value.filter((item: TabItem) => !item.closable)
    activeTab.value = homePath
  }

  // 仅移除标签，不改变activeTab（用于组件层控制路由跳转时序）
  function remTab(key: string) {
    // 不允许移除首页
    if (key === homePath) { return }

    const index = model.value.findIndex(item => item.key === key)
    if (index !== -1) {
      model.value.splice(index, 1)
    }
  }

  return {
    activeTab,
    model,
    setActive,
    addTab,
    switchTab,
    closeTab,
    closeOtherTabs,
    closeAllTabs,
    remTab,
  }
}
