import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from '../component/App.vue'
import UserContentMain from '../component/UserContentMain.vue'
import UserLiveRecord from '../component/UserLiveRecord.vue'
import UserRecharge from '../component/UserRecharge.vue'
//import UserWithdrawal from '../component/UserWithdrawal.vue'
//import UserBankInfo from '../component/UserBankInfo.vue'

//状态管理
Vue.use(Vuex)

//路由
Vue.use(VueRouter)

//http请求
Vue.use(VueResource)

//路由配置
const router = new VueRouter({
  routes: [
    { path: '/live-record/:uid', component: UserLiveRecord },
  	{ path: '/recharge/', component: UserRecharge },
  	//{ path: '/withdrawal', component: UserWithdrawal },
  	//{ path: '/bank-info', component: UserBankInfo }
    //{ path: '/:menuId', component: UserContentMain } 
  ]
})


Vue.prototype.setCookie = (c_name, value, expiredays) => {
    var exdate = new Date();　　　　
    exdate.setDate(exdate.getDate() + expiredays);　　　　
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

Vue.prototype.getCookie = (name) => {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}

Vue.prototype.domain = 'http://test.www.starme.media';
Vue.prototype.adminDomain = 'http://54.169.76.188';
//Vue.prototype.userInout = {};

var app = new Vue({
	data: {
		
	},
	el: '#app',
	render: h => h(App),
	router,
	mounted() {
		//router.push('/live-record/')
	}
})

