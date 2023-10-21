import api from '../index'

export default {
    // 获取角色列表
    list: (params: string) => api.get('/role?' + params),
    // 添加角色
    add: (data: {
        name: string
        menu: []
    }) => api.post('/role', data),
    // 更新角色
    update: (data: {
        name: string
        menu: [],
        id: number
    }) => api.put('/role/' + data.id, data),
}
