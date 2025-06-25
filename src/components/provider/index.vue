<script lang="ts" setup>
import ContentHolder from "./context.vue"
import DrawerProvider from "./drawer-provider.vue"
import ModalProvider from "./modal-provider.vue"
</script>

<template>
  <n-dialog-provider>
    <n-modal-provider>
      <n-message-provider>
        <n-notification-provider>
          <drawer-provider>
            <modal-provider>
              <ContentHolder />
              <slot />
            </modal-provider>
          </drawer-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-modal-provider>
  </n-dialog-provider>
</template>
