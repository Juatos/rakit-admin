import type { SetupHttpOptions } from "$ra"
import { manager } from "./manager"

export function setupHttp(options: SetupHttpOptions) {
  manager.init(options)
}
