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
  app.component("k-button", Button)
  app.component("k-card", Card)
  app.component("k-data-table", DataTable)
  app.component("k-detail", Detail)
  app.component("k-form", Form)
  app.component("k-icon", Icon)
  app.component("k-modal", Modal)
  app.component("k-drawer", Drawer)
  app.component("k-provider", Provider)
}
