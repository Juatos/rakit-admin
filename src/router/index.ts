import type { SetupRouterOption } from "$ra"
import type { App } from "vue"
import { RouterManager as manager } from "./manager"

export function useRakitRouter() {
  const router = manager.getRouter()
  const homePath = manager.getHomePath()

  return {
    router,
    homePath,
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
