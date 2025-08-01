import type { CrumbItem, MenuList } from "$rk"
import { useRakitRouter } from "$rk/router"

export type CrumbList = CrumbItem[]
export function useCrumbs() {
  const { defaultRoute, defaultRouteTitle } = useRakitRouter()

  // 当前显示的面包屑
  const model = ref<CrumbItem[]>([{ title: defaultRouteTitle, path: defaultRoute, icon: "rk:home" }])

  // 面包屑映射缓存 (route => curmbStore)
  const mapping = ref<Record<string, CrumbList>>({})

  // 设置面包屑
  function setCrumbs(route: string = "", crumbList: CrumbList = [], override: boolean = false) {
    // 为空代表访问的是非菜单页面，不设置面包屑
    if (crumbList.length === 0) {
      model.value = []
      return
    }

    // 如果当前路由已经存在面包屑，且不允许覆盖，则直接返回
    if (mapping.value?.[route] && !override) {
      model.value = mapping.value[route]
      return
    }

    // 直接更新mapping和model
    mapping.value[route] = crumbList
    model.value = crumbList
  }

  // 删除面包屑[可批量]
  function remCrumbs(routes: string[]) {
    routes.forEach((route) => {
      delete mapping.value[route]
    })
  }

  // 从菜单列表生成面包屑路径
  function findMenuPath(path: string, menuList: MenuList): CrumbItem[] {
    // 如果是首页，直接返回首页面包屑
    if (path === defaultRoute) {
      return [{ title: defaultRouteTitle, path: defaultRoute, icon: "rk:home" }]
    }

    const result: CrumbItem[] = []

    const findPath = (items: MenuList, parentPath: CrumbItem[] = []): boolean => {
      for (const item of items) {
        const itemPath = item.path || item.route

        // 只有叶子节点才可跳转，非叶子节点不设置path
        const crumbItem: CrumbItem = {
          title: item.title,
          path: item.isLeaf !== false && !item.children ? itemPath : undefined,
          icon: item.iconName, // 使用iconName字段
        }
        const currentPath = [...parentPath, crumbItem]

        if (item.path === path || item.route === path) {
          result.push(...currentPath)
          return true
        }

        if (item.children && findPath(item.children, currentPath)) {
          return true
        }
      }

      return false
    }

    findPath(menuList)

    // 如果没有找到匹配的菜单项，返回空数组
    if (result.length === 0) {
      return []
    }

    return result
  }

  return {
    model,
    setCrumbs,
    remCrumbs,
    findMenuPath,
  }
}
