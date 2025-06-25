<script lang="ts" setup>
import { isNumber } from "radash"

export interface ModalProps {
  title?: string
  width?: string | number
  spin?: boolean
  footer?: boolean
  fullscreen?: boolean
}

export interface ModalFooterEmits {
  (e?: "submit"): void
  (e?: "close"): void
}

const props = withDefaults(defineProps<ModalProps>(), {
  width: "500px",
  spin: false,
  footer: true,
  fullscreen: true,
})

const emits = defineEmits<ModalFooterEmits>()

const modalId = ref<string>("")
const getLatestModalId = inject("ra-modal-getLastetModalId") as () => string
const destoryModal = inject("ra-modal-destory") as (id: string) => void

const show = ref<boolean>(false)
onMounted(() => {
  modalId.value = getLatestModalId()
  setTimeout(() => {
    show.value = true
  }, 50)
})

watch(() => show.value, () => {
  if (!show.value) {
    setTimeout(() => {
      destoryModal(modalId.value)
    }, 500)
  }
})

function handleClose() {
  show.value = false
  emits("close")
}

interface ModalExpose {
  close: () => void
}

const isFullscreen = ref<boolean>(false)
function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value
}

const style = computed(() => {
  if (isFullscreen.value) {
    return {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: "0 !important",
      left: "0 !important",
      right: "0 !important",
      bottom: "0 !important",
      transform: "none",
      borderRadius: "0",
      margin: "0 !important",
    }
  }
  return {
    width: isNumber(props.width) ? `${props.width}px` : props.width,
  }
})

defineExpose<ModalExpose>({
  close: handleClose,
})
</script>

<template>
  <n-modal
    v-model:show="show"
    :title="title"
    :auto-focus="false"
    :closable="false"
    :draggable="true"
    :mask="true"
    :mask-closable="true"
    transform-origin="mouse"
    preset="card"
    class="ra-modal"
    :class="[isFullscreen ? 'is-fullscreen' : 'is-adaptive']"
    :style="style"
  >
    <template #header-extra>
      <n-el tag="div" class="flex gap-2">
        <ra-icon
          v-if="props.fullscreen"
          :name="isFullscreen ? 'ra:screen-exit' : 'ra:screen-full'"
          class="flex-center h-28px w-28px cursor-pointer hover:bg-[var(--hover-color)] rounded-full"
          :size="18"
          @click="toggleFullscreen"
        />
        <ra-icon
          name="ra:xmark"
          class="flex-center h-28px w-28px cursor-pointer hover:bg-[var(--hover-color)] rounded-full xmark-icon"
          :size="18"
          @click="handleClose"
        />
      </n-el>
    </template>
    <template #default>
      <n-scrollbar trigger="none" class="max-h-80vh" content-class="scroll-content">
        <n-spin :show="spin">
          <slot name="default" />
        </n-spin>
      </n-scrollbar>
    </template>
    <template #footer>
      <template v-if="footer">
        <n-flex justify="right" :size="16">
          <n-button :loading="spin" @click="handleClose">
            取消
          </n-button>
          <n-button type="primary" @click="emits('submit')">
            确定
          </n-button>
        </n-flex>
      </template>
      <slot v-else name="footer" />
    </template>
  </n-modal>
</template>

<style lang="scss">
.ra-modal {
  &.is-adaptive {
    & > .n-card__content {
      max-height: 80vh;
    }
  }
  & > .n-card-header {
    border-bottom: 1px solid var(--n-border-color);
    padding: 12px 24px;
    font-size: 16px;
    .n-card-header__close {
      border-radius: 50%;
    }
  }
  & > .n-card__content {
    padding: 0;
    min-height: 200px;
    //overflow-y: auto;
    //padding-top: var(--n-padding-top);
    .scroll-content {
      padding: 24px 26px;
    }
  }
  & > .n-card__footer {
    border-top: 1px solid var(--n-border-color);
    padding: 12px 24px;
  }
  .xmark-icon {
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: rotate(90deg);
    }
  }
}
</style>
