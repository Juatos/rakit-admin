import type { RouteLocationNormalized, RouteLocationRaw, RouteComponent as VueRouterComponent } from "vue-router"

type Lazy<T> = () => Promise<T>

// 路由守卫类型定义
export type RouterGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => NavigationGuardReturn | Promise<NavigationGuardReturn>

export type NavigationGuardReturn
  = | void
    | boolean
    | RouteLocationRaw
    | Error

export type RouterMode
  = | "hash"
    | "history"
    | "memory"

export type RouteComponent = VueRouterComponent | Lazy<VueRouterComponent>

export interface SetupRouterOption {
  // 路由模式
  mode: RouterMode
  // 布局组件
  component: RouteComponent | string
  guards?: RouterGuard | RouterGuard[]
  // 跟路由
  rootRoutes?: string[]
  homePath: string
  modules: Record<string, () => Promise<unknown>>
}
