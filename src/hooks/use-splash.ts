import type { Component } from "vue"
import { Splash as DefaultSPlash } from "$kit"

export function useSplash(component?: Component) {
  const app = createApp(component || DefaultSPlash)

  app.mount("#app")

  return () => {
    app.unmount()
  }
}
