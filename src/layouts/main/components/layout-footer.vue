<script lang="ts" setup>
import { useRakit } from "$rk"

const { layoutStore } = useRakit()
</script>

<template>
  <n-layout-footer bordered class="h-30px text-center leading-30px text-12px">
    <template v-if="layoutStore.extensions?.FOOTER">
      <component
        :is="layoutStore.extensions?.FOOTER"
        key="FOOTER"
      />
    </template>
    <template v-else>
      Copyright©2025 @rakit-admin
    </template>
  </n-layout-footer>
</template>
