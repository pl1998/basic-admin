<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <div>
    <page-header title="页头" content="PageHeader" />
    <page-header title="页面标题">
      <template #content>
        <p>提供两块插槽：</p>
        <p>一块是 content 区域插槽，一块是右侧区域</p>
      </template>
      <el-button round>
        <template #icon>
          <svg-icon name="ep:arrow-left" />
        </template>
        返回
      </el-button>
    </page-header>
  </div>
</template>
