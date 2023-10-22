<p align="center">
  <img width="200" src="./docs/logo.png">
  <span style="font-size: 40px;line-height: 200px">  </span>
  <img width="200" src="./docs/logo_vue.png">
</p>

<p>
<a href="https://packagist.org/packages/pl1998/el-admin"><img src="https://img.shields.io/badge/vue3+-blue" /></a>
</p>

## About ElAdmin

English | [简体中文](./README.zh_CN.md)

### 简介

> This is a Web front-end skeleton provided by the `El-admin` package, which has implemented the rights management module


### Must
* Vue  >= 3.0
* Vite
* Vue-router
* TypeScript
* Pinia

### Installed

```shell
git clone https://github.com/pltrue/basic.git
cd basic
git checkout el-admin-master
```


### Config Update

> `VITE_APP_API_BASEURL` 改成后端项目地址

```shell
# 页面标题
VITE_APP_TITLE = Fantastic-admin 基础版
# 接口请求地址，会设置到 axios 的 baseURL 参数上
VITE_APP_API_BASEURL = http://dev.admin.com/api/v1/el_admin/
# 调试工具，可设置 eruda 或 vconsole，如果不需要开启则留空
VITE_APP_DEBUG_TOOL =
# 是否开启代理
VITE_OPEN_PROXY = false


```

### Install && Run
```shell
npm install -g pnpm
pnpm install
pnpm run dev
```

### Official document

https://fantastic-admin.gitee.io/guide/ready.html

## Thanks

> The front-end skeleton project is based on [fantastic-admin project](https://fantastic-admin.gitee.io/) and connects to the back-end interface to implement back-end control permission management. Thank you very much for the developers of the project, the use of the project can be very convenient to develop back-end management system, the project provides excellent documentation ~, is a good set of front-end solution!

## License
MIT License
