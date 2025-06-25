import type { ExtractThemeOverrides } from "naive-ui/es/_mixins/use-theme"
import type { GlobalThemeWithoutCommon } from "naive-ui/es/config-provider/src/internal-interface"
import type { ThemeCommonVars } from "naive-ui/lib"

export enum ADMIN_THEME_MODE {
  DARK = "DARK",
  LIGHT = "LIGHT",
}

export const ADMIN_THEME = {
  MODE: "ADMIN_THEME_MODE",
  HAS_DARK: "ADMIN_THEME_HAS_DARK",
  OVERRIDES: "ADMIN_THEME_OVERRIDES",
  DARK_OVERRIDES: "ADMIN_THEME_DARK_OVERRIDES",
}

export type AdminThemeOverrides = {
  common?: Partial<ThemeCommonVars & { [key: string]: string }>
} & {
  [key in keyof GlobalThemeWithoutCommon]?: ExtractThemeOverrides<GlobalThemeWithoutCommon[key]>;
}

export interface SetupThemeOption {
  mode?: ADMIN_THEME_MODE.LIGHT | ADMIN_THEME_MODE.DARK
  hasDark?: boolean
  overrides?: AdminThemeOverrides
  darkOverrides?: AdminThemeOverrides
}
