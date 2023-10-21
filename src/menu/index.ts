import MultilevelMenuExample from './modules/multilevel.menu.example'
import User from './modules/user'
import Roles from './modules/role'
import Menus from './modules/menu'
import Log from './modules/log'
import type { Menu } from '#/global'

const menu: Menu.recordMainRaw[] = [
  {
    meta: {
      title: '演示',
      icon: 'sidebar-default',
    },
    children: [
      MultilevelMenuExample,
      User,
      Roles,
      Menus,
      Log
    ],
  },
]

export default menu
