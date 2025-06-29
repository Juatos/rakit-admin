import type { LayoutExtension, LayoutFooter, LayoutSider } from "$rk"

export function useLayouts() {
  // 扩展点配置
  const extensions = ref<LayoutExtension>({} as LayoutExtension)

  const footer = ref<LayoutFooter>({
    show: true,
  })
  const sider = ref<LayoutSider>({
    inverted: false,
  })

  function setup(config: any) {
    if (config?.extensions) {
      extensions.value = config.extensions
    }
    if (config?.footer) {
      footer.value = config.footer
    }
    if (config?.sider) {
      sider.value = config.sider
    }
  }

  return {
    extensions,
    footer,
    sider,
    setup,
  }
}
