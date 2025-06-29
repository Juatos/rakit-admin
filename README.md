# @rakit/admin

一个基于 Vue 3 + TypeScript + Naive UI 的现代化管理后台框架，提供完整的中后台解决方案。

## 特性

🎯 **现代技术栈**
- Vue 3 + TypeScript + Vite
- Naive UI 组件库
- Vue Router 4 路由管理
- Pinia 状态管理

🎨 **丰富的组件**
- 智能数据表格
- 详情展示组件
- 表单组件
- 图标管理
- 模态框和抽屉

🛠 **完整功能**
- 布局系统
- 路由管理
- HTTP 请求封装
- 主题配置
- TypeScript 类型支持

## 安装

```bash
# pnpm
pnpm add @rakit/admin

# npm
npm install @rakit/admin

# yarn
yarn add @rakit/admin
```

## 快速开始

### 1. 安装依赖

确保安装了必要的 peer dependencies：

```bash
pnpm add vue vue-router pinia @vueuse/core alova dayjs radash
```

### 2. 基础设置

在你的 Vue 应用中设置框架：

```typescript
import { useSetup } from "@rakit/admin"
import { createApp } from "vue"
import App from "./App.vue"

const app = createApp(App)

// 使用框架设置
app.use(useSetup({
  router: {
    // 路由配置
  },
  http: {
    // HTTP 配置
  },
  theme: {
    // 主题配置
  }
}))

app.mount("#app")
```

### 3. 使用组件

```vue
<script setup lang="ts">
import { KButton, KDataTable, KDetail } from "@rakit/admin"

// 组件配置...
</script>

<template>
  <div>
    <!-- 数据表格 -->
    <KDataTable
      :columns="columns"
      :data="data"
      :queries="queries"
    />

    <!-- 详情组件 -->
    <KDetail :items="detailItems" />

    <!-- 按钮组件 -->
    <KButton type="primary">
      提交
    </KButton>
  </div>
</template>
```

## 组件文档

### 按钮组件 (KButton)

基于 Naive UI Button 的增强按钮组件，支持图标和标题配置。

#### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| icon | string | "" | 按钮图标名称 |
| title | string | "" | 按钮标题文本 |
| type | ButtonType | "default" | 按钮类型：primary, info, success, warning, error, default |
| size | ButtonSize | "medium" | 按钮尺寸：tiny, small, medium, large, huge |
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否显示加载状态 |
| round | boolean | false | 是否圆角 |
| circle | boolean | false | 是否圆形 |

#### 使用示例

```vue
<template>
  <!-- 基础用法 -->
  <KButton type="primary" icon="rk:plus" title="新增" />
  
  <!-- 不同尺寸 -->
  <KButton size="small" type="primary" icon="rk:edit" title="编辑" />
  <KButton size="large" type="success" icon="rk:check" title="保存" />
  
  <!-- 不同状态 -->
  <KButton type="warning" icon="rk:warning" title="警告" disabled />
  <KButton type="primary" icon="rk:loading" title="加载中" :loading="true" />
  
  <!-- 自定义内容 -->
  <KButton type="primary">
    <template #icon>
      <rk-icon name="rk:user" size="16" />
    </template>
    用户管理
  </KButton>
</template>
```

### 卡片组件 (KCard)

功能丰富的卡片容器组件，支持标题、操作、插槽等功能。

#### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | "" | 卡片标题 |
| size | CardSize | "medium" | 卡片尺寸：small, medium, large |
| type | CardType | "default" | 卡片类型：default, bordered, shadow |
| closable | boolean | false | 是否可关闭 |
| collapsible | boolean | false | 是否可折叠 |
| collapsed | boolean | false | 是否默认折叠 |

#### 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 卡片内容 |
| header | 自定义头部 |
| action | 操作区域 |
| footer | 底部区域 |

#### 使用示例

```vue
<template>
  <!-- 基础卡片 -->
  <KCard title="基础卡片">
    <p>这是卡片的内容</p>
  </KCard>
  
  <!-- 带操作的卡片 -->
  <KCard title="带操作的卡片">
    <template #action>
      <KButton type="primary" size="small" icon="rk:edit" title="编辑" />
    </template>
    <p>卡片内容</p>
  </KCard>
  
  <!-- 可折叠卡片 -->
  <KCard title="可折叠卡片" collapsible>
    <p>可折叠的内容</p>
  </KCard>
</template>
```

### 表单组件 (KForm)

强大的表单组件，支持多种表单项类型和布局。

#### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| model | object | {} | 表单数据模型 |
| rules | object | {} | 验证规则 |
| layout | FormLayout | "horizontal" | 布局方式：horizontal, vertical, inline |
| size | FormSize | "medium" | 表单尺寸：small, medium, large |
| labelWidth | string \| number | "auto" | 标签宽度 |
| labelPlacement | LabelPlacement | "left" | 标签位置：left, top |

#### 表单项类型

- input: 文本输入框
- textarea: 多行文本
- number: 数字输入框
- select: 下拉选择
- date: 日期选择
- datetime: 日期时间选择
- time: 时间选择
- date-range: 日期范围
- datetime-range: 日期时间范围
- time-range: 时间范围
- checkbox: 复选框
- radio: 单选框
- switch: 开关
- upload: 文件上传

#### 使用示例

```vue
<template>
  <KForm
    :model="formData"
    :rules="rules"
    layout="horizontal"
    label-width="120px"
  >
    <KFormItem label="用户名" prop="username">
      <KInput v-model:value="formData.username" placeholder="请输入用户名" />
    </KFormItem>
    
    <KFormItem label="邮箱" prop="email">
      <KInput v-model:value="formData.email" placeholder="请输入邮箱" />
    </KFormItem>
    
    <KFormItem label="角色" prop="role">
      <KSelect v-model:value="formData.role" :options="roleOptions" />
    </KFormItem>
    
    <KFormItem>
      <KButton type="primary" @click="handleSubmit">提交</KButton>
    </KFormItem>
  </KForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  username: '',
  email: '',
  role: ''
})

const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  email: [{ required: true, message: '请输入邮箱', type: 'email' }],
  role: [{ required: true, message: '请选择角色' }]
}

const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '用户', value: 'user' }
]
</script>
```

### 模态框组件 (KModal)

灵活的模态框组件，支持多种类型和自定义内容。

#### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| visible | boolean | false | 是否显示 |
| title | string | "" | 模态框标题 |
| width | string \| number | 520 | 模态框宽度 |
| size | ModalSize | "medium" | 模态框尺寸：small, medium, large, huge |
| type | ModalType | "default" | 模态框类型：default, confirm, warning, error |
| closable | boolean | true | 是否可关闭 |
| maskClosable | boolean | true | 点击遮罩是否关闭 |
| showFooter | boolean | true | 是否显示底部按钮 |

#### 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 模态框内容 |
| header | 自定义头部 |
| footer | 自定义底部 |

#### 使用示例

```vue
<template>
  <!-- 基础模态框 -->
  <KModal v-model:visible="visible" title="基础模态框">
    <p>这是模态框的内容</p>
  </KModal>
  
  <!-- 确认模态框 -->
  <KModal
    v-model:visible="confirmVisible"
    title="确认删除"
    type="confirm"
    @ok="handleConfirm"
  >
    <p>确定要删除这条记录吗？</p>
  </KModal>
  
  <!-- 自定义模态框 -->
  <KModal v-model:visible="customVisible" title="自定义模态框" width="800px">
    <template #footer>
      <KButton @click="customVisible = false">取消</KButton>
      <KButton type="primary" @click="handleCustomOk">确定</KButton>
    </template>
    <div>自定义内容</div>
  </KModal>
</template>
```

### 抽屉组件 (KDrawer)

侧边抽屉组件，支持多种方向和自定义内容。

#### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| visible | boolean | false | 是否显示 |
| title | string | "" | 抽屉标题 |
| placement | DrawerPlacement | "right" | 抽屉位置：left, right, top, bottom |
| width | string \| number | 300 | 抽屉宽度 |
| height | string \| number | 300 | 抽屉高度（top/bottom 时生效） |
| size | DrawerSize | "medium" | 抽屉尺寸：small, medium, large, huge |
| closable | boolean | true | 是否可关闭 |
| maskClosable | boolean | true | 点击遮罩是否关闭 |

#### 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 抽屉内容 |
| header | 自定义头部 |
| footer | 自定义底部 |

#### 使用示例

```vue
<template>
  <!-- 右侧抽屉 -->
  <KDrawer v-model:visible="rightVisible" title="右侧抽屉" placement="right">
    <p>右侧抽屉内容</p>
  </KDrawer>
  
  <!-- 左侧抽屉 -->
  <KDrawer v-model:visible="leftVisible" title="左侧抽屉" placement="left" width="400px">
    <p>左侧抽屉内容</p>
  </KDrawer>
  
  <!-- 表单抽屉 -->
  <KDrawer v-model:visible="formVisible" title="表单抽屉" placement="right">
    <KForm :model="formData">
      <KFormItem label="名称">
        <KInput v-model:value="formData.name" />
      </KFormItem>
    </KForm>
    <template #footer>
      <KButton @click="formVisible = false">取消</KButton>
      <KButton type="primary" @click="handleSubmit">确定</KButton>
    </template>
  </KDrawer>
</template>
```

