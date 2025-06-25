import { ANIMATE_ICONS } from "./consts/animate"
import { RAKIT_ICONS } from "./consts/basic"

class IconManager {
  private mappings: Map<string, string> = new Map()

  constructor() {
    this.mapping(RAKIT_ICONS, false)
    this.mapping(ANIMATE_ICONS, false)
  }

  /**
   * 注册图标别名[ra:remark => mdi:xxxx]
   */
  public mapping(icons: Record<string, string>, override: boolean = false): void {
    if (override) {
      this.mappings.clear()
    }
    Object.keys(icons).forEach((alias) => {
      this.mappings.set(alias, icons[alias])
    })
  }

  /**
   * 根据别名获取SVG图标的内容
   */
  public async getContent(alias: string): Promise<string> {
    const key = this.mappings.get(alias)
    if (!key) {
      console.warn(`[IconManager] 图标别名 "${alias}" 未注册。`)
      return ""
    }
    // 2. 如果缓存中没有或已过期，则进行远程获取
    try {
      const [collection, name] = key?.split(":")
      const response = await fetch(`https://api.iconify.design/${collection}/${name}.svg?alias=${alias}`)
      const svgContent = await response.text()

      if (svgContent) {
        return String(svgContent)
      }
      else {
        console.warn(`[IconManager] 远程获取图标 "${alias}" (realKey: "${key}") 未返回内容。`)
        return ""
      }
    }
    catch (fetchError) {
      console.error(`[IconManager] 远程获取图标 "${alias}" (realKey: "${key}") 失败:`, fetchError)
      return ""
    }
  }
}

export const manager = new IconManager()
