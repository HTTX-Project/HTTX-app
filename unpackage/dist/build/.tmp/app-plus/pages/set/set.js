(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/set/set"],{"0b35":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=e("2f62");function u(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},o=Object.keys(e);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.forEach(function(n){c(t,n,e[n])})}return t}function c(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var r={data:function(){return{}},onLoad:function(){},onShow:function(){},methods:u({},(0,o.mapMutations)(["logout"]),{navTo:function(t){this.$mRouter.push({route:this.$mRouterConfig[t]})},clearSto:function(){var n=this;t.showModal({content:"缓存清理后需重新登录，是否继续操作?",success:function(e){if(e.confirm)try{t.clearStorageSync(),n.$api.msg("缓存清理成功"),setTimeout(function(){n.$mRouter.reLaunch({route:n.$mRouterConfig.login})},200)}catch(e){n.$api.msg("缓存清理失败")}}})},toLogout:function(){var n=this,e=this;t.showModal({content:"确定要退出登录么",success:function(t){t.confirm&&(n.logout(),setTimeout(function(){e.$mRouter.push({route:e.$mRouterConfig.login})},200))}})},switchChange:function(t){var n=t.detail.value?"打开":"关闭";this.$api.msg("".concat(n,"消息推送"))}})};n.default=r}).call(this,e("6e42")["default"])},"12cc":function(t,n,e){"use strict";e.r(n);var o=e("5fac"),u=e("d8cc");for(var c in u)"default"!==c&&function(t){e.d(n,t,function(){return u[t]})}(c);e("16d7");var r,i=e("f0c5"),a=Object(i["a"])(u["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);n["default"]=a.exports},"16d7":function(t,n,e){"use strict";var o=e("9ee5"),u=e.n(o);u.a},"5fac":function(t,n,e){"use strict";var o,u=function(){var t=this,n=t.$createElement;t._self._c},c=[];e.d(n,"b",function(){return u}),e.d(n,"c",function(){return c}),e.d(n,"a",function(){return o})},"7bb3":function(t,n,e){"use strict";(function(t){e("29bd"),e("921b");o(e("66fd"));var n=o(e("12cc"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])},"9ee5":function(t,n,e){},d8cc:function(t,n,e){"use strict";e.r(n);var o=e("0b35"),u=e.n(o);for(var c in o)"default"!==c&&function(t){e.d(n,t,function(){return o[t]})}(c);n["default"]=u.a}},[["7bb3","common/runtime","common/vendor"]]]);