import api from '../index'

export default {
    list: (params: string) => api.get('/log?' + params),
}
