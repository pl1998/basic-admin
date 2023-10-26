<route lang="yaml">
    meta:
      enabled: false
    </route>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import apiAdminUser from '@/api/modules/admin_user'
import apiAdminRole from '@/api/modules/admin_role'
import { getFilterParmas, isNumber } from '@/utils/helpers'
import { FormInstance, FormRules, ElMessage } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const tableData = ref([])
const tableLoading = ref(false)
const dialogVisible = ref(false)
const formInline = reactive({
    email: '',
    name: '',
    loading: false,
    page: 1,
    page_size: 10,
    total: 1,
})

interface roleListInstance {
    id: number
    name: string
}
const roleList = ref<roleListInstance[]>([{
    id: 0,
    name: ""
}])

interface submitFormInstance {
    id: number
    name: string
    email: string
    password: string
    password_confirmation: string
    role: any[],
}

const form = ref<submitFormInstance>({
    id: 0,
    email: '',
    name: '',
    password: '',
    password_confirmation: '',
    role: [] as any[],

})

const title = ref('添加用户')

watch(
    () => dialogVisible,
    (newValue, oldValue) => {
        if (newValue.value == false) {
            form.value = {
                email: '',
                name: '',
                password: '',
                password_confirmation: '',
                role: <any>[{}],
                id: 0
            }
        }
    },
    { deep: true }
)


const onSubmit = () => {
    getList()
}

onMounted(() => {
    getList()
    getAllRole()
})

function getAllRole() {
    apiAdminRole.getAllRole().then((res) => {
        roleList.value = res.data
    })
}


const checkPassword = (rule: any, value: any, callback: any) => {
    if (form.value.id == 0) {
        if (form.value.password.length < 6 && form.value.password.length > 20) {
            return callback(new Error('密码应该在6~12位之间'))
        }
        if (form.value.password_confirmation.length < 6 && form.value.password_confirmation.length > 20) {
            return callback(new Error('重复密码应该在6~12位之间'))
        }
        if (form.value.password != form.value.password_confirmation) {
            return callback(new Error('两次输入密码不一致'))
        }
    } else {
        if (form.value.password == '' || form.value.password == null) {
            callback()
        }
        if (form.value.password.length < 6 && form.value.password.length > 20) {
            return callback(new Error('密码应该在6~12位之间'))
        }
        if (form.value.password != form.value.password_confirmation) {
            return callback(new Error('两次输入密码不一致'))
        }
    }
    callback()
}
const rules = reactive<FormRules<typeof form>>({
    name: [
        {
            required: true,
            message: '请输入你的账号昵称',
            trigger: 'blur',
        },
        { min: 1, max: 20, message: '长度在1~20', trigger: 'blur' },
    ],
    password: [
        { validator: checkPassword, message: '密码长度在长度在6~20', trigger: 'blur' },
    ],
    password_confirmation: [
        { validator: checkPassword, message: '密码长度在长度在6~20', trigger: 'blur' },
    ],
    email: [
        {
            required: true,
            message: '请输入你的邮箱地址',
            trigger: 'blur',
        },
        {
            type: 'email',
            message: '请输入邮箱',
            trigger: ['blur', 'change'],
        },
    ]
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



const submitForm = (formEl: FormInstance | undefined) => {
    if (form.value.id != 0) {

        apiAdminUser.update(form.value).then((res) => {
            dialogVisible.value = false
          ElMessage({
            message: res.status == 200 ? '编辑成功' : '编辑失败',
            type: res.status == 200 ? 'success' :'warning'
          })
          if(res.status==200) {
            getList()
          }
        })
    } else {
        if (!formEl) return
        formEl.validate((valid) => {
            if (valid) {
                apiAdminUser.add(form.value).then((res) => {
                    dialogVisible.value = false
                  ElMessage({
                    message: res.status == 200 ? '添加成功' : '添加失败',
                    type: res.status == 200 ? 'success' :'warning'
                  })
                  if(res.status==200) {
                    getList()
                  }
                })
            } else {
                console.log('error submit!')
                return false
            }
        })
    }
}


// 翻页
function pageChange(page: any) {
    if (isNumber(page)) {
        formInline.page = page
        getList()
    }
}

function handleEdit(row: any) {
    row.roles.map((res: { id: number }) => {
        form.value.role.push(res.id)
    })
    form.value.id = row.id
    form.value.email = row.email
    form.value.name = row.name
    title.value = '编辑用户信息'
    dialogVisible.value = true
}

function handleDelete(id: number, status: number) {
    apiAdminUser
        .updateStatus({ id: id, status: status === 1 ? 0 : 1 })
        .then((res) => {
            if(res.status == 200) {
              ElMessage({
                message: status == 1 ?`解禁成功` : `禁用成功`,
                type:'success'
              })
                getList()
            }
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
                    <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
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
                        <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                      <el-popconfirm :title="`是否` + (scope.row.status == 1 ? `启用` : `禁用`) + `?`"
                                     @confirm="handleDelete(scope.row.id, scope.row.status)">
                        <template #reference>
                          <el-button size="small" :type="scope.row.status == 1 ? `success` : `danger`">{{ scope.row.status == 1 ?
                            `启用` : `禁用` }}</el-button>
                        </template>
                      </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <div class="el-row">
                <el-pagination background layout="prev, pager, next" :total="formInline.total"
                    @current-change="pageChange" />
            </div>
        </page-main>
        <el-dialog v-model="dialogVisible" :title="title" width="40%" style="max-width: 760px">
            <el-form label-width="100px" :model="form" style="max-width: 460px" ref="ruleFormRef" :rules="rules">
                <el-form-item label="账号昵称" prop="name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" type="password" />
                </el-form-item>
                <el-form-item label="二次确认密码" prop="password_confirmation">
                    <el-input v-model="form.password_confirmation" type="password" />
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-select v-model="form.role" multiple placeholder="Select" style="width: 240px">
                        <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
                    <el-button @click="dialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<style lang="scss" scoped>
.el-row {
    margin-top: 20px;
}
</style>
