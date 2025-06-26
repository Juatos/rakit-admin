<script lang="ts" setup>
import type { Component, Ref } from "vue"
import { uid } from "radash"
import { provide, ref } from "vue"

interface DrawerInst {
  id: string
  component: Component
}

const drawList: Ref<DrawerInst[]> = ref<DrawerInst[]>([])

// 重写 Element.prototype.setAttribute 方法，阻止设置 aria-hidden="true"
const originalSetAttribute = Element.prototype.setAttribute
Element.prototype.setAttribute = function (name, value) {
  // 阻止设置 aria-hidden="true"
  if (name === "aria-hidden" && value === "true") {
    // 使用 inert 属性代替
    return originalSetAttribute.call(this, "inert", "")
  }
  return originalSetAttribute.call(this, name, value)
}

function createDrawer(component: Component) {
  document.querySelectorAll(".n-drawer-container")?.forEach((item) => {
    if (item.children.length === 0) {
      item.remove()
    }
  })

  const id = uid(16)
  drawList.value.push({
    id,
    component,
  })

  return id
}

function destoryDrawer(id: string) {
  const index = drawList.value.findIndex((item: DrawerInst) => item.id === id)
  if (index !== -1) {
    drawList.value.splice(index, 1)
  }
}

provide("k-drawer-create", createDrawer)
provide("k-drawer-destory", destoryDrawer)
</script>

<template>
  <slot />
  <!-- 使用 teleport 将抽屉组件渲染到 body 下，避免嵌套导致的 aria-hidden 问题 -->
  <component :is="drawer.component" v-for="drawer in drawList" :key="drawer.id" />
</template>
