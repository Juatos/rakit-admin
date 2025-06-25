<script lang="ts" setup>
import { useDialog, useMessage, useNotification } from "naive-ui"
import { drawerInstance, modalInstance } from "./hook"

window.$dialog = useDialog()
window.$message = useMessage()
window.$notification = useNotification()
window.$modal = modalInstance()
window.$drawer = drawerInstance()
</script>

<template>
  <div />
</template>
