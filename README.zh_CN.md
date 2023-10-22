<p align="center">
  <img width="200" src="./docs/logo.png">
  <span style="font-size: 40px;line-height: 200px">  </span>
  <img width="200" src="./docs/logo_vue.png">
</p>

<p>
<a href="https://packagist.org/packages/pl1998/el-admin"><img src="https://img.shields.io/badge/vue3+-blue" /></a>

</p>

## About ElAdmin

[English](./README.md) | 简体中文

### 简介

> 这是 `El-admin `包提供的一个Web前端骨架，已实现了权限管理模块


### 依赖
* Vue  >= 3.0
* Vite
* Vue-router
* TypeScript
* Pinia

### 安装

```shell
git clone https://github.com/pltrue/basic.git
cd basic
git checkout el-admin-master
```


###  配置修改

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

### 启动
```shell
npm install -g pnpm
pnpm install
pnpm run dev
```

### 官方文档

https://fantastic-admin.gitee.io/guide/ready.html

## 鸣谢

> 前端骨架项目是基于[fantastic-admin项目](https://fantastic-admin.gitee.io/)的基础上，接入的后端接口，实现了后端控制权限管理。非常感谢该项目的开发人员，使用该项目可以非常便捷的开发后端管理系统，该项目提供了优秀的使用文档~，是一套不错的前端中台解决方法！

## License
MIT License
