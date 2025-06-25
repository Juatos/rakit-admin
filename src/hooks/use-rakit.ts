import type { DrawerInstance, ModalInstance } from "$ra/components/provider/hook"
import type {
  DialogProviderInst,
  LoadingBarProviderInst,
  MessageProviderInst,
  NotificationProviderInst,
} from "naive-ui"
import { manager as http } from "$ra/http/manager"
import { useRakitRouter } from "$ra/router"
import { useAdminStore } from "$ra/stores"
import { useTheme } from "$ra/themes"
import { createDiscreteApi } from "naive-ui"

// 定义返回类型接口
interface SmartContext {
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

export function useRakit(): SmartContext {
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
