<route lang="yaml">
meta:
  enabled: false
</route>

<script lang="ts" setup>
import { reactive, watch, nextTick } from 'vue'
import apiAdminRole from '@/api/modules/admin_role'
import apiAdminMenu from '@/api/modules/admin_menu'
import { getFilterParmas, isNumber } from '@/utils/helpers'
import { ElMessage, ElTree } from 'element-plus'
const elTreeRef = ref<InstanceType<typeof ElTree>>()
const tableData = ref([])
const menusList = ref([])
const centerDialogVisible = ref(false)
const tableLoading = ref(false)

const leafKeys = ref(<any>[])
const allKeys = ref(<any>[])

const formInline = reactive({
  loading: false,
  page: 1,
  page_size: 10,
  total: 1,
})
const form = ref({
  id: 0,
  name: '',
  menu: [],
  status: 0,
})
const defaultProps = ref({
  label: 'name',
  children: 'children',
})
const defaultExpandedKeys = ref<any>([])
const currentNodekey = ref([])

interface rolesInterface {
  id: number
  name: string
  menu: any[]
}
const roles = ref<rolesInterface>({
  id: 0,
  name: '',
  menu: [] as any[],
})
const isShowTree = ref(true)
const title = ref('权限编辑')
function onSubmit() {
  isShowTree.value = false
  defaultExpandedKeys.value = []

  centerDialogVisible.value = true
  title.value = '添加角色'
  isShowTree.value = true
}

watch(
  () => centerDialogVisible,
  (newValue, oldValue) => {
    if (newValue.value == false) {
      defaultExpandedKeys.value = []
      resetRole()
      title.value = '权限编辑'
    } else {
    }
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
    tableData.value = res.data.list
    formInline.total = res.data.total
    tableLoading.value = false
  })
}

// 编辑
function handleEdit(index: number, row: any) {
  leafKeys.value = []
  defaultExpandedKeys.value = []
  if (row.menus.length != 0) {
    row.menus.map((next: any) => {
      leafKeys.value.push(next.id)
      defaultExpandedKeys.value.push(next.id)
    })
  }
  console.log('权限', defaultExpandedKeys.value, leafKeys.value)
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(leafKeys.value, true)
    centerDialogVisible.value = true
    form.value.id = row.id
    form.value.name = row.name
  })
}

// 提交权限节点
function handleSubmit() {
  if (form.value.id != 0) {
    apiAdminRole
      .update({
        id: roles.value.id,
        menu: defaultExpandedKeys.value,
        name: roles.value.name,
        status: 0,
      })
      .then((res) => {
        ElMessage({
          message: '更新成功',
          type: 'success',
        })
        centerDialogVisible.value = !centerDialogVisible.value
        defaultExpandedKeys.value = []
        resetRole()
      })
      .catch(() => {
        centerDialogVisible.value = !centerDialogVisible.value
        defaultExpandedKeys.value = []
        resetRole()
      })
  } else {
    if (form.value.name.length == 0 || form.value.name.length > 20) {
      ElMessage({
        message: '角色名称在1~20长度之间',
        type: 'warning',
      })
    } else {
      apiAdminRole
        .add({
          menu: defaultExpandedKeys.value,
          name: form.value.name,
        })
        .then((res) => {
          ElMessage({
            message: '添加角色成功',
            type: 'success',
          })
          centerDialogVisible.value = !centerDialogVisible.value
          defaultExpandedKeys.value = []
          resetRole()
          getList()
        })
        .catch(() => {
          centerDialogVisible.value = !centerDialogVisible.value
          defaultExpandedKeys.value = []
          roles.value = {
            id: 0,
            name: '',
            menu: [] as any[],
          }
        })
    }
  }
}

function resetRole() {
  roles.value = {
    id: 0,
    name: '',
    menu: [] as any[],
  }
}

// 翻页
function pageChange(page: any) {
  if (isNumber(page)) {
    formInline.page = page
    getList()
  }
}

function getPermission() {
  apiAdminMenu.getPermission().then((res) => {
    menusList.value = res.data.list
    allKeys.value = res.data.ids
    console.log(allKeys.value, menusList.value)
  })
}

function nodeChange(data: any, isSelect: any, isTree: any) {
  const nodes = defaultExpandedKeys.value
  if (isSelect) {
    defaultExpandedKeys.value.push(data.id)
  } else {
    defaultExpandedKeys.value = defaultExpandedKeys.value.filter(
      (id: number) => {
        return id != data.id
      }
    )
  }
}

function handleDelete(id: number, status: number) {
  apiAdminRole
    .updateStatus({ id: id, status: status === 1 ? 0 : 1 })
    .then((res) => {
      getList()
    })
}
// // 授权窗口关闭事件
// const closeRole = () => {
//   defaultExpandedKeys.value = []
//   leafKeys.value = []
//   elTreeRef.value?.setCheckedKeys([], true)
// }
</script>

<template>
  <div>
    <page-main>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加角色</el-button>
        </el-form-item>
      </el-form>
    </page-main>
    <page-main>
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%"
        height="80%"
      >
        <el-table-column fixed prop="name" label="角色" width="150" />
        <el-table-column prop="created_at" label="添加时间" width="200" />
        <el-table-column prop="status" label="状态" width="600">
          <template #default="scope">
            <el-tag
              :type="scope.row.status == 0 ? `success` : `danger`"
              class="ml-2"
              effect="light"
            >
              {{ scope.row.status == 0 ? `正常` : `禁用` }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="240">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
              type="success"
              >编辑权限</el-button
            >
            <el-popconfirm
              :title="`是否` + (scope.row.status == 1 ? `启用` : `禁用`) + `?`"
              @confirm="handleDelete(scope.row.id, scope.row.status)"
            >
              <template #reference>
                <el-button
                  size="small"
                  :type="scope.row.status == 1 ? `success` : `danger`"
                  >{{ scope.row.status == 1 ? `启用` : `禁用` }}</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="el-row">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="formInline.total"
          @current-change="pageChange"
        />
      </div>
    </page-main>

    <el-dialog
      v-model="centerDialogVisible"
      :title="title"
      width="40%"
      align-center
    >
      <el-form :model="form" label-width="220px" ref="formRef">
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="form.name"
            :rules="[
              { required: true, message: '名称不能为空' },
              { min: 1, max: 20, message: '长度在1~20之间', trigger: 'blur' },
            ]"
          />
        </el-form-item>
        <el-form-item label="权限" prop="menu">
          <el-tree
            ref="elTreeRef"
            :data="menusList"
            show-checkbox
            node-key="id"
            @check-change="nodeChange"
            :default-checked-keys="defaultExpandedKeys"
            :default-expand-all="true"
            :check-strictly="true"
            :props="defaultProps"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false"> 取消 </el-button>
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
