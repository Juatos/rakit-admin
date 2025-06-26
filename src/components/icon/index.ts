import { h } from "vue"
import Icon from "./index.vue"
import { manager } from "./manager"

/**
 * @param name
 * @param size
 * @param color
 */
export function renderIcon(name: string, size?: number | string, color?: string) {
  return h(Icon, { name, size, color })
}

export function mappingIcons(icons: Record<string, string>) {
  manager.mapping(icons)
}

export {
  Icon,
  Icon as RkIcon,
}
