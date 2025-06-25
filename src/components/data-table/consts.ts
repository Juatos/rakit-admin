// 表格密度类型
export type TableDensityType = "small" | "medium" | "large"

// 默认表格密度
export const DEFAULT_TABLE_DENSITY: TableDensityType = "medium"

// 表格密度选项
export const TABLE_DENSITY_OPTIONS = [
  { label: "紧凑", key: "small" },
  { label: "适中", key: "medium" },
  { label: "宽松", key: "large" },
]

// 下拉框宽度
export const COLUMN_SETTING_WIDTH = "240px"

export const PAGE_SIZES = [
  { label: "10 / 页", value: 10 },
  { label: "20 / 页", value: 20 },
  { label: "50 / 页", value: 50 },
  { label: "100 / 页", value: 100 },
]
