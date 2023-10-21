<route lang="yaml">
    meta:
      enabled: false
    </route>

<script lang="ts" setup>
import { reactive } from 'vue'
import apiAdminMenu from '@/api/modules/admin_menu'
import { getFilterParmas, methodArr, methodColorArr } from '@/utils/helpers'
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

const defaultProps = ref({
  label: "name",
  children: "children"
})
const dialogVisible = ref(true)
const tableData = ref([])
const menuList = ref([])
const tableLoading = ref(false)
const formInline = reactive({
    name: '',
    type: '',
    loading: false,
    page: 1,
    page_size: 10,
    total: 1,
    method: ""
})
const form = reactive({
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
})
const onSubmit = () => {
    getList()
}
onMounted(() => {
    getList()
    getMenuList()
})
function getMenuList(){
    apiAdminMenu.getPermission().then((res) => {
        menuList.value = res.data
    })
}
function getList() {
    tableLoading.value = true
    let urlParams = getFilterParmas(formInline)
    apiAdminMenu.list(urlParams).then((res) => {
        console.log(res)
        tableData.value = res.data.list
        formInline.total = res.data.total
        tableLoading.value = false
    })
}
function openCreateView() {

}
</script>
          
<template>
    <div>
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
                        @click="openCreateView">添加</el-button>
                </el-form-item>
            </el-form>
        </page-main>
        <page-main>
            <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all lazy
                :load="load" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                <el-table-column prop="name" label="名称" fixed="left" width="150" />
                <el-table-column prop="icon" label="图标" width="150">
                    <template #default="scope">
                        <svg-icon :name="scope.row.icon" />
                    </template>
                </el-table-column>
                <el-table-column prop="route_name" label="路由名称" width="150" />
                <el-table-column prop="route_path" label="路径" width="150" />
                <el-table-column prop="component" label="组件" width="150" />
                <el-table-column prop="sort" label="排序" sortable width="60" />
                <el-table-column prop="hidden" label="是否隐藏" width="100">
                    <template #default="scope">
                        <el-tag :type="scope.row.hidden == 0 ? `success` : `waring`" class="ml-2" effect="light">
                            {{ scope.row.hidden == 0 ? `正常` : `隐藏` }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="菜单类型" width="100">
                    <template #default="scope">
                        <el-tag :type="scope.row.type == 1 ? `info` : `success`" class="ml-2" effect="dark">
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
            </el-table>
            <div class="el-row">
                <el-pagination background layout="prev, pager, next" :total="formInline.total" />
            </div>
        </page-main>

        <!-- 添加菜单 -->
        <el-dialog v-model="dialogVisible" title="添加菜单&接口" width="50%" :before-close="handleClose">
            <el-form :model="form" label-width="120px">
                <el-form-item label="父级ID">
                    <el-tree-select :props="defaultProps" node-key="id" :current-node-key="form.parent_id" v-model="form.parent_id" :data="menuList" check-strictly :render-after-expand="false" />
                </el-form-item>
                <el-form-item label="菜单类型">
                    <el-radio-group v-model="form.type" :rules="{
                        required: true,
                        message: '菜单类型不能为空',
                        trigger: 'blur',
                    }">
                        <el-radio border label="0">Web路由</el-radio>
                        <el-radio border label="1">后端路由</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="名称">
                    <el-input v-model="form.name" />
                </el-form-item>

                <el-form-item label="路由名称">
                    <el-input v-model="form.route_name" />
                </el-form-item>
                <el-form-item label="请求路径" :rules="{
                    required: true,
                    message: '请求路径不能为空',
                    trigger: 'blur',
                }">
                    <el-input v-model="form.route_path" />
                </el-form-item>
                <el-form-item label="组件名称">
                    <el-input v-model="form.component" />
                </el-form-item>
                <el-form-item label="是否隐藏">
                    <el-switch v-model="form.hidden" />
                </el-form-item>
                <el-form-item label="请求方式" :rules="{
                    required: true,
                    message: '请求方式不能为空',
                    trigger: 'blur',
                }">
                    <el-radio-group v-model="form.method" placeholder="路由类型">
                        <el-radio v-for="(value, key) in methodArr" :key="key" border :label="key">{{ value }}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogVisible = false">
                        Confirm
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
