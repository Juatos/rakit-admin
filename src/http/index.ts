import type { SetupHttpOptions } from "$rk"
import { manager } from "./manager"

export function setupHttp(options: SetupHttpOptions) {
  manager.init(options)
}