### 数据表格组件 (KDataTable)

功能强大的数据表格组件，支持搜索、分页、排序、操作等功能。

#### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| columns | DTableColumn[] | [] | 表格列配置 |
| queries | DTableQuery[] | [] | 搜索表单配置 |
| pagination | object \| false | { size: 20 } | 分页配置 |
| actions | DTableAction[] | [] | 操作栏按钮配置 |
| extras | DTableExtra[] | [] | 工具栏按钮配置 |
| rowSelection | boolean | false | 是否支持行选择 |
| showToolbar | boolean | true | 是否显示工具栏 |
| isSimple | boolean | false | 是否为简单模式 |

#### 列配置 (DTableColumn)

| 参数 | 类型 | 说明 |
|------|------|------|
| key | string \| number | 列标识 |
| title | string \| function | 列标题 |
| width | number | 列宽度 |
| fixed | "left" \| "right" | 固定列位置 |
| render | function | 自定义渲染函数 |
| props | ColumnProps | 列属性配置 |

#### 搜索配置 (DTableQuery)

| 参数 | 类型 | 说明 |
|------|------|------|
| field | string | 字段名 |
| label | string | 标签文本 |
| component | string | 组件类型 |
| options | SelectOption[] | 选项（select 类型） |
| placeholder | string | 占位符 |
| giSpan | number | 栅格跨度 |

#### 使用示例

```vue
<template>
  <KDataTable
    :columns="columns"
    :queries="queries"
    :actions="actions"
    :extras="extras"
    :pagination="{ size: 20 }"
    @search="handleSearch"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { key: 'id', title: 'ID', width: 80 },
  { key: 'name', title: '姓名', width: 120 },
  { key: 'email', title: '邮箱' },
  { key: 'status', title: '状态', render: (row) => row.status === 1 ? '启用' : '禁用' },
  { key: 'actions', title: '操作', width: 200, fixed: 'right' }
]

const queries = [
  { field: 'name', label: '姓名', component: 'input', placeholder: '请输入姓名' },
  { field: 'status', label: '状态', component: 'select', options: [
    { label: '启用', value: 1 },
    { label: '禁用', value: 0 }
  ]}
]

const actions = [
  { label: '编辑', type: 'info', icon: 'rk:edit', handler: (row) => handleEdit(row) },
  { label: '删除', type: 'error', icon: 'rk:delete', handler: (row) => handleDelete(row) }
]

const extras = [
  { label: '新增', type: 'primary', icon: 'rk:plus', handler: () => handleAdd() },
  { label: '批量删除', type: 'error', icon: 'rk:delete', isBatch: true, handler: (rows) => handleBatchDelete(rows) }
]

const handleSearch = async (form) => {
  // 处理搜索逻辑
  console.log('搜索表单:', form)
}
</script>
```

### 详情组件 (KDetail)

用于展示详细信息的组件，支持多种布局和自定义渲染。

#### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| items | DetailItem[] | [] | 详情项配置 |
| layout | DetailLayout | "horizontal" | 布局方式：horizontal, vertical |
| size | DetailSize | "medium" | 详情尺寸：small, medium, large |
| labelWidth | string \| number | "auto" | 标签宽度 |
| colon | boolean | true | 是否显示冒号 |

#### 详情项配置 (DetailItem)

| 参数 | 类型 | 说明 |
|------|------|------|
| label | string | 标签文本 |
| value | any | 值 |
| render | function | 自定义渲染函数 |
| span | number | 栅格跨度 |

#### 使用示例

```vue
<template>
  <KDetail
    :items="detailItems"
    layout="horizontal"
    label-width="120px"
  />
</template>

<script setup lang="ts">
const detailItems = [
  { label: '姓名', value: '张三' },
  { label: '年龄', value: 25 },
  { label: '邮箱', value: 'zhangsan@example.com' },
  { label: '状态', value: 1, render: (value) => value === 1 ? '启用' : '禁用' },
  { label: '创建时间', value: '2024-01-01 12:00:00' }
]
</script>
```

### 图标组件 (KIcon)

统一的图标管理组件，支持多种图标类型和自定义图标。

#### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | string | "" | 图标名称 |
| size | number \| string | 16 | 图标尺寸 |
| color | string | "" | 图标颜色 |
| type | IconType | "basic" | 图标类型：basic, animate |

#### 使用示例

```vue
<template>
  <!-- 基础图标 -->
  <KIcon name="rk:user" size="20" />
  
  <!-- 带颜色的图标 -->
  <KIcon name="rk:check" size="16" color="#52c41a" />
  
  <!-- 动画图标 -->
  <KIcon name="rk:loading" type="animate" size="24" />
</template>
```

## 布局系统

### 主布局 (KLayout)

提供完整的后台布局解决方案，支持扩展点配置。

#### 扩展点

| 扩展点 | 说明 | 位置 |
|--------|------|------|
| header-left | 头部左侧 | 头部区域左侧 |
| header-right | 头部右侧 | 头部区域右侧 |
| sider-top | 侧边栏顶部 | 侧边栏顶部 |
| sider-bottom | 侧边栏底部 | 侧边栏底部 |
| content-top | 内容区顶部 | 内容区域顶部 |
| content-bottom | 内容区底部 | 内容区域底部 |
| footer-left | 底部左侧 | 底部区域左侧 |
| footer-right | 底部右侧 | 底部区域右侧 |

#### 扩展类型

- replace: 替换原有内容
- before: 在原内容前插入
- after: 在原内容后插入

#### 使用示例

```vue
<template>
  <KLayout>
    <!-- 扩展头部右侧 -->
    <template #header-right>
      <KButton type="primary" icon="rk:setting" title="设置" />
    </template>
    
    <!-- 扩展侧边栏底部 -->
    <template #sider-bottom>
      <div class="p-4">
        <KButton type="info" icon="rk:user" title="用户信息" />
      </div>
    </template>
    
    <!-- 主要内容 -->
    <router-view />
  </KLayout>
</template>
```

## Hooks 文档

### useRakit

核心 Hook，提供框架的所有功能接口。

#### 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| store | AdminStore | 状态管理 |
| router | Router | 路由实例 |
| theme | ThemeContext | 主题上下文 |
| defaultRoute | string | 首页路径 |
| message | MessageProviderInst | 消息提示 |
| dialog | DialogProviderInst | 对话框 |
| notification | NotificationProviderInst | 通知 |
| drawer | DrawerInstance | 抽屉实例 |
| modal | ModalInstance | 模态框实例 |
| menus | menuStore | 菜单管理 |
| tabs | TabStore | 标签页管理 |
| crumbs | CrumbStore | 面包屑管理 |

#### 使用示例

```vue
<script setup lang="ts">
import { useRakit } from '@rakit/admin'

const {
  store,
  router,
  theme,
  message,
  dialog,
  menus,
  tabs
} = useRakit()

// 导航到指定页面
const goToPage = (path: string) => {
  router.push(path)
}

// 显示消息
const showMessage = () => {
  message.success('操作成功')
}

// 显示确认对话框
const showConfirm = () => {
  dialog.warning({
    title: '确认删除',
    content: '确定要删除这条记录吗？',
    onPositiveClick: () => {
      // 确认操作
    }
  })
}

// 切换主题
const toggleTheme = () => {
  theme.toggle()
}

// 添加标签页
const addTab = (route: any) => {
  tabs.add(route)
}
</script>
```

### useTheme

主题管理 Hook，提供主题切换和配置功能。

#### 方法

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| toggle | - | void | 切换明暗主题 |
| setMode | mode: ThemeMode | void | 设置主题模式 |
| setOverrides | overrides: ThemeOverrides | void | 设置主题覆盖 |
| reset | - | void | 重置主题 |

#### 使用示例

```vue
<script setup lang="ts">
import { useTheme } from '@rakit/admin'

const theme = useTheme()

// 切换主题
const toggleTheme = () => {
  theme.toggle()
}

// 设置主题模式
const setLightTheme = () => {
  theme.setMode('light')
}

const setDarkTheme = () => {
  theme.setMode('dark')
}

// 自定义主题
const setCustomTheme = () => {
  theme.setOverrides({
    common: {
      primaryColor: '#1890ff',
      primaryColorHover: '#40a9ff'
    }
  })
}
</script>
```

## 主题配置

### 主题模式

支持明暗两种主题模式：

```typescript
enum ADMIN_THEME_MODE {
  DARK = "DARK",
  LIGHT = "LIGHT"
}
```

### 主题配置选项

