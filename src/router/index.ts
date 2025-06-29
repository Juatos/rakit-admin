import type { SetupRouterOption } from "$rk"
import type { App } from "vue"
import { RouterManager as manager } from "./manager"

export function useRakitRouter() {
  const router = manager.getRouter()
  const defaultRoute = manager.getDefaultRoute()

  return {
    router,
    defaultRoute: defaultRoute.path,
    defaultRouteTitle: defaultRoute.title,
  }
}

// 路由初始化
export async function setupRouter(app: App, option: SetupRouterOption) {
  option.component = () => import("../layouts/main/index.vue")
  await manager.init(option)
  const router = manager.getRouter()
  app.use(router)
  await router.isReady()
}
