<script lang="ts" setup>
import type { Component, Ref } from "vue"
import { uid } from "radash"
import { provide, ref } from "vue"

interface ModalProps {
  onOk?: () => void
  onCancel?: () => void
}

interface ModalInst {
  id: string
  component: Component
  props?: ModalProps
}

const modalList: Ref<ModalInst[]> = ref<ModalInst[]>([])

function createModal(component: Component, props?: ModalProps) {
  document.querySelectorAll(".n-modal-container")?.forEach((item) => {
    if (item.children.length === 0) {
      item.remove()
    }
  })

  modalList.value.push({ id: uid(16), component, props })
}

function getLastetModalId() {
  return modalList.value[modalList.value.length - 1]?.id
}

function destoryModal(id: string) {
  const index = modalList.value.findIndex((item: ModalInst) => item.id === id)
  if (index !== -1) {
    modalList.value.splice(index, 1)
  }
}

provide("ra-modal-create", createModal)
provide("ra-modal-destory", destoryModal)
provide("ra-modal-getLastetModalId", getLastetModalId)
</script>

<template>
  <slot />
  <component :is="modal.component" v-for="modal in modalList" v-bind="modal.props" :key="modal.id" />
</template>
