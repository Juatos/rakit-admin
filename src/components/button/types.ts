import type { ButtonProps as NButtonProps } from "naive-ui"
import type { VNodeChild } from "vue"

export interface ButtonProps extends /* @vue-ignore */ NButtonProps {
  icon?: string
  title?: string | VNodeChild | (() => VNodeChild)
}
