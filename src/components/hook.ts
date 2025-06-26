import type { App } from "vue"
import { Button } from "./button/index"
import { Card } from "./card/index"
import { DataTable } from "./data-table/index"
import { Detail } from "./detail/index"
import { Drawer } from "./drawer/index"
import { Form } from "./form/index"
import { Icon } from "./icon/index"
import { Modal } from "./modal/index"
import { Provider } from "./provider/index"

export function setupComponent(app: App) {
  // 全局注册组件
  app.component("rk-button", Button)
  app.component("rk-card", Card)
  app.component("rk-data-table", DataTable)
  app.component("rk-detail", Detail)
  app.component("rk-form", Form)
  app.component("rk-icon", Icon)
  app.component("rk-modal", Modal)
  app.component("rk-drawer", Drawer)
  app.component("rk-provider", Provider)
}
