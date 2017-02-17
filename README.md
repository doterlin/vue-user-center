# vue-user-center
> 一个用vue.js(2.0)写的直播类应用web端个人中心

## 编译
```
npm run build
```

## 框架及插件
+ [vue.js](https://vuejs.org/v2/guide/) 主框架
+ [vuex](https://vuex.vuejs.org/) 状态管理
+ [vue-router](https://router.vuejs.org/) 路由管理
+ [vue-resource](https://github.com/pagekit/vue-resource) http请求插件

## 说明
+ 里面包含一些实用的小组件可复用(分页组件，数据展示表格，Loading组件等)
+ 本项目开始时，但是不排除日后扩展，所以在状态管理处理时使用了vuex
+ 所有对代码解释已在注释中，方便查看
+ 一些组件有写到一些url，只是为了表明在实际开发时需要请求后台，在此示例中为了演示效果所以并没有用到
+ loading状态是用setTimeout方法演示，并非真正请求后台
+ *下一版本将增加登录演示*
