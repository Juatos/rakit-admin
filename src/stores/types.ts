import type { Component } from "vue"

export interface MenuItem {
  title: string
  route: string
  iconName?: string // 图标名称，如 "rk:user"
  cache?: boolean
  isLeaf?: boolean // 是否是叶子节点，true表示可跳转的页面，false或undefined表示只是菜单分组
  children?: MenuItem[]
}

// 确保 MenuItem 类型包含 path 属性
export interface ExtendedMenuItem extends Omit<MenuItem, "route"> {
  path?: string
  route: string
  iconName?: string // 图标名称，如 "rk:user"
  isLeaf?: boolean
  children?: ExtendedMenuItem[]
}

export type MenuList = ExtendedMenuItem[]

// 面包屑项
export interface CrumbItem {
  title: string
  path?: string
  icon?: string // 图标名称，如 "rk:home"
}

// 标签页项
export interface TabItem {
  key: string
  title: string
  closable?: boolean
  count: number // 访问计数，用于判断是否首次访问
}

// export type LayoutPoint = "SIDER_LOGO" | "HEADER_TOOLS" | "HEADER_PROFILE" | "FOOTER"
export type LayoutExtension = Record<string, Component>

export interface LayoutFooter {
  show: boolean
}

export interface LayoutSider {
  inverted: boolean
}
