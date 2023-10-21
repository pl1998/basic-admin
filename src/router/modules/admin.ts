import type { RouteRecordRaw } from 'vue-router'

function Layout() {
    return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
    path: '/admin',
    component: Layout,
    redirect: '/admin/user',
    name: 'Admin',
    meta: {
        title: '权限管理',
        icon: 'ep:expand',
    },
    children: [
        {
            path: 'user',
            name: 'adminUser',
            component: () => import('@/views/admin/user.vue'),
            meta: {
                title: '用户',
                icon:'ep:avatar'
            },
        },
        {
            path: 'role',
            name: 'adminRole',
            component: () => import('@/views/admin/role.vue'),
            meta: {
                title: '角色',
                icon:'ep:user-filled'
             
            },
        },
        {
            path: 'menu',
            name: 'adminMenu',
            component: () => import('@/views/admin/menu.vue'),
            meta: {
                title: '菜单',
                icon:'ep:menu'
              
            },
        },
        {
            path: 'log',
            name: 'adminLog',
            component: () => import('@/views/admin/log.vue'),
            meta: {
                title: '日志',
                icon:'ep:hide'
              
            },
        },
        {
            path: 'system',
            name: 'adminSystem',
            component: () => import('@/views/admin/system.vue'),
            meta: {
                title: '系统',
                icon:'ep:setting'
            },
        },
    ],
}

export default routes
