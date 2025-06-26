import type { Component } from "vue"
import { Splash as DefaultSPlash } from "$kit"
import { setupComponent } from "$kit/components/hook"
import { setupHttp } from "$kit/http"
import { setupRouter } from "$kit/router"
import { setupStore } from "$kit/stores"
import { setupTheme } from "$kit/themes"

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
