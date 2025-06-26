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
    KCard: typeof import("@rakit/admin")["Card"]
    KIcon: typeof import("@rakit/admin")["Icon"]
    KButton: typeof import("@rakit/admin")["Button"]
    KModal: typeof import("@rakit/admin")["Modal"]
    KDrawer: typeof import("@rakit/admin")["Drawer"]
    KForm: typeof import("@rakit/admin")["Form"]
    KDataTable: typeof import("@rakit/admin")["DataTable"]
    KDetail: typeof import("@rakit/admin")["Detail"]
    KProvider: typeof import("@rakit/admin")["Provider"]
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
