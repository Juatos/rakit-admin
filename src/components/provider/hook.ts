import type { ModalProps } from "$ra"
import type { Component } from "vue"
import { inject, shallowRef } from "vue"

export interface DrawerInstance {
  create: (component: Component, props?: any) => void
}

export function drawerInstance(): DrawerInstance {
  const createFunc = inject("ra-drawer-create") as (component: Component, props?: any) => void

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
  const createFunc = inject("ra-modal-create") as (component: Component, props?: ModalProps) => void

  function create(component: Component, props?: ModalProps): void {
    createFunc(shallowRef(component), props)
  }

  return {
    create,
  }
}
