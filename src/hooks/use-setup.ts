import type { Component } from "vue"
import { Splash as DefaultSPlash } from "$rk"
import { setupComponent } from "$rk/components/hook"
import { setupHttp } from "$rk/http"
import { setupRouter } from "$rk/router"
import { setupStore } from "$rk/stores"
import { setupTheme } from "$rk/themes"

function setupSplash(component?: Component) {
  const app = createApp(component || DefaultSPlash)

  app.mount("#app")

  return () => app.unmount()
}

export function useSetup() {
  return {
    initSplash: setupSplash,
    initRouter: setupRouter,
    initTheme: setupTheme,
    initStore: setupStore,
    initComponent: setupComponent,
    initHttp: setupHttp,
  }
}
