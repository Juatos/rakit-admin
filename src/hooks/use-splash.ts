import type { Component } from "vue"
import { Splash as DefaultSPlash } from "$rk"
import { createApp } from "vue"

export function useSplash(component?: Component) {
  const app = createApp(component || DefaultSPlash)

  app.mount("#app")

  return () => {
    app.unmount()
  }
}
