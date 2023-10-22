<p align="center">
  <img width="200" src="./docs/logo.png">
</p>

<p align="center">
<a href="https://packagist.org/packages/pl1998/el-admin"><img src="https://img.shields.io/badge/vue3+Ts+Vite-blue" /></a>
</p>

## About ElAdmin

[English](./README.md) | 简体中文

### 简介

> 这是 `El-admin `包提供的一个Web前端骨架，以实现了权限管理模块


### 依赖
* Vue  >= 2.0
* Vite
* Vue-router
* TypeScript 
* Pinia

### 安装

```shell
git clone https://github.com/pltrue/basic.git
cd basic 
npm install -g pnpm 
pnpm install
pnpm run dev
```


###  配置发布
```shell
php artisan vendor:publish --provider="Latent\ElAdmin\ElAdminServiceProvider"
```

### 执行构建脚本
```shell
php artisan el-admin:install
```
## 鸣谢

 前端骨架项目是基于[fantastic-admin项目](https://fantastic-admin.gitee.io/)的基础上，接入的后端接口，实现了后端控制权限管理。非常感谢该项目的开发人员，使用该项目可以非常便捷的开发后端管理系统，该项目提供了优秀的使用文档~，是一套不错的前端中台解决方法！

## License
MIT License
