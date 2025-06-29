import type { LayoutExtension } from "$rk"
import type { Ref } from "vue"

export function useLayouts(): {
  extensions: Ref<LayoutExtension>
  showFooter: Ref<boolean>
  setup: (config: any) => void
} {
  // 扩展点配置
  const extensions = ref<LayoutExtension>({} as LayoutExtension)
  const showFooter = ref<boolean>(true)

  function setup(config: any) {
    if (config?.extensions) {
      extensions.value = config.extensions
    }
    if (config?.showFooter !== undefined) {
      showFooter.value = config.showFooter
    }
  }

  return {
    extensions,
    showFooter,
    setup,
  }
}
