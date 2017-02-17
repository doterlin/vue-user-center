import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from '../component/App.vue'
import UserContentMain from '../component/UserContentMain.vue'
import UserLiveRecord from '../component/UserLiveRecord.vue'
import UserRecharge from '../component/UserRecharge.vue'
import UserWithdrawal from '../component/UserWithdrawal.vue'
import UserBankInfo from '../component/UserBankInfo.vue'

//状态管理
Vue.use(Vuex)
  //路由
Vue.use(VueRouter)
  //http请求
Vue.use(VueResource)

//路由配置
//如果需要加菜单，就在这里添加路由，并在UserMenu.vue添加入口router-link
const router = new VueRouter({
  routes: [{
    path: '/live-record',
    component: UserLiveRecord
  }, {
    path: '/recharge',
    component: UserRecharge
  }, {
    path: '/withdrawal',
    component: UserWithdrawal
  }, {
    path: '/bank-info',
    component: UserBankInfo
  }]
})

//Vuex配置
const store = new Vuex.Store({
  state: {
    domain:'http://test.example.com', //保存后台请求的地址，修改时方便（比方说从测试服改成正式服域名）
    userInfo: { //保存用户信息
      nick: null,
      ulevel: null,
      uid: null,
      gold: null,
      point: null,
      portrait: null
    }
  },
  mutations: {
    //更新用户信息
    updateUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo;
    }
  }
})

//设置cookie,增加到vue实例方便全局调用
//vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
//当然，如果session保存到vuex的话除外
Vue.prototype.setCookie = (c_name, value, expiredays) => {
  var exdate = new Date();　　　　
  exdate.setDate(exdate.getDate() + expiredays);　　　　
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//获取cookie
Vue.prototype.getCookie = (name) => {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

//vue实例
var app = new Vue({
  data: {},
  el: '#app',
  render: h => h(App),
  router,
  store,
  mounted() {
    //起始路由
    this.$router.push('/withdrawal');
  }
})