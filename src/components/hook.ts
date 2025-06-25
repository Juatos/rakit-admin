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

export function setupSmartUI(app: App) {
  // 全局注册组件
  app.component("ra-button", Button)
  app.component("ra-card", Card)
  app.component("ra-data-table", DataTable)
  app.component("ra-detail", Detail)
  app.component("ra-form", Form)
  app.component("ra-icon", Icon)
  app.component("ra-modal", Modal)
  app.component("ra-drawer", Drawer)
  app.component("ra-provider", Provider)
}
