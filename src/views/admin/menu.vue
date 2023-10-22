<route lang="yaml">
    meta:
      enabled: false
    </route>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import apiAdminMenu from '@/api/modules/admin_menu'
import { getFilterParmas, methodArr, methodColorArr, isNumber } from '@/utils/helpers'
import { FormInstance, FormRules, ElMessage } from 'element-plus'

import {
    Search,
    Plus
} from '@element-plus/icons-vue'

interface Menus {
    id: number
    parent_id: number
    name: string
    icon: string
    route_name: string
    route_path: string
    component: string
    sort: number
    hidden: number
    type: number
    method: number
    created_at: string
    hasChildren?: boolean
    children?: Menus[]
}
const load = (
    row: Menus,
    treeNode: unknown,
    resolve: (date: Menus[]) => void
) => {
    setTimeout(() => {
        resolve([
        ])
    }, 1000)
}
const isCreateSuccess = ref(false)
const defaultProps = ref({
    label: "name",
    children: "children"
})
const dialogVisible = ref(false)
const tableData = ref([])
const menuList = ref([])
const tableLoading = ref(false)
const formInline = reactive({
    name: '',
    type: '',
    loading: false,
    page: 1,
    page_size: 100,
    total: 1,
    method: ""
})

interface RuleForm {
    name: string
    sort: number
    parent_id: number,
    route_path: string,
    type: number,
    hidden: number,
    component: string,
    route_name: string,
    icon: string
    method: number
    id: number
}

const form = ref<RuleForm>({
    parent_id: 0,
    name: "",
    icon: "",
    route_name: "",
    route_path: "",
    component: "Layout",
    sort: 0,
    hidden: 0,
    type: 0,
    method: 1,
    id: 0
})


const deleteVisible = ref(false)


const checkRouteType = (rule: any, value: any, callback: any) => {
    if (form.value.parent_id == 0) {
        callback()
    }
    if (form.value.type == 0 && (value == '' || value == null || value == undefined)) {
        return callback(new Error('web路由' + rule + '不能为空'))
    }
    callback()
}

const rules = reactive<FormRules<RuleForm>>({
    name: [
        { required: true, message: '请输入名称', trigger: 'blur' },
        { min: 1, max: 25, message: '名称长度在1~25', trigger: 'blur' },
    ],
    parent_id: [
        { required: true, message: '请选择父类', trigger: 'blur' },
        { type: "integer", message: 'parent_id 应该是integer类型', trigger: 'blur' },
    ],
    sort: [
        { required: true, message: '请输入排序值', trigger: 'blur' },

    ],
    hidden: [
        { required: true, message: '请选择是否隐藏', trigger: 'change' },
        // { type: "number", message: 'hidden应该是integer类型', trigger: 'blur' },
    ],
    type: [
        { required: true, message: '请选择路由类型', trigger: 'change' },
        // { type: "number", message: 'type应该是number类型', trigger: 'blur' },
    ],
    method: [
        { required: true, message: '请选择请求方式', trigger: 'change' },
        // { type: "integer", message: 'method应该是number类型', trigger: 'blur' },
    ],
    route_name: [
        { type: "string", message: '应该是字符串类型', trigger: 'blur' },
    ],
    route_path: [
        { required: true, message: '请输入请求地址', trigger: 'blur' },
    ],
    component: [
        { type: "string", message: '应该是字符串类型', trigger: 'blur' },
        { validator: checkRouteType, message: 'web路由应该填写组件名称', trigger: 'blur' },
    ],
    icon: [
        { type: "string", message: '应该是字符串类型', trigger: 'blur' },

    ],
})


const onSubmit = () => {
    getList()
}
onMounted(() => {
    getList()
    getMenuList()
})
function getMenuList() {
    apiAdminMenu.getPermission().then((res) => {
        var keys = res.data.list.length
        res.data.list[keys] = {
            id: 0,
            name: '顶级'
        }
        menuList.value =res.data.list
    })
    console.log(menuList)
}
function getList() {
    tableLoading.value = true
    let urlParams = getFilterParmas(formInline)
    apiAdminMenu.list(urlParams).then((res) => {
        tableData.value = res.data.list
        formInline.total = res.data.total
        tableLoading.value = false
    })
}
watch(
    () => dialogVisible,
    (newValue, oldValue) => {
        if (newValue.value == false) {
            form.value = <RuleForm>({
                parent_id: 0,
                name: "",
                icon: "",
                route_name: "",
                route_path: "",
                component: "",
                sort: 0,
                hidden: 0,
                type: 0,
                method: 1,
                id: 0,
            })
        }

    },
    { deep: true }
)



const ruleFormRef = ref<FormInstance>()

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
            if (form.value.id != 0) {
                apiAdminMenu.update(form.value).then((res) => {
                    dialogVisible.value = false
                    getList()
                    isCreateSuccess.value = true
                    setTimeout(() => {
                        isCreateSuccess.value = false
                    }, 5000)
                })
            } else {
                apiAdminMenu.add(form.value).then((res) => {
                    dialogVisible.value = false
                    getList()
                    isCreateSuccess.value = true
                    setTimeout(() => {
                        isCreateSuccess.value = false
                    }, 5000)
                })
            }


        } else {
            console.log('error submit!', fields)
            ElMessage({
                message: "验证不通过",
                type: "warning"
            })
        }
    })
}
// 打开编辑
function handleEdit(index: any, row: any) {
    form.value = <RuleForm>({
        parent_id: row.parent_id,
        name: row.name,
        icon: row.icon,
        route_name: row.route_name,
        route_path: row.route_path,
        component: row.component,
        sort: row.sort,
        hidden: row.hidden,
        type: row.type,
        method: row.method,
        id: row.id,
    })
    dialogVisible.value = true
}

