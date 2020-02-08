import Vue from 'vue'
import Vuex from 'vuex'
import http from "../utils/request";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hasLogin: false,
    userInfo: {},
    imgUrl: 'https://www.qysg123.com/'
  },
  getters: {
    // 用户是否登录
    hasLogin: state => {
      let userInfo = uni.getStorageSync('userInfo') || '';
      state.userInfo = userInfo
      if (state.userInfo.USER_ID) {
        console.log('tr')
        return true
      } else {
        console.log('fa')
        return false
      }
      // uni.getStorage({
      //   key: 'userInfo',
      //   success: (res) => {
      //     state.userInfo = res.data
      //     if (state.userInfo.USER_ID) {
      //     	console.log('tr')
      //       return true
      //     } else {
      // 	  console.log('fa')
      //       return false
      //     }
      //   }
      // })
    }
  },
  mutations: {
    login(state, provider) {
      state.hasLogin = true;
      state.userInfo = provider;
      uni.setStorage({//缓存用户登陆状态
        key: 'userInfo',
        data: provider
      })
      console.log(state.userInfo);
    },
    logout(state) {
      state.hasLogin = false;
      state.userInfo = {};
      uni.removeStorage({
        key: 'userInfo'
      });
    },
    // async getUserInfo(state, id) {
    //   http.get(`userImpl/userInfo?USER_ID=${id}`).then(res => {
    //     // uni.setStorage({//缓存用户登陆状态
    //     //   key: 'userInfo',
    //     //   data: res.data.user
    //     // });
    //     state.userInfo = res.data.user
    //     debugger
    //     return res.data.user
    //   }).catch(err => {
    //     console.log('查询用户信息err', err)
    //     return false
    //   })
    // },
  },
  actions: {}
})

export default store
