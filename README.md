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

### 数据表格 (SmDataTable)

功能强大的数据表格组件，支持搜索、分页、排序等功能。

```vue
 <KDataTable
  :columns="columns"
  :data="data"
  :queries="queries"
  @search="handleSearch"
/>
```

### 详情组件 (SmDetail)

用于展示详细信息的组件。

```vue
 <KDetail :items="detailItems" />
```

### 布局组件 (SmLayout)

提供完整的后台布局解决方案。

```vue
 <KLayout>
  <router-view />
 </KLayout>
```

## 类型定义

框架提供完整的 TypeScript 类型定义：

```typescript
import type {
  ButtonProps,
  DTableProps,
  KDetailProps,
  SetupOptions
} from "@rakit/admin"
```

## 主题定制

支持灵活的主题定制：

```typescript
import { useSetup } from "@rakit/admin"

useSetup({
  theme: {
    primaryColor: "#1890ff",
    // 更多主题配置...
  }
})
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
├── hooks/         # 组合式函数
├── layouts/       # 布局组件
├── router/        # 路由管理
├── stores/        # 状态管理
├── themes/        # 主题配置
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
