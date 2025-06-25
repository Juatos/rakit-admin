import type { Component } from "vue"
import { Splash as DefaultSPlash } from "$ra"

export function useSplash(component?: Component) {
  const app = createApp(component || DefaultSPlash)

  app.mount("#app")

  return () => {
    app.unmount()
  }
}
