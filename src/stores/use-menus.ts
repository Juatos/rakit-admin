import type { ExtendedMenuItem, MenuList } from "$kit"

export function useMenus() {
  const isCollapsed = ref<boolean>(false)
  const isActive = ref<string>("")
  const isAllowCollapsed = ref<boolean>(true)
  const menuList = ref<MenuList>([])

  // 右侧菜单收缩切换
  function toggleCollapsed() {
    isCollapsed.value = !isCollapsed.value
  }

  function setAllowCollapsed(value: boolean) {
    isAllowCollapsed.value = value
    isCollapsed.value = !value
  }

  // 设置菜单列表
  function setMenuList(list: MenuList) {
    menuList.value = list
  }

  // 设置当前激活的菜单
  function setActive(value: string = "") {
    isActive.value = value
  }

  // 检查菜单项是否匹配给定路径
  function isMenuItemMatch(item: ExtendedMenuItem, path: string): boolean {
    return item.path === path || item.route === path
  }

  // 递归查找菜单项的标题
  function findMenuTitle(path: string): string {
    const findInMenu = (items: MenuList): string => {
      for (const item of items) {
        if (isMenuItemMatch(item, path)) {
          return item.title
        }
        if (item.children) {
          const found = findInMenu(item.children)
          if (found) { return found }
        }
      }
      return ""
    }

    return findInMenu(menuList.value)
  }

  return {
    isCollapsed,
    isAllowCollapsed,
    isActive,
    menuList,
    toggleCollapsed,
    setAllowCollapsed,
    setMenuList,
    setActive,
    findMenuTitle,
  }
}
