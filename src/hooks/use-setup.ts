import type { Component } from "vue"
import { Splash as DefaultSPlash } from "$ra"
import { setupSmartUI } from "$ra/components/hook"
import { setupHttp } from "$ra/http"
import { setupRouter } from "$ra/router"
import { setupStore } from "$ra/stores"
import { setupTheme } from "$ra/themes"

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
    initSmartUI: setupSmartUI,
    initHttp: setupHttp,
  }
}
