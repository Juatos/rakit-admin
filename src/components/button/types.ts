import type { ButtonProps as NButtonProps } from "naive-ui"

export interface ButtonProps extends /* @vue-ignore */ NButtonProps {
  icon: string
  title?: string
}
