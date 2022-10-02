# utools-code2flow

在utools中实现code2flow

# 原理
依赖该项目，移植到utools中来
https://github.com/scottrogowski/code2flow

## 使用
- 安装 python3，使用brew安装就好,需要是
```shell
brew install python3
```
安装好之后，目录一般是在这里,`/Users/${username}/Library/Python/3.8`
- 安装code2flow
    ```shell
    pip3 install code2flow
    ```
- 安装graphviz
```shell
brew install graphviz
```
- 安装Acorn
```shell
npm i -g acorn
```

## 技术栈

- [vite](https://github.com/vitejs/vite)
- [vue3](https://github.com/vuejs/core)

## 特性

1. [组件自动加载](https://github.com/antfu/unplugin-vue-components)
2. [模块自动加载](https://github.com/dishait/vite-plugin-use-modules)
3. [文件路由支持](https://github.com/hannoeru/vite-plugin-pages)
4. [api 自动加载](https://github.com/antfu/unplugin-auto-import)
5. [现代化的 reset css](https://github.com/hankchizljaw/modern-css-reset)
6. [unocss 原子库支持](https://github.com/unocss/unocss)
