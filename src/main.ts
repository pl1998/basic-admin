import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import pinia from './store'
import router from './router'
import useSettingsStore from './store/modules/settings'

// 自定义指令
import directive from '@/utils/directive'
// 加载 svg 图标
import 'virtual:svg-icons-register'
// 全局样式
import '@/assets/styles/globals.scss'
// 加载 iconify 图标（element plus）
import { downloadAndInstall } from '@/iconify-ep'
if (useSettingsStore().app.iconifyOfflineUse) {
  await downloadAndInstall()
}

const app = createApp(App)
app.use(ElementPlus)
app.use(pinia)
app.use(router)
directive(app)

app.mount('#app')