```typescript
interface SetupThemeOption {
  mode?: ADMIN_THEME_MODE.LIGHT | ADMIN_THEME_MODE.DARK
  hasDark?: boolean
  overrides?: AdminThemeOverrides
  darkOverrides?: AdminThemeOverrides
}
```

### 主题覆盖配置

```typescript
interface AdminThemeOverrides {
  common?: Partial<ThemeCommonVars & { [key: string]: string }>
  [key: string]: any
}
```

### 使用示例

```typescript
import { useSetup } from '@rakit/admin'

// 基础主题配置
useSetup({
  theme: {
    mode: 'light',
    hasDark: true
  }
})

// 自定义主题配置
useSetup({
  theme: {
    mode: 'light',
    hasDark: true,
    overrides: {
      common: {
        primaryColor: '#1890ff',
        primaryColorHover: '#40a9ff',
        primaryColorPressed: '#096dd9'
      }
    },
    darkOverrides: {
      common: {
        primaryColor: '#177ddc',
        primaryColorHover: '#1890ff',
        primaryColorPressed: '#0958b5'
      }
    }
  }
})
```

## 路由配置

### 路由管理器

提供路由注册、导航、守卫等功能。

#### 方法

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| register | routes: RouteRecordRaw[] | void | 注册路由 |
| addRoute | route: RouteRecordRaw | void | 添加路由 |
| removeRoute | name: string | void | 移除路由 |
| hasRoute | name: string | boolean | 检查路由是否存在 |
| getRoutes | - | RouteRecordRaw[] | 获取所有路由 |

#### 使用示例

```typescript
import { useRakitRouter } from '@rakit/admin'

const { router, register } = useRakitRouter()

// 注册路由
register([
  {
    path: '/user',
    name: 'User',
    component: () => import('./views/user/index.vue'),
    meta: {
      title: '用户管理',
      icon: 'rk:user'
    }
  }
])

// 导航
router.push('/user')
```

## HTTP 请求

### HTTP 管理器

基于 Alova 的 HTTP 请求封装，提供统一的请求接口。

#### 配置选项

```typescript
interface HttpConfig {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
  withCredentials?: boolean
}
```

#### 使用示例

```typescript
import { http } from '@rakit/admin'

// GET 请求
const getUsers = async () => {
  const response = await http.get('/api/users')
  return response.data
}

// POST 请求
const createUser = async (userData: any) => {
  const response = await http.post('/api/users', userData)
  return response.data
}

// PUT 请求
const updateUser = async (id: string, userData: any) => {
  const response = await http.put(`/api/users/${id}`, userData)
  return response.data
}

// DELETE 请求
const deleteUser = async (id: string) => {
  const response = await http.delete(`/api/users/${id}`)
  return response.data
}
```

## 类型定义

框架提供完整的 TypeScript 类型定义：

```typescript
import type {
  // 组件 Props
  ButtonProps,
  CardProps,
  FormProps,
  ModalProps,
  DrawerProps,
  DataTableProps,
  DetailProps,
  IconProps,
  
  // 表格相关
  DTableColumn,
  DTableQuery,
  DTableAction,
  DTableExtra,
  
  // 布局相关
  LayoutExtension,
  ExtensionPosition,
  
  // 主题相关
  AdminThemeOverrides,
  SetupThemeOption,
  
  // 路由相关
  RouteMeta,
  
  // HTTP 相关
  HttpConfig,
  
  // 通用类型
  ThemeType,
  ButtonType,
  SizeType
} from "@rakit/admin"
```

## 开发指南

### 本地开发

```bash
# 克隆项目
git clone https://github.com/Juatos/front-admin.git

# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build
```

### 目录结构

```
src/
├── components/     # 组件库
│   ├── button/    # 按钮组件
│   ├── card/      # 卡片组件
│   ├── data-table/ # 数据表格
│   ├── detail/    # 详情组件
│   ├── drawer/    # 抽屉组件
│   ├── form/      # 表单组件
│   ├── icon/      # 图标组件
│   ├── modal/     # 模态框组件
│   └── provider/  # 提供者组件
├── hooks/         # 组合式函数
├── layouts/       # 布局组件
├── router/        # 路由管理
├── stores/        # 状态管理
├── themes/        # 主题配置
├── http/          # HTTP 请求
└── types/         # 类型定义
```

## 许可证

MIT License

## 贡献

欢迎提交 Pull Request 和 Issue！

## 相关链接

- [Vue 3](https://v3.vuejs.org/)
- [Naive UI](https://www.naiveui.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Alova](https://alova.js.org/)
