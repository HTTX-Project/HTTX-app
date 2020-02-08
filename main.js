import Vue from 'vue'
import store from './store'
import App from './App'
import $mRouter from './utils/router.js'
import $mUtils from './utils/utils.js'
import $mRoutesConfig from './utils/routes.config.js'
import Json from './Json' //测试用数据
/**
 *  因工具函数属于公司资产, 所以直接在Vue实例挂载几个常用的函数
 *  所有测试用数据均存放于根目录json.js
 *
 *  css部分使用了App.vue下的全局样式和iconfont图标，有需要图标库的可以留言。
 *  示例使用了uni.scss下的变量, 除变量外已尽量移除特有语法,可直接替换为其他预处理器使用
 */
Vue.prototype.$mUtils = $mUtils;
Vue.prototype.$mRouter = $mRouter;
Vue.prototype.$mRouterConfig = $mRoutesConfig;
const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
	})
}

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}


Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {msg, json, prePage};

App.mpType = 'app'



$mRouter.beforeEach((navType, to) => {
	console.log('beforeEach');
	if (to.route === undefined) throw ("路由钩子函数中没有找到to.route对象，路由信息:" + JSON.stringify(to));

	// if (to.route.path === $mRoutesConfig.login.path && store.getters.hasLogin) {
	// 	console.log($mRoutesConfig)
	// 	console.log($mUtils.objParseUrlAndParam($mRoutesConfig.index.path, to.query))
	// 	uni.redirectTo({
	// 		url: $mUtils.objParseUrlAndParam($mRoutesConfig.index.path, to.query)
	// 	})
	// 	return;
	// }

	// // 过滤需要权限的页面
	if (to.route.requiresAuth) {
		const ss = store.getters.hasLogin
		if (ss) {
			// 已经登录
			uni[navType]({
				url: $mUtils.objParseUrlAndParam(to.route.path, to.query)
			})
		} else {
			// 登录成功后的重定向地址和参数
			let query = {
				redirectUrl: to.route.path,
				...to.query
			}
			// 没有登录 是否强制登录?
			// if (store.state.forcedLogin) {
			// 	uni.redirectTo({
			// 		url: $mUtils.objParseUrlAndParam($mRoutesConfig.login.path, query)
			// 	})
			// } else {
				uni.navigateTo({
					url: $mUtils.objParseUrlAndParam($mRoutesConfig.login.path, query)
				})
			// }
		}
	} else {
		uni[navType]({
			url: $mUtils.objParseUrlAndParam(to.route.path, to.query)
		})
	}
})

const app = new Vue({
    ...App
})
app.$mount()
