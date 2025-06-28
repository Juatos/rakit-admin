// 颜色处理工具函数

/**
 * RGB颜色对象接口
 */
interface RGB {
  r: number
  g: number
  b: number
}

/**
 * 状态颜色对象接口
 */
interface themeColors {
  base: string
  hover: string
  pressed: string
  suppl: string
}

/**
 * 将16进制颜色转换为RGB对象
 * @param hex - 16进制颜色值，如 '#18A058'
 * @returns RGB对象 {r, g, b} 或 null
 */
function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null
}

/**
 * 将RGB对象转换为16进制颜色
 * @param rgb - RGB对象 {r, g, b}
 * @returns 16进制颜色值
 */
function rgbToHex(rgb: RGB): string {
  const { r, g, b } = rgb
  return `#${[r, g, b].map((x) => {
    const hex = x.toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }).join("")}`
}

/**
 * 直接分析颜色规律生成状态颜色
 * 基础色: #18A058
 * Hover: #36AD6A  (R:+30, G:+13, B:+18)
 * Pressed: #0C7A43 (R:-12, G:-38, B:-21)
 * Suppl: #36AD6A (与Hover相同)
 * @param baseColor - 基础颜色
 * @returns 状态颜色对象
 */
function genThemeColors(baseColor: string): themeColors | null {
  const rgb = hexToRgb(baseColor)
  if (!rgb) { return null }

  // 分析颜色变化规律
  const hoverRgb: RGB = {
    r: Math.min(255, Math.max(0, rgb.r + 30)),
    g: Math.min(255, Math.max(0, rgb.g + 13)),
    b: Math.min(255, Math.max(0, rgb.b + 18)),
  }

  const pressedRgb: RGB = {
    r: Math.min(255, Math.max(0, rgb.r - 12)),
    g: Math.min(255, Math.max(0, rgb.g - 38)),
    b: Math.min(255, Math.max(0, rgb.b - 21)),
  }

  return {
    base: baseColor,
    hover: rgbToHex(hoverRgb),
    pressed: rgbToHex(pressedRgb),
    suppl: rgbToHex(hoverRgb), // 与hover相同
  }
}

export {
  genThemeColors,
}
