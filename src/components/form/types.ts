import type { Dayjs } from "dayjs"
import type { FormItemRule, FormProps as NFormProps } from "naive-ui"
import type { Ref } from "vue"

export type FormItemType = "input" | "password" | "select" | "radio" | "checkbox" | "switch" | "date" | "time" | "datetime" | "textarea" | "number" | "cascader" | "custom"

export type FormItemValue
  = | string
    | string[]
    | number
    | Dayjs
    | Dayjs[]
    | boolean
    | null
    | undefined
    | any
    | any[]

export interface FormCheckProps {
  model: Ref<Record<string, FormItemValue>>
}

export interface FormItem {
  /**
   * 表单项字段名
   */
  field: string

  /**
   * 表单项标签
   */
  label: string

  /**
   * 表单项类型
   */
  type: FormItemType

  /**
   * 表单项占位符
   */
  placeholder?: string

  /**
   * 表单项默认值
   */
  defaultValue?: any

  /**
   * 表单项验证规则
   */
  rules?: FormItemRule[]

  /**
   * 表单项是否禁用
   */
  disabled?: boolean | ((params: FormCheckProps) => boolean)

  /**
   * 表单项是否显示
   */
  show?: boolean | ((params: FormCheckProps) => boolean)

  /**
   * 表单项选项（用于select、radio、checkbox等）
   */
  options?: any[]

  /**
   * 表单项样式
   */
  style?: {
    [key: string]: any
  }

  /**
   * 自定义渲染函数（当type为custom时使用）
   */
  render?: (formData: any) => any

  /**
   * 组件特定属性
   *
   * 对于input类型，可以传入round、size等naive-ui的NInput组件支持的属性
   * 例如：{ round: true, size: 'small' }
   *
   * 支持的属性根据表单项类型不同而不同：
   * - input: NInput组件的所有属性，如round、size等
   * - password: NInput组件的所有属性，如round、size等
   * - textarea: NInput组件的所有属性，如autosize、maxlength、showCount等
   * - number: NInputNumber组件的所有属性，如min、max、precision等
   * - select: NSelect组件的所有属性，如filterable、multiple、tag等
   * - radio: NRadioGroup组件的所有属性，如name、size等
   * - checkbox: NCheckboxGroup组件的所有属性，如min、max等
   * - switch: NSwitch组件的所有属性，如checkedValue、uncheckedValue等
   * - date: NDatePicker组件的所有属性，如format、type、size等
   * - time: NTimePicker组件的所有属性，如format、size等
   * - datetime: NDatePicker组件的所有属性，如format、size等
   */
  props?: Record<string, any>

  /**
   * 组件插槽
   *
   * 用于支持各种组件的插槽，如input的prefix、suffix等
   * 例如：
   * {
   *   prefix: () => h('div', { class: 'i-carbon-user' }),
   *   suffix: () => h('div', { class: 'i-carbon-search' })
   * }
   *
   * 支持的插槽根据表单项类型不同而不同：
   * - input: prefix、suffix 等
   * - password: prefix、suffix 等
   * - select: action、empty、header、footer 等
   * - date-picker: icon、separator 等
   * - time-picker: icon 等
   * - radio/checkbox: default (可自定义选项渲染)
   * - switch: checked、unchecked 等
   *
   * 详细插槽请参考 naive-ui 对应组件的文档
   */
  slots?: Record<string, () => any>

  /**
   * 栅格列数
   */
  giSpan?: number

  /**
   * 其他属性
   */
  [key: string]: any
}

export interface SmFormProps {
  /**
   * 表单项配置
   */
  schema: FormItem[]

  /**
   * 表单布局
   * @default 'vertical'
   */
  layout?: "horizontal" | "vertical" | "inline"

  /**
   * 标签宽度
   */
  labelWidth?: string | number

  /**
   * 是否禁用整个表单
   */
  disabled?: boolean

  /**
   * 是否显示标签
   */
  showLabel?: boolean

  /**
   * 标签位置
   */
  labelPlacement?: "left" | "top"

  /**
   * 是否显示反馈信息
   */
  showFeedback?: boolean

  /**
   * 表单尺寸
   */
  size?: "small" | "medium" | "large"

  /**
   * 原生naive-ui表单属性
   */
  formProps?: Partial<NFormProps>

  /**
   * 是否使用栅格布局
   */
  grid?: boolean
}

export interface FormExpose {
  /**
   * 验证表单
   */
  validate: () => any

  /**
   * 重置表单
   */
  reset: () => void

  /**
   * 清除验证
   */
  clearValidate: (fields?: string | string[]) => void

  /**
   * 表单模型数据
   */
  model: Record<string, FormItemValue>

  /**
   * 设置字段值
   */
  setModelValue: (field: string, value: FormItemValue) => void
}

export type FormInst = FormExpose
