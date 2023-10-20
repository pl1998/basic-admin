import api from '../index'

export default {
  // 登录
  login: (data: {
    account: string
    password: string
  }) => api.post('/login', data),

  // 获取用户信息
  me: () => api.post('/me'),

  // 退出登录
  logout: () => api.post('/logout'),

  // 获取权限
  permission: () => api.get('user/permission', {
    baseURL: '/mock/',
  }),

  // 修改密码
  passwordEdit: (data: {
    password: string
    newpassword: string
  }) => api.post('user/password/edit', data, {
    baseURL: '/mock/',
  }),
}
