<template>
  <div>
    <el-divider content-position="left">
      基础用法
    </el-divider>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">
        主要按钮
      </el-button>
      <el-button type="success">
        成功按钮
      </el-button>
      <el-button type="info">
        信息按钮
      </el-button>
      <el-button type="warning">
        警告按钮
      </el-button>
      <el-button type="danger">
        危险按钮
      </el-button>
    </el-row>
    <el-row>
      <el-button plain>
        朴素按钮
      </el-button>
      <el-button type="primary" plain>
        主要按钮
      </el-button>
      <el-button type="success" plain>
        成功按钮
      </el-button>
      <el-button type="info" plain>
        信息按钮
      </el-button>
      <el-button type="warning" plain>
        警告按钮
      </el-button>
      <el-button type="danger" plain>
        危险按钮
      </el-button>
    </el-row>
    <el-row>
      <el-button round>
        圆角按钮
      </el-button>
      <el-button type="primary" round>
        主要按钮
      </el-button>
      <el-button type="success" round>
        成功按钮
      </el-button>
      <el-button type="info" round>
        信息按钮
      </el-button>
      <el-button type="warning" round>
        警告按钮
      </el-button>
      <el-button type="danger" round>
        危险按钮
      </el-button>
    </el-row>
    <el-row>
      <el-button circle>
        <template #icon>
          <svg-icon name="ep:search" />
        </template>
      </el-button>
      <el-button type="primary" circle>
        <template #icon>
          <svg-icon name="ep:edit" />
        </template>
      </el-button>
      <el-button type="success" circle>
        <template #icon>
          <svg-icon name="ep:check" />
        </template>
      </el-button>
      <el-button type="info" circle>
        <template #icon>
          <svg-icon name="ep:message" />
        </template>
      </el-button>
      <el-button type="warning" circle>
        <template #icon>
          <svg-icon name="ep:star" />
        </template>
      </el-button>
      <el-button type="danger" circle>
        <template #icon>
          <svg-icon name="ep:delete" />
        </template>
      </el-button>
    </el-row>
    <el-divider content-position="left">
      禁用状态
    </el-divider>
    <el-row>
      <el-button disabled>
        默认按钮
      </el-button>
      <el-button type="primary" disabled>
        主要按钮
      </el-button>
      <el-button type="success" disabled>
        成功按钮
      </el-button>
      <el-button type="info" disabled>
        信息按钮
      </el-button>
      <el-button type="warning" disabled>
        警告按钮
      </el-button>
      <el-button type="danger" disabled>
        危险按钮
      </el-button>
    </el-row>
    <el-row>
      <el-button plain disabled>
        朴素按钮
      </el-button>
      <el-button type="primary" plain disabled>
        主要按钮
      </el-button>
      <el-button type="success" plain disabled>
        成功按钮
      </el-button>
      <el-button type="info" plain disabled>
        信息按钮
      </el-button>
      <el-button type="warning" plain disabled>
        警告按钮
      </el-button>
      <el-button type="danger" plain disabled>
        危险按钮
      </el-button>
    </el-row>
    <el-divider content-position="left">
      文字按钮
    </el-divider>
    <el-button text>
      文字按钮
    </el-button>
    <el-button type="primary" text>
      文字按钮
    </el-button>
    <el-button type="success" text>
      文字按钮
    </el-button>
    <el-button type="info" text>
      文字按钮
    </el-button>
    <el-button type="warning" text>
      文字按钮
    </el-button>
    <el-button type="danger" text>
      文字按钮
    </el-button>
    <el-divider content-position="left">
      图标按钮
    </el-divider>
    <el-button type="primary">
      <template #icon>
        <svg-icon name="ep:edit" />
      </template>
    </el-button>
    <el-button type="primary">
      <template #icon>
        <svg-icon name="ep:share" />
      </template>
    </el-button>
    <el-button type="primary">
      <template #icon>
        <svg-icon name="ep:delete" />
      </template>
    </el-button>
    <el-button type="primary">
      <template #icon>
        <svg-icon name="ep:search" />
      </template>
      搜索
    </el-button>
    <el-button type="primary">
      上传
      <svg-icon name="ep:upload" class="el-icon--right" />
    </el-button>
    <el-divider content-position="left">
      按钮组
    </el-divider>
    <el-button-group style="margin-right: 10px;">
      <el-button type="primary">
        <svg-icon name="ep:arrow-left" class="el-icon--left" />
        上一页
      </el-button>
      <el-button type="primary">
        下一页
        <svg-icon name="ep:arrow-right" class="el-icon--right" />
      </el-button>
    </el-button-group>
    <el-button-group>
      <el-button type="primary">
        <template #icon>
          <svg-icon name="ep:edit" />
        </template>
      </el-button>
      <el-button type="primary">
        <template #icon>
          <svg-icon name="ep:share" />
        </template>
      </el-button>
      <el-button type="primary">
        <template #icon>
          <svg-icon name="ep:delete" />
        </template>
      </el-button>
    </el-button-group>
    <el-divider content-position="left">
      加载中
    </el-divider>
    <el-button type="primary" :loading="true">
      加载中
    </el-button>
    <el-divider content-position="left">
      不同尺寸
    </el-divider>
    <div style="margin-bottom: 10px;">
      <el-button size="large">
        大号按钮
      </el-button>
      <el-button size="default">
        默认按钮
      </el-button>
      <el-button size="small">
        小号按钮
      </el-button>
    </div>
    <div>
      <el-button size="large" round>
        大号按钮
      </el-button>
      <el-button size="default" round>
        默认按钮
      </el-button>
      <el-button size="small" round>
        小号按钮
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
