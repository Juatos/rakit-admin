export function useElement(showToolbar: boolean = true) {
  const tableCntRef = ref()

  const { height: cntHeight } = useElementSize(tableCntRef)

  const tableHeight = computed(() => {
    return cntHeight.value - 82
  })

  const maxHeight = computed(() => {
    return showToolbar ? tableHeight.value - 88 : tableHeight.value
  })

  return {
    tableHeight,
    maxHeight,
    tableCntRef,
  }
}
