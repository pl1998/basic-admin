<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
defineOptions({
  name: 'TabExampleNestedTest',
})

const val = ref('')
</script>

<template>
  <div>
    <page-main>
      <div>层级 1-1-1</div>
      <el-input v-model="val" />
    </page-main>
  </div>
</template>
