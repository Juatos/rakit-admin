import type { SetupHttpOptions } from "$kit"
import { manager } from "./manager"

export function setupHttp(options: SetupHttpOptions) {
  manager.init(options)
}
