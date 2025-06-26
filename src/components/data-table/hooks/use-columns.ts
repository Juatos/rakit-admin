import type {
  CustomRender,
  DTableColumn,
  DTableColumns,
  DTableProps,
  RenderBadgeOption,
  RenderDateOption,
  RenderImageOption,
  RenderLinkOption,
  RenderSelectOption,
  RenderTagOption,
} from "$rk"
import type { VNodeChild } from "vue"
import { Icon as KIcon } from "$rk"
import dayjs from "dayjs"
import { NA, NBadge, NImage, NSwitch, NTag } from "naive-ui"
import { computed, h } from "vue"
import TableAction from "../components/table-action.vue"

/**
 * 判断是否为自定义渲染配置
 */
function isCustomRender(render: any): render is CustomRender {
  return render && typeof render === "string"
}

/**
 * 渲染标签
 */
function renderTag(value: any, options?: RenderTagOption[]): VNodeChild {
  const option = options?.find(opt => opt.value === value)
  if (!option) {
    return h("span", value)
  }

  return h(NTag, {
    type: option.type || "default" as any,
    bordered: true,
  }, { default: () => option.label })
}

/**
 * 渲染徽标
 */
function renderBadge(value: any, options?: RenderBadgeOption[]): VNodeChild {
  const option = options?.find(opt => opt.value === value)
  if (!option) {
    return h("span", value)
  }

  return h(NBadge, {
    type: (option.type || "default") as any,
    color: option.color,
    dot: option.dot as boolean,
  }, { default: () => option.label })
}

/**
 * 渲染开关
 */
function renderSwitch(value: any): VNodeChild {
  return h(NSwitch, {
    value: Boolean(value),
    disabled: true,
  })
}

/**
 * 渲染图片
 */
function renderImage(value: any, options?: RenderImageOption): VNodeChild {
  if (!value) {
    return h("span", "")
  }

  return h(NImage, {
    src: value,
    width: options?.width || 48,
    height: options?.height || 48,
    previewDisabled: options?.preview === false,
    fallbackSrc: options?.fallback,
  })
}

/**
 * 渲染选择器展示
 */
function renderSelect(value: any, options?: RenderSelectOption[]): VNodeChild {
  const option = options?.find(opt => opt.value === value)
  if (!option) {
    return h("span", value)
  }

  return h("span", {
    style: { color: option?.color },
  }, option.label as string)
}

/**
 * 渲染日期
 */
function renderDate(value: any, options?: RenderDateOption): VNodeChild {
  try {
    const format = options?.format || "YYYY-MM-DD HH:mm:ss"
    return h("span", dayjs(value).format(format))
  }
  catch {
    return h("span", value)
  }
}

/**
 * 渲染链接
 */
function renderLink(value: any, options?: RenderLinkOption): VNodeChild {
  return h(NA, {
    href: value,
    target: options?.target || "_blank",
    type: options?.type,
    underline: options?.underline,
  }, { default: () => value })
}

/**
 * 根据类型渲染内容
 */
function handleRender(type: CustomRender, value: any, _: any, column: DTableColumn): VNodeChild {
  // 检查是否需要使用默认值
  const isEmptyValue = (value === null || value === undefined || value === "")
  const displayValue = isEmptyValue
    ? (column.defaultValue || value)
    : value

  if (isEmptyValue && !column.defaultValue) {
    return h("span", "")
  }

  switch (type) {
    case "tag":
      return renderTag(displayValue, column.props?.options as RenderTagOption[])
    case "badge":
      return renderBadge(displayValue, column.props?.options as RenderBadgeOption[])
    case "switch":
      return renderSwitch(displayValue)
    case "image":
      return renderImage(displayValue, column.props?.imageOptions)
    case "select":
      return renderSelect(displayValue, column.props?.options as RenderSelectOption[])
    case "date":
      return renderDate(displayValue, column.props?.dateOptions)
    case "link":
      return renderLink(displayValue, column.props?.linkOptions)
    case "icon":
      return h(KIcon, { name: displayValue, ...column.props })
    default:
      return h("span", { ...column.props }, displayValue)
  }
}

export function useColumns(props: DTableProps) {
  // 处理列渲染函数
  const formatColumns = computed<DTableColumns>(() => {
    const columns = [...props.columns]

    // 遍历所有列，处理自定义渲染
    return columns.map((column: DTableColumn) => {
      // 递归处理子列
      if (column.children?.length) {
        return {
          ...column,
          children: column.children.map(item => render(item)),
        }
      }

      return render(column)
    })
  })

  // 处理单个列的渲染函数
  function render(column: DTableColumn): DTableColumn {
    // 如果是操作列且有操作按钮配置，则使用操作列渲染
    if (column.key === "_action_" && props.actions && props.actions.length > 0) {
      return {
        ...column,
        render: (row: any, index: number) => {
          return h(TableAction, {
            row,
            index,
            actions: props.actions || [],
          })
        },
      }
    }

    // 如果是自定义渲染对象
    if (isCustomRender(column?.render)) {
      return {
        ...column,
        render: (row: any, _: number) => {
          const type = column.render as CustomRender
          const value = row[column.key]
          return handleRender(type, value, row, column)
        },
      }
    }

    // 如果是普通函数渲染，保持原有逻辑
    if (typeof column.render === "function") {
      return column
    }

    // 如果是普通列且有默认值设置，添加默认值处理
    if (column.defaultValue !== undefined) {
      return {
        ...column,
        render: (row: any, _: number) => {
          const value = row[column.key]
          const displayValue = (value === null || value === undefined || value === "")
            ? column.defaultValue
            : value
          return h("span", displayValue)
        },
      }
    }

    // 如果是普通列，则保持不变
    return column
  }

  return {
    formatColumns,
  }
}
