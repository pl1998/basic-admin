import api from '../index'

export default {
    // 获取所有权限
    getPermission: () => api.get('/getAllMenus'),
    // 获取菜单列表
    list: (params: string) => api.get('/menu?' + params),
    add: (data: any) => api.post('/menu', data),
    update: (data: any) => api.put('/menu/' + data.id, data),
    delete: (id: number) => api.delete('/menu/' + id),
}
