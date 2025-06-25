import type { VNodeChild } from "vue"
import type {
  CustomRender,
  RenderBadgeOption,
  RenderDateOption,
  RenderImageOption,
  RenderLinkOption,
  RenderSelectOption,
  RenderTagOption,
} from "../shared-types"

// 详情项 Props 配置类型
export interface DetailItemProps {
  options?: RenderTagOption[] | RenderBadgeOption[] | RenderSelectOption[]
  imageOptions?: RenderImageOption
  linkOptions?: RenderLinkOption
  dateOptions?: RenderDateOption
  [key: string]: any
}

// 详情项配置类型
export interface DetailItem {
  /**
   * 字段名
   */
  field: string

  /**
   * 标签
   */
  label: string

  /**
   * 渲染类型或自定义渲染函数
   */
  render?: ((data: any) => VNodeChild) | CustomRender

  /**
   * 渲染配置
   */
  props?: DetailItemProps

  /**
   * 占用列数
   */
  span?: number

  /**
   * 当值为空时显示的默认值
   */
  defaultValue?: string

  /**
   * 是否显示
   */
  show?: boolean | ((data: any) => boolean)
}

export interface SmDetailProps {
  /**
   * 详情项配置
   */
  schema: DetailItem[]

  /**
   * 数据源
   */
  data: Record<string, any>

  /**
   * 列数
   */
  column?: number

  /**
   * 是否显示边框
   */
  bordered?: boolean

  /**
   * 标签位置
   */
  labelPlacement?: "left" | "top"

  /**
   * 标签样式
   */
  labelStyle?: Record<string, any>

  /**
   * 内容样式
   */
  contentStyle?: Record<string, any>

  /**
   * 尺寸
   */
  size?: "small" | "medium" | "large"

  /**
   * 标签是否加粗
   */
  labelBold?: boolean
}
