<script lang="ts">
import type { MenuOption } from "naive-ui"
import { renderIcon, useRakit } from "$rk"
import { defineComponent, onMounted, ref, watch } from "vue"
import { manager } from "../extension"

export default defineComponent({
  name: "LayoutSider",
  setup() {
    const { store, router, menus } = useRakit()

    const menuRef = ref()
    // 活跃菜单直接交给store-menus管理
    const isActive = computed(() => menus.isActive)

    onMounted(() => {
      const currentPath = router.currentRoute?.value?.path
      store.setActiveTab(currentPath)
      menuRef.value?.showOption(isActive.value)
    })

    // 监听路由变化
    watch(
      () => router.currentRoute.value?.path,
      (newPath) => {
        if (newPath && newPath !== isActive.value) {
          store.setActiveTab(newPath)
        }
      },
    )

    function onMenuChange(key: string) {
      store.setActiveTab(key)
      router.push(key)
    }

    // 统一的图标渲染函数
    function renderMenuIcon(option: MenuOption) {
      // 使用我们自定义的iconName字段
      const iconName = (option as any).iconName
      if (iconName) {
        return renderIcon(iconName, 22)
      }
      return true
    }

    return {
      menus,
      menuRef,
      isActive,
      manager,
      onMenuChange,
      renderMenuIcon,
    }
  },
})
</script>

<template>
  <n-layout-sider
    bordered
    native-scrollbar
    collapse-mode="width"
    :collapsed="menus.isCollapsed"
    :collapsed-width="60"
    :width="240"
    :inverted="false"
  >
    <n-layout-header bordered class="h-50px leading-50px" :inverted="false">
      <template v-if="manager.hasReplacement('sider.logo')">
        <component
          :is="comp"
          v-for="comp in manager.getExtensions('sider.logo', 'replace')"
          :key="comp.name"
        />
      </template>
      <template v-else>
        <div class="flex items-center px-4 h-full">
          <rk-icon name="rk:logo-r" :size="menus.isCollapsed ? 32 : 24" />
          <span v-show="!menus.isCollapsed" class="ml-2 text-16px font-bold">
            RAKIT-ADMIN
          </span>
        </div>
      </template>
    </n-layout-header>
    <n-scrollbar style="height: calc(100vh - 50px)">
      <n-menu
        ref="menuRef"
        v-model:value="isActive"
        :options="menus.menuList as any"
        :collapse="menus.isCollapsed"
        :collapse-mode="menus.isCollapsed ? 'width' : 'height'"
        :collapse-width="60"
        :icon-size="22"
        :collapsed-icon-size="26"
        :root-indent="18"
        :indent="24"
        :default-value="isActive"
        :render-icon="renderMenuIcon"
        key-field="route"
        label-field="title"
        :on-update:value="onMenuChange"
        :inverted="false"
      />
    </n-scrollbar>
  </n-layout-sider>
</template>

<style scoped>
:deep(.n-menu > .n-menu-item > .n-menu-item-content),
:deep(.n-menu > .n-submenu > .n-menu-item > .n-menu-item-content)
{
  padding-left: 18px !important;
}
</style>
