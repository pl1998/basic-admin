import api from '../index'

export default {
    // 登录
    list: (params: string) => api.get('/user?' + params),
}