function deleteMenu(id: number) {
    apiAdminMenu.delete(id).then(() => {
        ElMessage({
            message: '删除成功！',
            'type': 'success'
        })
        getList()
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
        <el-alert title="添加更新成功" type="success" v-if="isCreateSuccess" />
        <page-main>

            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="名称">
                    <el-input v-model="formInline.name" placeholder="名称" clearable />
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="formInline.type" placeholder="路由类型">
                        <el-option label="Web(前端)" value="0" />
                        <el-option label="Api(后端)" value="1" />
                    </el-select>
                </el-form-item>
                <el-form-item label="请求方式">
                    <el-select v-model="formInline.method" placeholder="路由类型">
                        <el-option v-for="(value, key) in methodArr" :key="key" :label="value" :value="key" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button v-loading="formInline.loading" type="primary" :icon="Search" @click="onSubmit">搜索</el-button>
                    <el-button v-loading="formInline.loading" type="primary" :icon="Plus"
                        @click="dialogVisible = true">添加</el-button>
                </el-form-item>
            </el-form>
        </page-main>
        <page-main>
            <el-table v-loading="tableLoading" :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id"
                border default-expand-all lazy :load="load"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                <el-table-column prop="name" label="名称" width="150" />
                <el-table-column prop="icon" label="图标" width="150">
                    <template #default="scope">
                        <svg-icon :name="scope.row.icon" />
                    </template>
                </el-table-column>
                <el-table-column prop="route_name" label="路由名称" width="150" />
                <el-table-column prop="route_path" label="路径" width="250" />
                <el-table-column prop="component" label="组件" width="250" />
                <el-table-column prop="sort" label="排序" sortable width="60" />
                <el-table-column prop="hidden" label="是否隐藏" width="100">
                    <template #default="scope">
                        <el-tag :type="scope.row.hidden == 0 ? `success` : `danger`" class="ml-2" effect="dark">
                            {{ scope.row.hidden == 0 ? `正常` : `隐藏` }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="菜单类型" width="100">
                    <template #default="scope">
                        <el-tag :type="scope.row.type == 1 ? `warning` : `success`" class="ml-2" effect="dark">
                            {{ scope.row.type == 1 ? `Api` : `Web` }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="method" label="请求类型" width="100">
                    <template #default="scope">
                        <el-tag :type="methodColorArr[scope.row.method]" class="ml-2" effect="dark">
                            {{ methodArr[scope.row.method] ?? `` }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="添加时间" sortable width="180" />
                <el-table-column label="操作" fixed="right" width="200">
                    <template #default="scope">
                        <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-popconfirm title="是否确定删除？" @confirm="deleteMenu(scope.row.id)">
                            <template #reference>
                                <el-button size="small" type="danger">删除</el-button>
                            </template>
                        </el-popconfirm>

                    </template>
                </el-table-column>
            </el-table>
            <div class="el-row">
                <el-pagination background layout="prev, pager, next" :total="formInline.total" @current-change="pageChange"
                    :default-page-size="formInline.page_size" :page-sizes="[100, 200, 300]" />
            </div>
        </page-main>

        <!-- 添加菜单 -->
        <el-dialog v-model="dialogVisible" title="添加菜单&接口" width="50%">
            <el-alert title="添加顶级web路由时，必须要添加子路由！二级路由请求路径必须带 '/' 子级不用" type="success" :closable="false" />
            <br />
            <el-form :model="form" label-width="120px" ref="ruleFormRef" :rules="rules">
                <el-form-item label="父级ID" prop="parent_id">
                    <el-tree-select :props="defaultProps" node-key="id" :current-node-key="form.parent_id"
                        v-model="form.parent_id" :data="menuList" check-strictly :render-after-expand="false" />
                </el-form-item>
                <el-form-item label="菜单类型" prop="type">
                    <el-radio-group v-model="form.type" :rules="{
                        required: true,
                        message: '菜单类型不能为空',
                        trigger: 'blur',
                    }">
                        <el-radio border v-for="(value, key) in [0, 1]" :key="key" :label="value">
                            {{ value == 1 ? `后端路由` : `前端路由` }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item v-if="form.type == 0" label="icon" prop="icon">
                    <el-input v-model="form.icon" />
                </el-form-item>
                <el-form-item label="路由名称" prop="route_name">
                    <el-input v-model="form.route_name" />
                </el-form-item>
                <el-form-item label="请求路径" prop="route_path">
                    <el-input v-model="form.route_path" />
                </el-form-item>
                <el-form-item v-if="form.type == 0" label="组件名称" prop="component">
                    <el-input v-model="form.component" />
                </el-form-item>
                <el-form-item label="排序值(倒序)" prop="sort">
                    <el-input v-model="form.sort" />
                </el-form-item>
                <el-form-item label="是否隐藏" prop="hidden">
                    <el-switch v-model="form.hidden" />
                </el-form-item>
                <el-form-item label="请求方式" prop="method">
                    <el-radio-group v-model="form.method" placeholder="路由类型">
                        <el-radio v-for="(value, key) in methodArr" :key="key" border :label="key">{{ value }}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">
                        提交
                    </el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>
<style lang="scss" scoped>
.el-row {
    margin-top: 20px;
}

.el-radio-group {
    margin-top: 2px;
}
</style>
