import type { DrawerInstance, ModalInstance } from "$rk/components/provider/hook"
import type {
  DialogProviderInst,
  LoadingBarProviderInst,
  MessageProviderInst,
  NotificationProviderInst,
} from "naive-ui"
import { manager as http } from "$rk/http/manager"
import { useRakitRouter } from "$rk/router"
import { useAdminStore } from "$rk/stores"
import { useTheme } from "$rk/themes"
import { createDiscreteApi } from "naive-ui"

// 定义返回类型接口
interface RakitContext {
  store: ReturnType<typeof useAdminStore>
  router: ReturnType<typeof useRakitRouter>["router"]
  theme: ReturnType<typeof useTheme>
  homePath: string
  message: MessageProviderInst
  dialog: DialogProviderInst
  notification: NotificationProviderInst
  drawer: DrawerInstance | any
  modal: ModalInstance | any
  // 模块化API
  menus: ReturnType<typeof useAdminStore>["menus"]
  tabs: ReturnType<typeof useAdminStore>["tabs"]
  crumbs: ReturnType<typeof useAdminStore>["crumbs"]
}

export function useRakit(): RakitContext {
  const store = useAdminStore()
  const { router, homePath } = useRakitRouter()

  return {
    store,
    router,
    homePath,
    theme: useTheme(),
    message: window?.$message,
    dialog: window?.$dialog,
    notification: window?.$notification,
    drawer: window?.$drawer,
    modal: window?.$modal,
    // 模块化导出
    menus: store.menus,
    tabs: store.tabs,
    crumbs: store.crumbs,
  }
}

export {
  http,
}

export function useLoadingBar(): LoadingBarProviderInst {
  return createDiscreteApi(["loadingBar"]).loadingBar
}
