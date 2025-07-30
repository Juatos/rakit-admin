import type { Dayjs } from "dayjs"
import type { DataTableColumn, SelectOption } from "naive-ui"
import type { Component, VNodeChild } from "vue"
import type {
  CustomRender,
  RenderBadgeOption,
  RenderDateOption,
  RenderImageOption,
  RenderLinkOption,
  RenderSelectOption,
  RenderTagOption,
  ThemeType,
} from "../shared-types"

export type DTableSearchValueType
  = | string
    | string[]
    | number
    | Dayjs
    | Dayjs[]
    | null
    | undefined
    | any

type ButtonType = ThemeType

export type DTableSearchForm = Record<string, DTableSearchValueType>

export interface DTableSearchResult<T = any> {
  total?: number
  dataSource: T[]
}

export type DTableSearchFn = (form: DTableSearchForm) => Promise<DTableSearchResult>

export type DTableSearchReturn<T> = Promise<DTableSearchResult<T>>

export interface DTableQuery {
  field: string
  label: string
  component: "input" | "select" | "date" | "datetime" | "time" | "date-range" | "datetime-range" | "time-range" | "input-number" | Component | string
  options?: SelectOption[]
  placeholder?: string
  giSpan?: number
  /**
   * 最大宽度，用于限制跨列元素的宽度
   */
  maxWidth?: string | number
  /**
   * 默认值
   */
  defaultValue?: DTableSearchValueType
  /**
   * 组件的额外属性
   */
  props?: Record<string, any>
  [key: string]: any
}

// 操作栏按钮类型
export interface DTableAction {
  label: string
  type?: ButtonType
  icon?: string
  show?: boolean | ((row: any, idx?: number) => boolean)
  disabled?: boolean | ((row: any, idx?: number) => boolean)
  handler: (row: any, idx?: number) => void
}

// 工具栏功能按钮类型
export interface DTableExtra {
  label: string
  type?: ButtonType
  icon?: string
  show?: boolean | (() => boolean)
  disabled?: boolean | (() => boolean)
  handler: () => void
}

// 工具栏批量操作按钮类型
export interface DTableBatchExtra {
  label: string
  type?: ButtonType
  icon?: string
  // 根据选中行数据判断是否禁用
  disabled?: (selectedRows: any[]) => boolean
  // 根据选中行数据判断是否显示
  show?: (selectedRows: any[]) => boolean
  // 批量操作函数，参数为选中的行数据
  handler: (selectedRows: any[]) => void
  // 是否为批量操作按钮
  isBatch: true
}

// 列 Props 配置类型
export interface ColumnProps {
  options?: RenderTagOption[] | RenderBadgeOption[] | RenderSelectOption[]
  imageOptions?: RenderImageOption
  linkOptions?: RenderLinkOption
  dateOptions?: RenderDateOption
  [key: string]: any
}

// 列配置类型
export interface DTableColumn extends Omit<DataTableColumn, "children"> {
  hidden?: boolean
  index?: number
  title?: string | (() => any)
  children?: DTableColumn[]
  key: string | number
  render?: ((row: any, index: number) => VNodeChild) | CustomRender
  props?: ColumnProps
  /**
   * 列是否显示
   * 可以是布尔值或无参数函数
   */
  show?: boolean | (() => boolean)
  /**
   * 当值为空时显示的默认值
   * 仅对字符串类型有效
   */
  defaultValue?: string
}

export type DTableColumns = DTableColumn[]
export type DTableQueries = DTableQuery[]

export interface DTableProps {
  isSimple?: boolean
  inModal?: boolean
  defaultCollapse?: boolean
  showToolbar?: boolean
  columns: DTableColumns
  queries?: DTableQueries
  pagination?: {
    size: number
  } | false
  // 操作栏按钮配置
  actions?: DTableAction[]
  // 工具栏功能按钮
  extras?: (DTableExtra | DTableBatchExtra)[]
  // 是否可选择行
  rowSelection?: {
    key?: string
    disabled?: (row: any) => boolean
  } | false
  onSearch: DTableSearchFn
}
