<route lang="yaml">
  meta:
    enabled: false
  </route>

<script lang="ts" setup>
import { reactive } from 'vue'
import apiAdminLog from '@/api/modules/admin_log'
import { getFilterParmas, isNumber } from '@/utils/helpers'
const tableData = ref([])
const tableLoading = ref(false)
const formInline = reactive({
  ip: '',
  name: '',
  user_id: '',
  loading: false,
  page: 1,
  page_size: 10,
  total: 1,
})

const onSubmit = () => {
  getList()
}


onMounted(() => {
  getList()
})

function getList() {
  tableLoading.value = true
  let urlParams = getFilterParmas(formInline)
  apiAdminLog.list(urlParams).then((res) => {
    console.log(res)
    tableData.value = res.data.list
    formInline.total = res.data.total
    tableLoading.value = false
  })
}
// 翻页
function pageChange(page: any) {
  if (isNumber(page)) {
    formInline.page = page
    getList()
  }
}


</script>
        
<template>
  <div>
    <page-main>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="Ip">
          <el-input v-model="formInline.ip" placeholder="ip" clearable />
        </el-form-item>
        <el-form-item label="用户id">
          <el-input v-model="formInline.user_id" placeholder="user_id" clearable />
        </el-form-item>
        <el-form-item>
          <el-button v-loading="formInline.loading" type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </page-main>
    <page-main>
      <el-table v-loading="tableLoading" :data="tableData" style="width: 100%" height="80%">
        <el-table-column fixed="left" prop="user_name" label="用户名" width="150" />
        <el-table-column prop="user_id" label="用户id" width="150" />
        <el-table-column prop="path" label="请求地址" width="250" />
        <el-table-column prop="param" label="请求参数" width="450">
          <template #default="scope">
            <el-alert :title="scope.row.param" type="success" :closable="false" />
          </template>
        </el-table-column>
        <el-table-column prop="method" label="请求方式" width="150" />
        <el-table-column prop="ip" label="ip" width="150" />
        <el-table-column prop="device_info" label="设备信息" width="450">
          <template #default="scope">
            <el-alert :title="scope.row.device_info" type="success" :closable="false" />
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="请求时间" width="200" />
      </el-table>
      <div class="el-row">
        <el-pagination background layout="prev, pager, next" :total="formInline.total" @current-change="pageChange" />
      </div>
    </page-main>
  </div>
</template>
<style lang="scss" scoped>
.el-row {
  margin-top: 20px;
}

.shell-code {
  background-color: black;
  overflow-x: auto;
  padding: 5px;
  color: #fff;
}
</style>
