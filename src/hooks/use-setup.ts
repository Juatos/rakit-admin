import type { Component } from "vue"
import { Splash as DefaultSPlash, App as RakitApp, useRakit } from "$rk"
import { setupHttp } from "$rk/http"
import { setupRouter } from "$rk/router"
import { setupStore } from "$rk/stores"
import { setupTheme } from "$rk/themes"
import { createPinia } from "pinia"
import { sleep } from "radash"
import { createApp } from "vue"

function setupSplash(component?: Component) {
  const app = createApp(component || DefaultSPlash)

  app.mount("#app")

  return () => app.unmount()
}

async function setupLayout(config: any) {
  useRakit().layoutStore.setup(config)
}

export async function rakitSetup(rakitConf: any) {
  const app = createApp(RakitApp)

  const callback = setupSplash()
  setupTheme(rakitConf.theme)
  setupStore(app, rakitConf?.pinia?.instance || createPinia())
  setupHttp(rakitConf.http)
  await setupRouter(app, rakitConf.router)
  await setupLayout(rakitConf.layout)

  // 模拟延迟
  await sleep(100)

  // 关闭启动组件, 挂载应用
  callback()
  app.mount("#app")
}
