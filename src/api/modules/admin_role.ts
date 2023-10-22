import api from '../index'

export default {
    // 获取角色列表
    list: (params: string) => api.get('/role?' + params),
    // 添加角色
    add: (data: any) => api.post('/role', data),
    // 更新角色
    update: (data: {
        id: number
        menu: any[]
        name: string
        status:number
    }) => api.put('/role/' + data.id, data),
     // 更新角色状态
     updateStatus: (data: {
        id: number
        status:number
    }) => api.put('/role/' + data.id, data),
    // 获取所有角色
    getAllRole: () => api.get('/getAllRole')
}
