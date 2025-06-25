import type { Component } from "vue"
import { manager } from "./extension"

// 扩展位置类型
export type ExtensionPosition = "before" | "after" | "replace"

// 扩展点配置
export interface LayoutExtension {
  point: string // 扩展点（如：'sider.logo', 'header.tools', 'header.profile'）
  component: Component // 扩展组件
  position: ExtensionPosition // 扩展位置
}

export function extendLayouts(extension: LayoutExtension | LayoutExtension[]) {
  manager.register(extension)
}
