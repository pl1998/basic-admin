<route lang="yaml">
    meta:
      enabled: false
    </route>

<script lang="ts" setup>
import { reactive } from 'vue'
import apiAdminUser from '@/api/modules/admin_user'
import { getFilterParmas } from '@/utils/helpers'
const tableData = ref([])
const tableLoading = ref(false)
const formInline = reactive({
    email: '',
    name: '',
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
    apiAdminUser.list(urlParams).then((res) => {
        console.log(res)
        tableData.value = res.data.list
        formInline.total = res.data.total
        tableLoading.value = false
    })
}


</script>
          
<template>
    <div>
        <page-main>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="Email">
                    <el-input v-model="formInline.email" placeholder="Email" clearable />
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="formInline.name" placeholder="昵称" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button v-loading="formInline.loading" type="primary" @click="onSubmit">搜索</el-button>
                </el-form-item>
            </el-form>
        </page-main>
        <page-main>
            <el-table v-loading="tableLoading" :data="tableData" style="width: 100%" height="80%">
                <el-table-column fixed prop="name" label="用户名" width="150" />
                <el-table-column prop="email" label="邮箱" width="200" />
                <el-table-column prop="created_at" label="添加时间" width="200" />
                <el-table-column prop="role" label="角色" width="520">
                    <template #default="scope">
                        <el-tag v-for="role in scope.row.roles " type="success" effect="light" :key="role.id" class="ml-2">
                            {{ role.name }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" width="600">
                    <template #default="scope">
                        <el-tag :type="scope.row.status == 0 ? `success` : `danger`" class="ml-2" effect="dark">
                            {{ scope.row.status == 0 ? `正常` : `禁用` }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="140">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" :type="scope.row.status == 1 ? `success` : `danger`"
                            @click="handleDelete(scope.$index, scope.row)">{{scope.row.status == 1 ? `启用` : `禁用`}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="el-row">
                <el-pagination background layout="prev, pager, next" :total="formInline.total" />
            </div>
        </page-main>
    </div>
</template>
<style lang="scss" scoped>
.el-row {
    margin-top: 20px;
}
</style>
