import type { ModalProps } from "$rk"
import type { Component } from "vue"
import { inject, shallowRef } from "vue"

export interface DrawerInstance {
  create: (component: Component, props?: any) => void
}

export function drawerInstance(): DrawerInstance {
  const createFunc = inject("rk-drawer-create") as (component: Component, props?: any) => void

  function create(component: Component, props?: any) {
    createFunc(shallowRef(component), props)
  }

  return {
    create,
  }
}

export interface ModalInstance {
  create: (component: Component, props?: ModalProps) => void
}

export function modalInstance(): ModalInstance {
  const createFunc = inject("rk-modal-create") as (component: Component, props?: ModalProps) => void

  function create(component: Component, props?: ModalProps): void {
    createFunc(shallowRef(component), props)
  }

  return {
    create,
  }
}
