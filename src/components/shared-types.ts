// 公共主题类型
export type ThemeType = "primary" | "info" | "success" | "warning" | "error" | "default"

// 自定义渲染类型
export type CustomRender = "tag" | "badge" | "switch" | "image" | "select" | "date" | "link" | "icon"

// 自定义渲染选项
export interface RenderTagOption {
  label: string
  value: string | number
  color?: string
  type?: ThemeType
}

export interface RenderBadgeOption {
  label: string
  value: string | number
  color?: string
  type?: ThemeType
  dot?: boolean
}

export interface RenderSelectOption {
  label: string
  value: string | number
  color?: string
}

export interface RenderImageOption {
  width?: number | string
  height?: number | string
  preview?: boolean
  fallback?: string
}

export interface RenderLinkOption {
  target?: "_blank" | "_self" | "_parent" | "_top"
  type?: ThemeType
  underline?: boolean
}

export interface RenderDateOption {
  format?: string
}
