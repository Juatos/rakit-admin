<script lang="ts" setup>
import { manager } from "../extension"
</script>

<template>
  <n-layout-footer bordered class="h-30px text-center leading-30px text-12px">
    <template v-if="manager.hasReplacement('footer')">
      <component
        :is="comp"
        v-for="comp in manager.getExtensions('footer', 'replace')"
        :key="comp.name"
      />
    </template>
    <template v-else>
      Copyright©2025 @rakit-admin
    </template>
  </n-layout-footer>
</template>
