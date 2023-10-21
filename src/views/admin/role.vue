<route lang="yaml">
  meta:
    enabled: false
  </route>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import apiAdminRole from '@/api/modules/admin_role'
import apiAdminMenu from '@/api/modules/admin_menu'
import { getFilterParmas } from '@/utils/helpers'
import { ElMessage } from 'element-plus'
const tableData = ref([])
const menusList = ref([])
const centerDialogVisible = ref(false)
const tableLoading = ref(false)
const formInline = reactive({
  loading: false,
  page: 1,
  page_size: 10,
  total: 1,
})
const defaultProps = ref({
  label: "name",
  children: "children"
})
const defaultExpandedKeys = ref([])
const currentNodekey = ref([])
const roles = ref({})

const onSubmit = () => {

}
watch(
  () => centerDialogVisible,
  (newValue, oldValue) => {
    if (newValue.value == false) {
      defaultExpandedKeys.value = []
      roles.value = {}
    }
    console.log(newValue.value)
  },
  { deep: true }
)


onMounted(() => {
  getList()
  getPermission()
})

function getList() {
  tableLoading.value = true
  let urlParams = getFilterParmas(formInline)
  apiAdminRole.list(urlParams).then((res) => {
    console.log(res)
    tableData.value = res.data.list
    formInline.total = res.data.total
    tableLoading.value = false
  })
}

// 编辑
function handleEdit(index, row) {
  centerDialogVisible.value = !centerDialogVisible.value
  if (row.menus.length != 0) {
    const menusId = row.menus.map((next) => {
      defaultExpandedKeys.value.push(next.id)
    })
  }
  roles.value = row
}

// 提交权限节点
function handleSubmit() {
  console.log(defaultExpandedKeys)
  apiAdminRole.update({
    id: roles.value.id,
    menu: defaultExpandedKeys.value,
    name: roles.value.name
  }).then((res) => {
    ElMessage({
      message: '更新成功',
      type: 'success',
    })
    centerDialogVisible.value = !centerDialogVisible.value
    defaultExpandedKeys.value = []
    roles.value = {}
  }).catch(() => {
    centerDialogVisible.value = !centerDialogVisible.value
    defaultExpandedKeys.value = []
    roles.value = {}
  })
}

function getPermission() {
  apiAdminMenu.getPermission().then((res) => {
    menusList.value = res.data
  })
}

function nodeChange(data, isSelect, isTree) {
  const nodes = defaultExpandedKeys.value
  if (isSelect) {
    defaultExpandedKeys.value.push(data.id)
  } else {
    defaultExpandedKeys.value = defaultExpandedKeys.value.filter((id) => {
      return id != data.id
    })
  }
  console.log(defaultExpandedKeys.value)
}


</script>
        
<template>
  <div>
    <page-main>
      角色管理
    </page-main>
    <page-main>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-button :icon="Plus" type="primary" @click="onSubmit">添加角色</el-button>
        </el-form-item>
      </el-form>
    </page-main>
    <page-main>
      <el-table v-loading="tableLoading" :data="tableData" style="width: 100%" height="80%">
        <el-table-column fixed prop="name" label="角色" width="150" />
        <el-table-column prop="created_at" label="添加时间" width="200" />
        <el-table-column prop="status" label="状态" width="600">
          <template #default="scope">
            <el-tag :type="scope.row.status == 0 ? `success` : `danger`" class="ml-2" effect="light">
              {{ scope.row.status == 0 ? `正常` : `禁用` }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="240">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)" type="success">编辑权限</el-button>
            <el-button size="small" :type="scope.row.status == 1 ? `success` : `danger`"
              @click="handleDelete(scope.$index, scope.row)">{{ scope.row.status == 1 ? `启用` : `禁用` }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="el-row">
        <el-pagination background layout="prev, pager, next" :total="formInline.total" />
      </div>
    </page-main>

    <el-dialog v-model="centerDialogVisible" title="权限编辑" width="30%" align-center>

      <el-tree :data="menusList" show-checkbox node-key="id" @check-change="nodeChange" :current-node-key="currentNodekey"
        :default-checked-keys="defaultExpandedKeys" default-expand-all="true" check-strictly="true"
        :props="defaultProps" />

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.el-row {
  margin-top: 20px;
}
</style>
