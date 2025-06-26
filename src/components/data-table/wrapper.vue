<script lang="ts" setup>
withDefaults(defineProps<{
  spin?: boolean
  isSimple?: boolean
}>(), {
  spin: false,
  isSimple: false,
})
</script>

<template>
  <rk-card v-if="!isSimple" :spin="spin">
    <slot />
  </rk-card>
  <div v-else class="min-h-500px">
    <n-spin :show="spin">
      <slot />
    </n-spin>
  </div>
</template>
