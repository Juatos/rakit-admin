/// <reference types="vite/client" />
declare global {
  export interface Window {
    $loadingBar?: import("naive-ui").LoadingBarProviderInst | any
    $dialog?: import("naive-ui").DialogProviderInst | any
    $message?: import("naive-ui").MessageProviderInst | any
    $notification?: import("naive-ui").NotificationProviderInst | any
    $drawer?: import("./components/provider/hook").DrawerInstance
    $modal?: import("./components/provider/hook").ModalInstance
    $pinia?: import("pinia").Pinia | any
  }
}

declare module "vue" {
  export interface GlobalComponents {
    RaCard: typeof import("@rakit/admin")["Card"]
    RaIcon: typeof import("@rakit/admin")["Icon"]
    RaButton: typeof import("@rakit/admin")["Button"]
    RaModal: typeof import("@rakit/admin")["Modal"]
    RaDrawer: typeof import("@rakit/admin")["Drawer"]
    RaForm: typeof import("@rakit/admin")["Form"]
    RaDataTable: typeof import("@rakit/admin")["DataTable"]
    RaDetail: typeof import("@rakit/admin")["Detail"]
    RaProvider: typeof import("@rakit/admin")["Provider"]
  }
}

// 声明Vue文件模块
declare module "*.vue" {
  import type { DefineComponent } from "vue"

  const component: DefineComponent<Record<string, any>, Record<string, any>, any>
  export default component
}

declare module "*.md" {
  import type { DefineComponent } from "vue"

  const component: DefineComponent<Record<string, any>, Record<string, any>, any>
  export default component
}

export {}
