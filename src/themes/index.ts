import type { AdminThemeOverrides, SetupThemeOption } from "$rk"
import { ADMIN_THEME } from "$rk"

const defaultThemeOverrides: AdminThemeOverrides = {
  common: {
    // primaryColor: "#4d6bfe", // #338AB4
    // primaryColorHover: "#6c84fe",
    // primaryColorPressed: "#3f58e3",
    // primaryColorSuppl: "#4d6bfe",
    primaryColor: "#218ED7FF",
    primaryColorHover: "#289AE6FF",
    primaryColorPressed: "#218ED7FF",
    primaryColorSuppl: "#289AE6FF",
    primaryItemColorActive: "#ecf0ff",

    borderRadius: "6px",
    borderRadiusSmall: "4px",

    heightMini: "16px",
    heightTiny: "20px",
    heightSmall: "26px",
    heightMedium: "32px",
    heightLarge: "38px",
    heightHuge: "44px",

    tabColorActive: "#218ED7FF",
    tabColorDivider: "#7ecbff",
    // tabColorActive: "#4d6bfe",
    // tabColorDivider: "#b5cef8",
  },
}

const defaultThemeDarkOverrides: AdminThemeOverrides = {
  common: {
    // primaryColor: "#4d6bfe",
    // primaryColorHover: "#6c84fe",
    // primaryColorPressed: "#3f58e3",
    // primaryColorSuppl: "#4d6bfe",
    // primaryItemColorActive: "#2e3033",
    primaryColor: "#218ED7FF",
    primaryColorHover: "#289AE6FF",
    primaryColorPressed: "#218ED7FF",
    primaryColorSuppl: "#289AE6FF",
    primaryItemColorActive: "#2e3033",

    borderRadius: "6px",
    borderRadiusSmall: "4px",

    heightMini: "16px",
    heightTiny: "20px",
    heightSmall: "26px",
    heightMedium: "32px",
    heightLarge: "38px",
    heightHuge: "44px",

    tabColorActive: "#fff",
    tabColorDivider: "#b5cef8",
  },
}

function initThemeFields() {
  return {
    hasDark: useStorage(ADMIN_THEME.HAS_DARK, false),
    mode: useStorage(ADMIN_THEME.MODE, "light"),
    lightOverrides: useStorage(ADMIN_THEME.OVERRIDES, defaultThemeOverrides),
    darkOverrides: useStorage(ADMIN_THEME.DARK_OVERRIDES, defaultThemeDarkOverrides),
  }
}

// 初始化主题
export function setupTheme(options?: SetupThemeOption) {
  const {
    hasDark,
    mode,
    lightOverrides,
    darkOverrides,
  } = initThemeFields()

  hasDark.value = options?.hasDark || false
  mode.value = options?.mode || "light"
  lightOverrides.value = options?.overrides || defaultThemeOverrides
  darkOverrides.value = options?.overrides || defaultThemeDarkOverrides
}

export function useTheme() {
  const {
    hasDark,
    mode,
    lightOverrides,
    darkOverrides,
  } = initThemeFields()

  const isDark = computed(() => {
    return hasDark && mode.value === "dark"
  })
  const overrides = computed<AdminThemeOverrides>(() => {
    return isDark.value ? darkOverrides.value : lightOverrides.value
  })
  // 切换主题
  function toggleTheme() {
    hasDark.value && (mode.value = mode.value === "dark" ? "light" : "dark")
  }

  return {
    isDark,
    overrides,
    toggleTheme,
  }
}

export * from "./color"
