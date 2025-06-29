import type {
  DefaultRoute,
  NavigationGuardReturn,
  RouteComponent,
  RouterGuard,
  RouterMode,
  SetupRouterOption,
} from "$rk"
import type {
  RouteLocationNormalized,
  RouteRecordRaw,
  RouterHistory,
} from "vue-router"
import { useLoadingBar, useRakit } from "$rk"
import { isArray } from "radash"
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,

} from "vue-router"

const LAYOUT_NAME = "LayoutMain"

const routerModeEnum: Record<RouterMode, (base?: string) => RouterHistory> = {
  hash: createWebHashHistory,
  history: createWebHistory,
  memory: createMemoryHistory,
}

/**
 * 无布局路径管理器
 * 用于管理不需要使用布局的路由路径和路由守卫
 */
class Manager {
  private router: any = null

  private defaultRoute: DefaultRoute = {
    path: "/",
    title: "首页",
  }

  // 存储所有不需要布局的路径
  private rootRoutes: Set<string> = new Set()
  // 存储自定义路由守卫
  private guards: Array<RouterGuard> = []

  public async init(option: SetupRouterOption) {
    option?.defaultRoute && (this.defaultRoute = option.defaultRoute)
    this.initRouter(option)
    this.initNoLayoutRoutes(option?.rootRoutes || [])
    await this.initCustomRoutes(option.modules)
    this.initRouterGuards(option?.guards || [])
  }

  getRouter() {
    return this.router
  }

  getDefaultRoute() {
    return this.defaultRoute
  }

  async initCustomRoutes(modules: Record<string, () => Promise<unknown>>) {
    // 使用正确的glob模式匹配路由文件
    const subRoutes: any[] = []
    const rootRoutes: any[] = []

    for (const i in modules) {
      const path = i.replace("/src", "").replace("/index.vue", "")
      const name = path.split("/").filter((i: string) => i)

      if (name.includes("components")) {
        continue
      }

      // 删除 views 目录
      const viewsIndex = name.indexOf("views")
      if (viewsIndex !== -1) {
        name.splice(viewsIndex, 1)
      }

      const routePath = `/${name.join("/")}`
      const routeName = name.join("-")

      const route = {
        name: routeName,
        path: routePath,
        component: modules[i],
        meta: {},
      }

      // 判断是否需要布局
      if (this.isNoLayoutRoute(routePath)) {
        rootRoutes.push(route)
      }
      else {
        subRoutes.push(route)
      }
    }
    // 添加布局子路由
    await this.addSubRoutes(subRoutes)
    // 添加根路由
    await this.addRootRoutes(rootRoutes)
  }

  // 初始化router
  initRouter(option?: SetupRouterOption) {
    this.router = createRouter({
      history: routerModeEnum[option?.mode || "hash"](),
      routes: [
        {
          path: "/",
          name: LAYOUT_NAME,
          component: option?.component as RouteComponent,
          children: [],
        },
      ],
    })
  }

  initRouterGuards(guard: RouterGuard | RouterGuard[]) {
    this.guards = isArray(guard) ? guard : [guard]
    this.createRouteGuard()
  }

  /**
   * 注册不需要布局的路径
   * @param routes 路径列表
   */
  initNoLayoutRoutes(routes: string[]): void {
    routes.map((route: string) => this.rootRoutes.add(route))
  }

  async addSubRoutes(route: RouteRecordRaw | RouteRecordRaw[]) {
    const routes: RouteRecordRaw[] = isArray(route) ? route : [route]
    routes.forEach((route: RouteRecordRaw) => {
      this.router.addRoute(LAYOUT_NAME, route)
    })
  }

  async addRootRoutes(route: RouteRecordRaw | RouteRecordRaw[]) {
    const routes: RouteRecordRaw[] = isArray(route) ? route : [route]
    routes.forEach((route: RouteRecordRaw) => {
      this.router.addRoute(route)
    })
  }

  createRouteGuard() {
    // 获取 loadingBar 实例
    const bar = useLoadingBar()
    const { tabStore } = useRakit()

    // 路由开始切换时
    this.router.beforeEach(async (to: any, from: any) => {
      // 查找目标路由对应的标签页
      const targetTab = tabStore.model.find(tab => tab.key === to.path)

      // 如果路由不在标签页中，或者是首次访问(count=1)，则显示加载进度条
      if (!targetTab || targetTab.count === 1) {
        // 开始加载进度条
        bar.start()
      }

      // 运行自定义注册的守卫
      const result = await this.runGuards(to, from)

      // 如果返回非true值，说明守卫要求重定向或阻止导航
      if (result !== true) {
        return result
      }

      return true
    })

    // 路由切换完成
    this.router.afterEach(() => {
      // 结束进度条
      bar.finish()
    })

    // 路由切换出错
    this.router.onError((error: any) => {
      console.error("路由错误", error)
      bar.error()
    })
  }

  /**
   * 执行路由守卫
   * @param to 目标路由
   * @param from 来源路由
   * @returns 路由导航结果
   */
  async runGuards(to: RouteLocationNormalized, from: RouteLocationNormalized): Promise<NavigationGuardReturn> {
    for (const guard of this.guards) {
      try {
        const result = await guard(to, from)
        // 如果返回 false 或者是一个路由地址，则中断导航
        if (result === false) {
          return false
        }
        if (typeof result === "string") {
          return { path: result }
        }
        if (result && (typeof result === "object")) {
          return result
        }
      }
      catch (error) {
        console.error("路由守卫执行错误:", error)
        return false
      }
    }
    return true
  }

  /**
   * 检查路径是否不需要布局
   * @param path 要检查的路径
   * @returns 如果路径不需要布局，则返回 true
   */
  isNoLayoutRoute(path: string): boolean {
    return this.rootRoutes.has(path)
  }
}

// 创建单例实例
export const RouterManager = new Manager()
