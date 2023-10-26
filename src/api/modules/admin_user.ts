import api from '../index'

export default {
    // 登录
    list: (params: string) => api.get('/user?' + params),
    add: (params: any) => api.post('/user', params),
    update: (params: any) => api.put('/user/'+params.id, params),
    updateStatus: (data: {
        id: number
        status:number
    }) => api.put('/user/' + data.id, data),
}
