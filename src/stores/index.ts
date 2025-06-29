import type { Pinia } from "pinia"
import type { App } from "vue"
import { useRakitRouter } from "$rk/router"
import { defineStore } from "pinia"
import { useCrumbs } from "./use-crumbs.ts"
import { useLayouts } from "./use-layouts"
import { useMenus } from "./use-menus"
import { useTabs } from "./use-tabs"

// 导出类型
export type { CrumbItem, ExtendedMenuItem, MenuItem, MenuList, TabItem } from "./types"
export type { CrumbList } from "./use-crumbs"

// 统一的 admin store
export const adminStore = defineStore("rakit-admin", () => {
  // 初始化各个模块
  const tabStore = useTabs()
  const menuStore = useMenus()
  const curmbStore = useCrumbs()
  const layoutStore = useLayouts()

  // 集成业务逻辑：设置激活菜单时同步更新标签和面包屑
  function setActiveTab(value: string) {
    // 查找对应的菜单标题
    const menuTitle = menuStore.findMenuTitle(value)
    // 查找菜单对应的面包屑
    const menuCrumbs = curmbStore.findMenuPath(value, menuStore.menuList.value)
    // 访问非菜单的页面，不设置tab/面包屑/和菜单激活状态
    if (!menuTitle && menuCrumbs.length === 0) {
      menuStore.setActive()
      curmbStore.setCrumbs()
      tabStore.setActive()
      return
    }

    // 更新激活菜单
    menuStore.setActive(value)
    // 更新面包屑显示
    curmbStore.setCrumbs(value, menuCrumbs)
    // 添加或更新标签
    tabStore.addTab({
      key: value,
      title: menuTitle,
      closable: value !== useRakitRouter().homePath,
      count: 1,
    })
  }

  // 切换标签时同步更新激活状态和面包屑
  function switchTab(key: string) {
    tabStore.switchTab(key)
    menuStore.setActive(key)

    // 更新面包屑
    const menuCrumbs = curmbStore.findMenuPath(key, menuStore.menuList.value)
    curmbStore.setCrumbs(key, menuCrumbs)
  }

  // 扩展的关闭标签方法，同步更新激活状态
  function closeTab(key: string) {
    // 收集要删除的curmbStore key
    const keysToRemove = [key]

    // 直接委托给 tabStore 模块处理
    tabStore.closeTab(key)

    // 同步删除对应的curmbStore mapping
    curmbStore.remCrumbs(keysToRemove)

    // 同步更新菜单和面包屑
    menuStore.setActive(tabStore.activeTab.value)
    const menuCrumbs = curmbStore.findMenuPath(tabStore.activeTab.value, menuStore.menuList.value)
    curmbStore.setCrumbs(tabStore.activeTab.value, menuCrumbs)
  }

  // 关闭其他标签页
  function closeOtherTabs(key: string) {
    // 收集要删除的标签keys
    const keysToRemove = tabStore.model.value
      .filter((item: any) => item.key !== key && item.key !== useRakitRouter().homePath)
      .map((item: any) => item.key)

    tabStore.closeOtherTabs(key)

    // 批量删除对应的curmbStore mapping
    curmbStore.remCrumbs(keysToRemove)

    // 关闭其他标签时，只更新状态，不触发路由跳转（由组件层处理）
    switchTab(key)
  }

  // 关闭所有标签页
  function closeAllTabs() {
    // 收集要删除的标签keys
    const keysToRemove = tabStore.model.value
      .filter((item: any) => item.closable)
      .map((item: any) => item.key)

    const { homePath } = useRakitRouter()
    // 关闭所有标签时，只更新状态，不触发路由跳转（由组件层处理）
    switchTab(homePath)

    // 然后关闭所有可关闭的标签页
    tabStore.closeAllTabs()

    // 批量删除对应的curmbStore mapping
    curmbStore.remCrumbs(keysToRemove)
  }

  // 扩展：仅移除标签的方法，同步删除curmbStore
  function remTab(key: string) {
    // 收集要删除的curmbStore key
    const keysToRemove = [key]

    // 移除标签
    tabStore.remTab(key)

    // 同步删除对应的curmbStore mapping
    curmbStore.remCrumbs(keysToRemove)
  }

  return {
    // 菜单模块
    menuStore,
    // 标签模块
    tabStore,
    // 面包屑模块
    curmbStore,
    // 布局模块
    layoutStore,

    // 集成方法
    setActiveTab,
    switchTab,
    closeTab,
    closeOtherTabs,
    closeAllTabs,
    remTab,
  }
})

export function useAdminStore() {
  return adminStore(window.$pinia)
}

export function setupStore(app: App, pinia: Pinia) {
  // 创建 Pinia 实例，并明确禁用 devtools
  window.$pinia = pinia

  // 修改 Pinia 的 _p 属性，移除 devtools 插件
  // @ts-expect-error - 访问内部属性
  if (pinia._p) {
    // @ts-expect-error - 访问内部属性
    pinia._p = pinia._p.filter((plugin: any) =>
      !plugin.toString().includes("devtools"),
    )
  }

  app.use(pinia)
}
