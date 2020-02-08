/*
 * 路由表对象：
 * 该文件挂载在Vue原型中 $mRoutesConfig
 * 作用：调用$mRouter对象的方法 传入以下对应的路由对象，详细见common目录下的router.js
 * 示例：this.$mRouter.push({route:this.$mRoutesConfig.main,query:{a:1}})
 * 注意：所有在pages目录下新建的页面都必须在"路由表"中进行声明，并且在框架的pages.json注册。
 *
 * 配置参数项说明：
 * name:可选配置 （路由名称）
 * path:必填配置 （路由地址）
 * requiresAuth:可选配置 （是否权限路由）
 */

export default {
  // 权限路由
  address: {
    name: "收获地址",
    path: "/pages/address/address",
    requiresAuth: true
  },
  addressManage: {
    name: "编辑收获地址",
    path: "/pages/address/addressManage",
    requiresAuth: true
  },
  cart: {
    name: "购物车",
    path: "/pages/cart/cart",
    requiresAuth: true
  },
  loginTest: {
    name: "测试login",
    path: "/pages/public/login",
  },
  category: {
    name: "分类",
    path: "/pages/category/category",
    requiresAuth: true
  },
  index: {
    name: "首页",
    path: "/pages/index/index",
    requiresAuth: true
  },
  pay: {
    name: "支付",
    path: "/pages/money/pay",
    requiresAuth: true
  },
  paySuccess: {
    name: "支付成功",
    path: "/pages/money/paySuccess",
    requiresAuth: true
  },
  notice: {
    name: "平台咨询",
    path: "/pages/notice/notice",
    requiresAuth: true
  },
  noticeDetail: {
    name: "咨询详情",
    path: "/pages/notice/noticeDetail",
    requiresAuth: true
  },
  //购买商城的确认订单页面
  createOrder: {
    name: "创建订单",
    path: "/pages/order/createOrder",
    requiresAuth: true
  },
  order: {
    name: "订单列表",
    path: "/pages/order/order",
    requiresAuth: true
  },
  productList: {
    name: "商品列表",
    path: "/pages/product/list",
    requiresAuth: true
  },
  product: {
    name: "商品详情",
    path: "/pages/product/product",
    requiresAuth: true
  },
  login: {
    name: "登录",
    path: "/pages/login/login",
    requiresAuth: true
  },
  moneyIndex: {
    name: "我的钱包",
    path: "/pages/money/money",
    requiresAuth: true
  },
  recharge: {
    name: "充值",
    path: "/pages/money/recharge",
    requiresAuth: true
  },
  withdraw: {
    name: "提现",
    path: "/pages/money/withdraw",
    requiresAuth: true
  },
  accounts: {
    name: "提现",
    path: "/pages/money/accounts",
    requiresAuth: true
  },
  set: {
    name: "设置",
    path: "/pages/set/set",
    requiresAuth: true
  },
  userSetting: {
    name: "个人资料",
    path: "/pages/user/userSetting",
    requiresAuth: true
  },
  myBill: {
    name: "我的账单",
    path: "/pages/my/myBill",
    requiresAuth: true
  },
  myIncome: {
    name: "我的收益",
    path: "/pages/my/myIncome",
    requiresAuth: true
  },
  myPerformance: {
    name: "业绩统计",
    path: "/pages/my/myPerformance",
    requiresAuth: true
  },
  marketManagement: {
    name: "市场管理",
    path: "/pages/my/marketManagement",
    requiresAuth: true
  },
  myUpgradeRecord: {
    name: "升级记录",
    path: "/pages/my/myUpgradeRecord",
    requiresAuth: true
  },
  kuaidi: {
    name: "物流查询",
    path: "/pages/order/kuaidi",
    requiresAuth: true
  },
  ratings: {
    name: "全部评价",
    path: "/pages/product/ratings",
    requiresAuth: true
  },
  sharingInvitations: {
    name: "分享",
    path: "/pages/my/sharingInvitations",
    requiresAuth: true
  },
  pingjia: {
    name: "评价",
    path: "/pages/order/pingjia",
    requiresAuth: true
  },
  // 非权限路由
  // main: {
  // 	name: "首页",
  // 	path: "/pages/main/main"
  // },
  // login: {
  // 	name: "登录",
  // 	path: "/pages/login/login"
  // },
  // index: {
  // 	name: "推荐注册",
  // 	path: "/pages/login/index"
  // },
  // reg: {
  // 	name: "注册",
  // 	path: "/pages/login/reg"
  // },
  // regSuccess: {
  // 	name: "提交成功",
  // 	path: "/pages/login/success"
  // },
  // ccApply: {
  // 	name: "信用卡申请",
  // 	path: "/pages/cc/ccApply"
  // },

}
