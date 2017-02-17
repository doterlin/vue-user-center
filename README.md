# vue-user-center
> 一个用vue.js(2.0)写的直播类应用web端个人中心

> github地址：[https://github.com/doterlin/vue-user-center](https://github.com/doterlin/vue-user-center)

> 演示地址：[https://doterlin.github.io/vue-user-center/](https://doterlin.github.io/vue-user-center)

![截图](https://github.com/doterlin/vue-user-center/blob/master/images/print-screen.png)

## 编译
```
npm run build
```

## 框架及插件
+ [vue.js](https://vuejs.org/v2/guide/) 主框架
+ [vuex](https://vuex.vuejs.org/) 状态管理
+ [vue-router](https://router.vuejs.org/) 路由管理
+ [vue-resource](https://github.com/pagekit/vue-resource) http请求插件

## 应用结构
组件的父子关系和位置大概如下:

![应用结构](https://github.com/doterlin/vue-user-center/blob/master/images/app-structure-ps.png)

使用`chrome`插件`Vue.js devtools`也可以清晰的查看应用的组件组成及相关数据：

![Vue.js devtools](https://github.com/doterlin/vue-user-center/blob/master/images/app-structure.png)


## 说明
+ 里面包含一些实用的小组件可复用(分页组件，数据展示表格，Loading组件等)
+ 本项目开始时，但是不排除日后扩展，所以在状态管理处理时使用了`vuex`
+ 所有对代码解释已在注释中，方便查看
+ 一些组件有写到一些url，只是为了表明在实际开发时需要请求后台，在此示例中为了演示效果所以并没有用到
+ loading状态是用`setTimeout`方法演示，并非真正请求后台
+ `下一版本将增加登录演示`
