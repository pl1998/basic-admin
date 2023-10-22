import useRouteStore from './route'
import useMenuStore from './menu'
import router from '@/router'
import apiUser from '@/api/modules/user'

const useUserStore = defineStore(
  // 唯一ID
  'user',
  () => {
    const routeStore = useRouteStore()
    const menuStore = useMenuStore()

    const account = ref(localStorage.account ?? '')
    const token = ref(localStorage.token ?? '')
    const userInfo = ref(localStorage.userInfo ?? {})
    const failure_time = ref(localStorage.failure_time ?? '')
    const permissions = ref<string[]>([])
    const isLogin = computed(() => {
      let retn = false
      if (token.value) {
        if (new Date().getTime() < Number.parseInt(failure_time.value) * 1000) {
          retn = true
        }
      }
      return retn
    })
    const permission = ref(localStorage.permission ?? [{}])

    // 登录
    async function login(data: {
      email: string
      password: string
    }) {
      const res = await apiUser.login(data)
      localStorage.setItem('token', res.data.access_token)
      const times = Math.floor(Date.now() / 1000) + Number.parseInt(res.data.expires_in)
      localStorage.setItem('failure_time', String(times))
      token.value = res.data.access_token
      failure_time.value = times
    }

    async function me() {
      // 获取用户信息
      const res = await apiUser.me()
      localStorage.setItem('email', res.data.account)
      localStorage.setItem('avatar', res.data.avatar)
      account.value = res.data.email
      localStorage.setItem('userInfo',res.data)
      userInfo.value = res.data
    }
    // 登出
    async function logout(redirect = router.currentRoute.value.fullPath) {
      await apiUser.logout()
      localStorage.removeItem('account')
      localStorage.removeItem('token')
      localStorage.removeItem('failure_time')
      account.value = ''
      token.value = ''
      failure_time.value = ''
      routeStore.removeRoutes()
      menuStore.setActived(0)

      router.push({
        name: 'login',
        query: {
          ...(router.currentRoute.value.path !== '/' && router.currentRoute.value.name !== 'login' && { redirect }),
        },
      })
    }
    // 获取我的权限
    async function getPermissions() {
      // 通过 mock 获取权限
      // const res = await apiUser.permission()
      // permissions.value = res.data.permissions
      return permissions.value
    }
    // 修改密码
    async function editPassword(data: {
      password: string
      newpassword: string
    }) {
      await apiUser.passwordEdit(data)
    }

    return {
      account,
      token,
      permissions,
      isLogin,
      login,
      logout,
      getPermissions,
      editPassword,
      me
    }
  },
)

export default useUserStore
