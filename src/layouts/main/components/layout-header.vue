<script lang="ts" setup>
import { useRakit } from "$rk"
import { useFullscreen } from "@vueuse/core"
import { computed } from "vue"
import { manager } from "../extension"

const { store, theme, router, crumbs, menus } = useRakit()
const {
  isDark,
  toggleTheme,
} = theme

// 计算属性：是否显示面包屑
const showCrumb = computed(() => {
  return crumbs.model.length > 0 && menus.isAllowCollapsed
})

// 点击面包屑导航
function handleBreadcrumbClick(path?: string) {
  if (path) {
    store.setActiveTab(path)
    router.push(path)
  }
}

const {
  isFullscreen,
  toggle: toggleFullscreen,
} = useFullscreen()
</script>

<template>
  <n-layout-header bordered class="h-50px">
    <n-flex justify="space-between" align="center" class="h-full px-4">
      <n-flex align="center" :size="6">
        <div
          v-if="menus.isAllowCollapsed"
          class="flex-center h-32px w-32px cursor-pointer hover:bg-[var(--hover-color)] rounded-full"
          @click="menus.toggleCollapsed()"
        >
          <rk-icon :name="menus.isCollapsed ? 'rk:menu-right' : 'rk:menu-left'" size="22" />
        </div>
        <n-divider v-if="showCrumb" vertical />
        <transition name="breadcrumb-slide" mode="out-in">
          <n-breadcrumb
            v-if="showCrumb"
            :key="crumbs.model.map(item => item.title).join('-')"
            class="text-12px!"
          >
            <n-breadcrumb-item
              v-for="(item, index) in crumbs.model"
              :key="`${item.title}-${item.path || index}`"
              :clickable="!!item.path"
              @click="handleBreadcrumbClick(item.path)"
            >
              <n-flex align="center" :size="4">
                <rk-icon v-if="item.icon" :name="item.icon" size="16" />
                <span>{{ item.title }}</span>
              </n-flex>
            </n-breadcrumb-item>
          </n-breadcrumb>
        </transition>
      </n-flex>

      <n-flex align="center" :size="12" class="h-full">
        <!-- 前置工具 -->
        <template v-if="manager.hasBefore('header.tools')">
          <component
            :is="comp"
            v-for="comp in manager.getExtensions('header.tools', 'before')"
            :key="comp.name"
          />
        </template>

        <!-- 默认或替换的工具 -->
        <template v-if="manager.hasReplacement('header.tools')">
          <component
            :is="comp"
            v-for="comp in manager.getExtensions('header.tools', 'replace')"
            :key="comp.name"
          />
        </template>
        <template v-else>
          <n-tooltip placement="bottom" :delay="200">
            <template #trigger>
              <div
                class="flex-center h-32px w-32px cursor-pointer hover:bg-[var(--hover-color)] rounded-full "
                @click="toggleTheme()"
              >
                <rk-icon :name="isDark ? 'rk-ani:moon' : 'rk-ani:sun'" size="20" />
              </div>
            </template>
            <span>{{ isDark ? '切换亮色' : '切换暗色' }}</span>
          </n-tooltip>

          <n-tooltip placement="bottom" :delay="200">
            <template #trigger>
              <div
                class="flex-center h-32px w-32px cursor-pointer hover:bg-[var(--hover-color)] rounded-full"
                @click.stop="toggleFullscreen()"
              >
                <rk-icon :name="isFullscreen ? 'rk:screen-exit' : 'rk:screen-full'" size="20" />
              </div>
            </template>
            <span>{{ isFullscreen ? '退出全屏' : '切换全屏' }}</span>
          </n-tooltip>

          <!--          <n-tooltip placement="bottom" :delay="200"> -->
          <!--            <template #trigger> -->
          <!--              <div class="flex-center h-32px w-32px cursor-pointer hover:bg-[var(&#45;&#45;hover-color)] rounded-full"> -->
          <!--                <n-badge :value="12" processing dot> -->
          <!--                  <rk-icon name="rk-ani:bell" size="20" /> -->
          <!--                </n-badge> -->
          <!--              </div> -->
          <!--            </template> -->
          <!--            <span>查看消息</span> -->
          <!--          </n-tooltip> -->

          <!--          <div class="flex-center h-32px w-32px cursor-pointer hover:bg-[var(&#45;&#45;hover-color)] rounded-full"> -->
          <!--            <rk-icon name="rk:setting" size="20" /> -->
          <!--          </div> -->
          <!--        </template> -->

          <!-- 后置工具 -->
          <template v-if="manager.hasAfter('header.tools')">
            <component
              :is="comp"
              v-for="comp in manager.getExtensions('header.tools', 'after')"
              :key="comp.name"
            />
          </template>

          <n-divider vertical />

          <!-- 个人信息区域 -->
          <template v-if="manager.hasReplacement('header.profile')">
            <component
              :is="comp"
              v-for="comp in manager.getExtensions('header.profile', 'replace')"
              :key="comp.name"
            />
          </template>
          <template v-else>
            <div>Profile区域</div>
          </template>
        </template>
      </n-flex>
    </n-flex>
  </n-layout-header>
</template>

<style lang="scss" scoped>
:deep(.n-button.n-button--quaternary:hover) {
  background-color: rgba(0, 0, 0, 0.06);
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.n-breadcrumb-item:not(:last-child)) {
  cursor: pointer;
}

:deep(.n-breadcrumb-item:not(:last-child):hover .n-breadcrumb-item__link) {
  color: var(--primary-color);
}

:deep(.n-breadcrumb-item__link) {
  cursor: pointer;
}

:deep(.n-breadcrumb-item:hover .n-breadcrumb-item__link) {
  color: var(--primary-color);
}

/* 面包屑切换动画 */
.breadcrumb-slide-enter-active,
.breadcrumb-slide-leave-active {
  transition: all 0.25s ease-out;
}

.breadcrumb-slide-enter-from {
  opacity: 0;
  transform: translateX(-12px);
}

.breadcrumb-slide-leave-to {
  opacity: 0;
  transform: translateX(12px);
}

/* 面包屑容器动画 */
:deep(.n-breadcrumb) {
  transition: all 0.2s ease;
}

/* 面包屑项悬停动画 */
:deep(.n-breadcrumb-item) {
  transition: all 0.15s ease;
}

:deep(.n-breadcrumb-item .n-breadcrumb-item__link) {
  transition: color 0.15s ease;
}

/* 面包屑图标动画 */
:deep(.n-breadcrumb-item .rk-icon) {
  transition: transform 0.15s ease;
}

:deep(.n-breadcrumb-item:hover .rk-icon) {
  transform: translateX(1px);
}
</style>
