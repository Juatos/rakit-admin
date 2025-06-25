import type { DetailItem } from "./types"
import { NBadge, NButton, NImage, NSwitch, NTag } from "naive-ui"
import { h } from "vue"

export function useRender() {
  // 获取字段值
  const getFieldValue = (item: DetailItem, data: Record<string, any>) => {
    const value = data[item.field]

    // 如果值为空且有默认值，返回默认值
    if ((value === null || value === undefined || value === "") && item.defaultValue) {
      return item.defaultValue
    }

    return value
  }

  // 渲染标签
  const renderTag = (value: any, options: any[]) => {
    const option = options.find(opt => opt.value === value)
    if (!option) { return h("span", {}, String(value)) }

    return h(NTag, {
      type: option.type || "default",
      color: option.color,
    }, () => option.label)
  }

  // 渲染徽章
  const renderBadge = (value: any, options: any[]) => {
    const option = options.find(opt => opt.value === value)
    if (!option) { return h("span", {}, String(value)) }

    return h(NBadge, {
      type: option.type || "default",
      color: option.color,
      dot: option.dot,
    }, () => option.label)
  }

  // 渲染开关
  const renderSwitch = (value: any) => {
    return h(NSwitch, {
      value: Boolean(value),
      disabled: true,
    })
  }

  // 渲染图片
  const renderImage = (value: any, options: any = {}) => {
    if (!value) { return h("span", {}, "") }

    return h(NImage, {
      src: value,
      width: options.width || 100,
      height: options.height || 100,
      previewDisabled: !options.preview,
      fallbackSrc: options.fallback,
    })
  }

  // 渲染选择器
  const renderSelect = (value: any, options: any[]) => {
    const option = options.find(opt => opt.value === value)
    if (!option) { return h("span", {}, String(value)) }

    return h("span", {}, option.label)
  }

  // 渲染日期
  const renderDate = (value: any, format?: string) => {
    if (!value) { return h("span", {}, "") }

    // 简单的日期格式化，如果需要复杂格式化，由业务层传入自定义渲染函数
    const dateStr = format ? new Date(value).toLocaleString() : new Date(value).toLocaleString()
    return h("span", {}, dateStr)
  }

  // 渲染链接
  const renderLink = (value: any, options: any = {}) => {
    if (!value) { return h("span", {}, "") }

    return h(NButton, {
      text: true,
      type: options.type || "primary",
      tag: "a",
      href: value,
      target: options.target || "_blank",
    }, () => value)
  }

  // 渲染内容
  const renderContent = (item: DetailItem, data: Record<string, any>) => {
    const value = getFieldValue(item, data)

    // 如果有自定义渲染函数
    if (typeof item.render === "function") {
      const result = item.render(data)
      // 如果返回的是字符串或数字，包装成 VNode
      if (typeof result === "string" || typeof result === "number") {
        return h("span", {}, String(result))
      }
      // 如果返回的已经是 VNode，直接返回
      return result
    }

    // 如果有预设渲染类型
    if (typeof item.render === "string") {
      switch (item.render) {
        case "tag":
          return renderTag(value, item.props?.options || [])
        case "badge":
          return renderBadge(value, item.props?.options || [])
        case "switch":
          return renderSwitch(value)
        case "image":
          return renderImage(value, item.props?.imageOptions)
        case "select":
          return renderSelect(value, item.props?.options || [])
        case "date":
          return renderDate(value, item.props?.dateOptions?.format)
        case "link":
          return renderLink(value, item.props?.linkOptions)
        default:
          return h("span", {}, String(value))
      }
    }

    // 默认情况下，返回文本节点
    return h("span", {}, String(value))
  }

  return {
    renderContent,
  }
}
