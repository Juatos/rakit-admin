<script lang="ts" setup>
import type { FormInst, FormItem, FormItemValue, KFormProps } from "./types"

const props = withDefaults(defineProps <KFormProps>(), {
  showLabel: true,
  showFeedback: true,
  labelPlacement: "left",
  labelWidth: "100px",
  size: "medium",
  disabled: false,
  grid: true,
})

// 表单引用
const formRef = ref<any>(null)

// 表单模型数据
const model = ref<Record<string, FormItemValue>>({})

// 响应式显示状态
// const disabledRefs = ref<Record<string, boolean>>({})

const showRefs = computed(() => {
  const newShowRefs: Record<string, boolean> = {}
  props.schema.forEach((item) => {
    newShowRefs[item.field]
        = typeof item.show === "function"
        ? item.show({ model })
        : (item?.show ?? true)
  })
  return newShowRefs
})

// 响应式禁用状态
const disabledRefs = computed(() => {
  if (props.disabled) {
    return {}
  }
  const newDisabledRefs: Record<string, boolean> = {}
  props.schema.forEach((item) => {
    newDisabledRefs[item.field]
        = typeof item.disabled === "function"
        ? item.disabled({ model })
        : (item?.disabled ?? false)
  })
  return newDisabledRefs
})

// 表单项是否显示
function isShow(item: FormItem) {
  return showRefs.value[item.field] ?? true
}

// 表单项是否禁用
function isDisabled(item: FormItem): boolean {
  return !props.disabled ? (disabledRefs.value[item.field] ?? false) : true
}

// 初始化表单默认值
function initDefaultValues() {
  const defaultValues: Record<string, any> = {}
  props.schema.forEach((item) => {
    if (item.defaultValue !== undefined) {
      defaultValues[item.field] = item.defaultValue
    }
  })

  if (Object.keys(defaultValues).length > 0) {
    model.value = { ...defaultValues }
  }
}

// 监听schema变化，初始化默认值
watch(
  () => props.schema,
  initDefaultValues,
  { immediate: true, deep: true },
)

// 监听model变化，更新显示和禁用状态
// watch(
//   () => model.value,
//   () => {
//     console.log(model.value, "model==")
//     // computeShowRefs()
//     // computeDisabledRefs()
//   },
//   { immediate: true, deep: true },
// )

// 监听props.disabled变化
// watch(
//   () => props.disabled,
//   () => {
//     computeDisabledRefs()
//   },
//   { immediate: true },
// )

// 表单验证
async function validate() {
  if (!formRef.value) {
    return Promise.resolve()
  }
  await formRef.value.validate()
  return toRaw(model.value)
}

// 重置表单
function reset() {
  if (!formRef.value) {
    return
  }
  formRef.value.restoreValidation()

  const defaultValues: Record<string, any> = {}
  props.schema.forEach((item) => {
    if (item.defaultValue !== undefined) {
      defaultValues[item.field] = item.defaultValue
    }
    else {
      defaultValues[item.field] = null
    }
  })

  // 重置表单状态
  model.value = defaultValues
}

// 清除验证
function clearValidate(fields?: string | string[]) {
  if (!formRef.value) {
    return
  }
  formRef.value.restoreValidation(fields)
}

function setModelValue(key: string, value: any) {
  model.value[key] = value
}

// 暴露方法和数据
defineExpose<FormInst>({
  model,
  validate,
  reset,
  clearValidate,
  setModelValue,
})
</script>

