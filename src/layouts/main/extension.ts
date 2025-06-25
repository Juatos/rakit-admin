import type { Component } from "vue"
import type { ExtensionPosition, LayoutExtension } from "."

export interface ExtensionItem {
  component: Component
  position: ExtensionPosition
}

export class LayoutExtensionManager {
  private extensions: Map<string, ExtensionItem[]> = new Map()

  // 注册扩展
  register(extension: LayoutExtension | LayoutExtension[]) {
    const items = Array.isArray(extension) ? extension : [extension]
    items.forEach((item) => {
      if (!this.extensions.has(item.point)) {
        this.extensions.set(item.point, [])
      }
      this.extensions.get(item.point)!.push({
        component: item.component,
        position: item.position,
      })
    })
  }

  // 获取指定位置的扩展组件
  getExtensions(point: string, position: ExtensionPosition) {
    return (this.extensions.get(point) || [])
      .filter(item => item.position === position)
      .map(item => item.component)
  }

  // 检查是否有替换型扩展
  hasReplacement(point: string) {
    return this.getExtensions(point, "replace").length > 0
  }

  // 检查是否有前置扩展
  hasBefore(point: string) {
    return this.getExtensions(point, "before").length > 0
  }

  // 检查是否有后置扩展
  hasAfter(point: string) {
    return this.getExtensions(point, "after").length > 0
  }
}

// 创建单例
export const manager = new LayoutExtensionManager()
