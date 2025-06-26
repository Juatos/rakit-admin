<script lang="ts" setup>
import { useTheme } from "$kit/themes"
import { darkTheme, dateZhCN, zhCN } from "naive-ui"

const { isDark, overrides } = useTheme()
</script>

<template>
  <n-config-provider
    :theme="isDark ? darkTheme : undefined"
    :theme-overrides="overrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    class="w-full h-full"
  >
    <n-el tag="div" class="h-full w-full">
      <k-provider>
        <router-view />
      </k-provider>
    </n-el>
  </n-config-provider>
</template>

<style>
html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