<template>
  <n-form
    ref="formRef"
    class="rk-form py-2 px-4"
    :model="model"
    :label-placement="props.labelPlacement"
    :label-width="props.labelWidth"
    :show-label="props?.showLabel"
    :size="props.size"
    :inline="props?.layout === 'inline'"
    :show-feedback="props.showFeedback"
    v-bind="(props?.formProps || {})"
  >
    <n-grid cols="24" x-gap="12" y-gap="4">
      <template v-for="(item, index) in (props?.schema || [])" :key="item.field || index">
        <n-form-item-gi
          v-if="isShow(item)"
          :label="item.label"
          :path="item.field"
          :rule="item.rules || []"
          :show-require-mark="item.rules?.some((rule: any) => rule.required)"
          :span="(props?.grid === false) ? 24 : (item.giSpan || 12)"
        >
          <!-- 输入框 -->
          <n-input
            v-if="item.type === 'input'"
            v-model:value="model[item.field]"
            :placeholder="item.placeholder"
            :disabled="isDisabled(item)"
            clearable
            :style="item.style || {}"
            v-bind="item.props || {}"
          >
            <template v-for="(slot, name) in item.slots" :key="name" #[name]>
              <component :is="slot()" />
            </template>
          </n-input>

          <!-- 密码框 -->
          <n-input
            v-else-if="item.type === 'password'"
            v-model:value="model[item.field]"
            type="password"
            show-password-on="click"
            :placeholder="item.placeholder"
            :disabled="isDisabled(item)"
            clearable
            :style="item.style || {}"
            v-bind="item.props || {}"
          >
            <template v-for="(slot, name) in item.slots" :key="name" #[name]>
              <component :is="slot()" />
            </template>
          </n-input>

          <!-- 文本域 -->
          <n-input
            v-else-if="item.type === 'textarea'"
            v-model:value="model[item.field]"
            type="textarea"
            :placeholder="item.placeholder"
            :disabled="isDisabled(item)"
            clearable
            :style="item.style || {}"
            v-bind="item.props || {}"
          >
            <template v-for="(slot, name) in item.slots" :key="name" #[name]>
              <component :is="slot()" />
            </template>
          </n-input>

          <!-- 数字输入框 -->
          <n-input-number
            v-else-if="item.type === 'number'"
            v-model:value="model[item.field]"
            :placeholder="item.placeholder"
            :disabled="isDisabled(item)"
            clearable
            :style="item.style || {}"
            v-bind="item.props || {}"
          >
            <template v-for="(slot, name) in item.slots" :key="name" #[name]>
              <component :is="slot()" />
            </template>
          </n-input-number>

          <!-- 选择器 -->
          <n-select
            v-else-if="item.type === 'select'"
            v-model:value="model[item.field]"
            :options="item.props?.options"
            :placeholder="item.placeholder"
            :disabled="isDisabled(item)"
            clearable
            :style="item.style || {}"
            v-bind="item.props || {}"
          >
            <template v-for="(slot, name) in item.slots" :key="name" #[name]>
              <component :is="slot()" />
            </template>
          </n-select>

          <!-- 单选框组 -->
          <n-radio-group
            v-else-if="item.type === 'radio'"
            v-model:value="model[item.field]"
            :disabled="isDisabled(item)"
            :style="item.style || {}"
            v-bind="item.props || {}"
          >
            <template v-for="(slot, name) in item.slots" :key="name" #[name]>
              <component :is="slot()" />
            </template>
            <n-space v-if="!item.slots?.default">
              <n-radio
                v-for="option in item.options || item.props?.options || []"
                :key="option.value"
                :value="option.value"
                :disabled="option.disabled"
              >
                {{ option.label }}
              </n-radio>
            </n-space>
          </n-radio-group>

          <!-- 复选框组 -->
          <n-checkbox-group
            v-else-if="item.type === 'checkbox'"
            v-model:value="model[item.field]"
            :disabled="isDisabled(item)"
            :style="item.style || {}"
            v-bind="item.props || {}"
          >
            <template v-for="(slot, name) in item.slots" :key="name" #[name]>
              <component :is="slot()" />
            </template>
            <n-space v-if="!item.slots?.default">
              <n-checkbox
                v-for="option in item.options || []"
                :key="option.value"
                :value="option.value"
                :disabled="option.disabled"
              >
                {{ option.label }}
              </n-checkbox>
            </n-space>
          </n-checkbox-group>

          <!-- 开关 -->
          <n-switch
            v-else-if="item.type === 'switch'"
            v-model:value="model[item.field]"
            :disabled="isDisabled(item)"
            :style="item.style || {}"
            v-bind="item.props || {}"
          >
            <template v-for="(slot, name) in item.slots" :key="name" #[name]>
              <component :is="slot()" />
            </template>
          </n-switch>

          <!-- 日期选择器 -->
          <n-date-picker
            v-else-if="item.type === 'date'"
            v-model:value="model[item.field]"
            :placeholder="item.placeholder"
            :disabled="isDisabled(item)"
            clearable
            :style="item.style || {}"
            v-bind="item.props || {}"
          >
            <template v-for="(slot, name) in item.slots" :key="name" #[name]>
              <component :is="slot()" />
            </template>
          </n-date-picker>

          <!-- 时间选择器 -->
          <n-time-picker
            v-else-if="item.type === 'time'"
            v-model:value="model[item.field]"
            :placeholder="item.placeholder"
            :disabled="isDisabled(item)"
            clearable
            :style="item.style || {}"
            v-bind="item.props || {}"
          >
            <template v-for="(slot, name) in item.slots" :key="name" #[name]>
              <component :is="slot()" />
            </template>
          </n-time-picker>

          <!-- 日期时间选择器 -->
          <n-date-picker
            v-else-if="item.type === 'datetime'"
            v-model:value="model[item.field]"
            type="datetime"
            :disabled="isDisabled(item)"
            clearable
            :style="item.style || {}"
            v-bind="item.props || {}"
          >
            <template v-for="(slot, name) in item.slots" :key="name" #[name]>
              <component :is="slot()" />
            </template>
          </n-date-picker>

          <!-- 级联选择器 -->
          <n-cascader
            v-else-if="item.type === 'cascader'"
            v-model:value="model[item.field]"
            :options="item.props?.options"
            :placeholder="item.placeholder"
            :disabled="isDisabled(item)"
            clearable
            :style="item.style || {}"
            v-bind="item.props || {}"
          >
            <template v-for="(slot, name) in item.slots" :key="name" #[name]>
              <component :is="slot()" />
            </template>
          </n-cascader>

          <!-- 自定义渲染 -->
          <component
            :is="item.render(model)"
            v-else-if="item.type === 'custom' && item.render"
          />
        </n-form-item-gi>
      </template>
    </n-grid>
  </n-form>
</template>
