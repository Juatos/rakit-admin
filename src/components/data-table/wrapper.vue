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
  <k-card v-if="!isSimple" :spin="spin">
    <slot />
  </k-card>
  <div v-else class="min-h-500px">
    <n-spin :show="spin">
      <slot />
    </n-spin>
  </div>
</template>
