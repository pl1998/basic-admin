<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import useKeepAliveStore from '@/store/modules/keepAlive'

defineOptions({
  name: 'TabExampleNested1',
})

const keepAliveStore = useKeepAliveStore()
</script>

<template>
  <div>
    <page-main>
      <div>层级：1</div>
      <router-view v-slot="{ Component }">
        <keep-alive :include="keepAliveStore.list">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </page-main>
  </div>
</template>
