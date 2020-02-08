import axios from '@/components/axios/gangdiedao-uni-axios'

/**
 * 请求接口日志记录
 */
function _reqlog(req) {
  if (process.env.NODE_ENV === 'development') {
    console.log("请求地址：" + req.url, req.data || req.params)
  }
  //TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`${res.config.url}响应结果：`, res)
  }
}

// 创建自定义接口服务实例
const http = axios.create({
  // baseURL: 'http://f22t435363.imwork.net:57564/FXK',
  baseURL: 'http://115.29.66.95:8083/',
  // baseURL: 'https://www.qysg123.com/',
  timeout: 6000,  // 不可超过 manifest.json 中配置 networkTimeout的超时时间
  // #ifdef H5
  // withCredentials: true,
  // #endif
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// 拦截器 在请求之前拦截
http.interceptors.request.use(config => {
  // code...
  // 获取本地存储的Cookie
  // const cookie = uni.getStorageSync('cookie')
  // 设置Cookie
  // config.headers.Cookie = cookie
  _reqlog(config)
  return config
})

// 拦截器 在请求之后拦截
http.interceptors.response.use( async response => {
  const res = response.data
  if (res.result == 'success') {
    _reslog(response)
    return response
  } else if (res.msg == 'success'){
    _reslog(response)
    return response
  }else if (res.result == 'yes' || res.result == 'no'){
    console.log('--------返回结果-----')
    _reslog(response)
    return res
  } else{
    uni.showToast({
      title: res.msg,
      icon: 'none',
      duration: 2000
    });
    return Promise.reject(new Error(res.msg || 'Error'))
  }
  // code...
  // 获取cookie
  // let headerStr = JSON.stringify(response.headers)
  // let cookie = (/(?:Set-Cookie).+;/.exec(headerStr)[0]).replace(/Set-Cookie|:|"/g, "")
  // if (cookie) {
  // uni.setStorage({
  // key: 'cookie',
  // data: cookie.split(';')[0]
  // })
  // }
}, error => {
  return Promise.reject(error.message)
})

export default http
