<template>
    <view class="container">
        <view class="user-section">
<!--            <image class="bg" src="/static/user-bg.jpg"></image>-->
            <image class="bg" src="/static/user_bg.jpg"></image>
<!--            <image class="bg" src="/static/user-bg.jpg"></image>-->
            <view class="user-info-box" @click="navTo('userSetting',user.USER_ID)">
                <view class="portrait-box">
                    <image :src="user.portrait || '/static/missing-face.png'" class="portrait"></image>
                </view>
                <view class="info-box">
                    <text class="username">{{user.NAME || '新用户'}}</text>
                    <text class="userinfo-score userinfo-vipTar" v-if="user.LEVEL == 6">董事</text>
                    <text class="userinfo-score userinfo-vipTar" v-else>{{user.LEVEL || '0'}}星会员</text>
                    <view v-if="user.DS_ROLE == 1" class="userinfo-score-day">电商</view>
                    <view class="userinfo-score-day" v-if="user.STATE == 0">正式会员</view>
                    <view class="userinfo-score-day" v-else>免费会员</view>
                </view>
            </view>
            <!--            <view class="vip-card-box">-->
            <!--                <image class="card-bg" mode="" src="/static/vip-card-bg.png"></image>-->
            <!--                <view class="b-btn">-->
            <!--                    立即开通-->
            <!--                </view>-->
            <!--                <view class="tit">-->
            <!--                    <text class="yticon icon-iLinkapp-"></text>-->
            <!--                    DCloud会员-->
            <!--                </view>-->
            <!--                <text class="e-m">DCloud Union</text>-->
            <!--                <text class="e-b">开通会员开发无bug 一测就上线</text>-->
            <!--            </view>-->
        </view>

        <view
                :style="[{
				transform: coverTransform,
				transition: coverTransition
			}]"
                @touchend="coverTouchend"
                @touchmove="coverTouchmove"
                @touchstart="coverTouchstart"
                class="cover-container"
        >
            <image class="arc" src="/static/arc.png"></image>

            <view class="tj-sction">
                <view class="tj-item">
                    <text class="num">{{user.JJB || 0}}</text>
                    <text>奖金积分</text>
                </view>
                <view class="tj-item">
                    <text class="num">{{user.GWB || 0}}</text>
                    <text>购物积分</text>
                </view>
            </view>
            <!-- 订单 -->
            <view class="order-section">
                <view :hover-stay-time="50" @click="navTo('order',0)" class="order-item"
                      hover-class="common-hover">
                    <text class="yticon icon-daifukuan"></text>
                    <text>待付款</text>
                </view>
                <view :hover-stay-time="50" @click="navTo('order',1)" class="order-item"
                      hover-class="common-hover">
                    <text class="yticon icon-yishouhuo"></text>
                    <text>已发货</text>
                </view>
                <view :hover-stay-time="50" @click="navTo('order',2)" class="order-item"
                      hover-class="common-hover">
                    <text class="yticon icon-shouhoutuikuan"></text>
                    <text>已完成</text>
                </view>
                <view :hover-stay-time="50" @click="navTo('order',3)" class="order-item"
                      hover-class="common-hover">
                    <text class="yticon icon-shouye"></text>
                    <text>已取消</text>
                </view>
            </view>
            <!-- 浏览历史 -->
            <view class="history-section icon">
                <list-cell icon="icon-iconfontweixin" iconColor="#FF9900" routeKey="moneyIndex"
                           title="我的钱包"></list-cell>
                <list-cell icon="icon-shouhoutuikuan" iconColor="#FF6600" routeKey="myBill"
                           title="我的账单"></list-cell>
                <list-cell icon="icon-erjiye-yucunkuan" iconColor="#ee883b" routeKey="myIncome"
                           title="我的收益"></list-cell>
                <list-cell icon="icon-zuanshi" iconColor="#54b4ef" routeKey="myPerformance"
                           title="业绩统计"></list-cell>
                <list-cell icon="icon-tuandui" iconColor="#003399" routeKey="marketManagement"
                           title="市场管理"></list-cell>
                <list-cell icon="icon-iLinkapp-" iconColor="#e07472" routeKey="myUpgradeRecord"
                           title="升级记录"></list-cell>
                <list-cell icon="icon-dizhi" iconColor="#5fcda2" routeKey="address" title="地址管理"></list-cell>
                <list-cell icon="icon-share" iconColor="#9789f7" routeKey="sharingInvitations" tips="分享有好礼！" title="分享"></list-cell>
<!--                <list-cell icon="icon-pinglun-copy" iconColor="#ee883b" tips="晒单抢红包" title="晒单"></list-cell>-->
<!--                <list-cell icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#54b4ef" title="我的收藏"></list-cell>-->
                <list-cell routeKey="set" border="" icon="icon-shezhi1" iconColor="#e07472"
                           title="设置"></list-cell>
            </view>
        </view>


    </view>
</template>
<script>
import listCell from '@/components/mix-list-cell';
import { mapMutations, mapState } from 'vuex';
import http from '@/utils/request.js'

let startY = 0, moveY = 0, pageAtTop = true;
export default {
  components: {
    listCell
  },
  data() {
    return {
      coverTransform: 'translateY(0px)',
      coverTransition: '0s',
      moving: false,
      user: null,
      url: ''
    }
  },
  onLoad() {

  },
  // #ifndef MP
  onNavigationBarButtonTap(e) {
    const index = e.index;
    if (index === 0) {
      this.navTo('/pages/set/set');
    } else if (index === 1) {
      // #ifdef APP-PLUS
      const pages = getCurrentPages();
      const page = pages[pages.length - 1];
      const currentWebview = page.$getAppWebview();
      currentWebview.hideTitleNViewButtonRedDot({
        index
      });
      // #endif
      uni.navigateTo({
        url: '/pages/notice/notice'
      })
    }
  },
  onTabItemTap() {

  },
  onShow() {
    const self = this
    // console.log(self.)
    this.user = this.$store.state.userInfo
    this.url = this.$store.state.imgUrl
    if (!this.$store.state.hasLogin){
		console.log('reLaunch')
      this.$mRouter.reLaunch({
        route: this.$mRouterConfig.login
      })
      return false
    }
    http.get(`/userImpl/userInfo?USER_ID=${self.user.USER_ID}`, []).then((res) => {
      uni.setStorage({//缓存用户登陆状态
        key: 'userInfo',
        data: res.data.user
      });
      self.user = res.data.user
      // self.topGoodsList = res.data.goodList
    }).catch(error => {
      console.log('通过查询', error)
    });
  },
  // #endif
  computed: {
    ...mapState(['hasLogin', 'userInfo'])
  },
  methods: {
    ...mapMutations(['getUserInfo']),
    /**
     * 统一跳转接口,拦截未登录路由
     * navigator标签现在默认没有转场动画，所以用view
     */
    navTo(key, param) {
      this.$mRouter.push({
        route: this.$mRouterConfig[key],
        query: {
          state: param
        }
      })
      // if (!this.hasLogin) {
      //   url = '/pages/public/login';
      // }
      // uni.navigateTo({
      //   url
      // })
    },

    /**
     *  会员卡下拉和回弹
     *  1.关闭bounce避免ios端下拉冲突
     *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
     *    transition设置0.1秒延迟，让css来过渡这段空窗期
     *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
     */
    coverTouchstart(e) {
      if (pageAtTop === false) {
        return;
      }
      this.coverTransition = 'transform .1s linear';
      startY = e.touches[0].clientY;
    },
    coverTouchmove(e) {
      moveY = e.touches[0].clientY;
      let moveDistance = moveY - startY;
      if (moveDistance < 0) {
        this.moving = false;
        return;
      }
      this.moving = true;
      if (moveDistance >= 80 && moveDistance < 100) {
        moveDistance = 80;
      }

      if (moveDistance > 0 && moveDistance <= 80) {
        this.coverTransform = `translateY(${moveDistance}px)`;
      }
    },
    coverTouchend() {
      if (this.moving === false) {
        return;
      }
      this.moving = false;
      this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
      this.coverTransform = 'translateY(0px)';
    },
    goToTag(url) {
      console.log('123')
      this.$mRouter.push({
        route: this.$mRouterConfig[url]
      })
    }
  }
}
</script>
<style lang='scss'>
    .info-box{
        width: 80%;
        padding-bottom: 3%;
        padding-left: 3%;
    }
    .username{
        color: #fff !important;
        display: inline-block;
        font-size: 36upx;
        margin-bottom: 12upx;
        vert-align: middle;
        margin: 0 !important;
    }
    .userinfo-score{
        font-size: 26upx;
        margin-top: 5px;
        background-color: #b3a078;
        color: #fff;
        padding: 1px 5px;
        border-radius: 2px;

    }
    .userinfo-vipTar{
        display: inline-block;
        vert-align: middle;
        margin-left: 3.5%;
    }
    .userinfo-score-day{
        font-size: 26rpx;
        margin-top: 5px;
        color: #fff;
    }
    %flex-center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    %section {
        display: flex;
        justify-content: space-around;
        align-content: center;
        background: #fff;
        border-radius: 10upx;
    }

    .user-section {
        height: 520upx;
        padding: 110upx 30upx 0;
        padding-left: 45upx !important;
        position: relative;

        .bg {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            filter: blur(1px);
            opacity: .7;
        }
    }

    .user-info-box {
        height: 180upx;
        display: flex;
        align-items: center;
        position: relative;
        z-index: 1;

        .portrait {
            width: 130upx;
            height: 130upx;
            border: 5upx solid #fff;
            border-radius: 50%;
        }

        .username {
            font-size: $font-lg + 6upx;
            color: $font-color-dark;
            margin-left: 20upx;
        }
    }

    .vip-card-box {
        display: flex;
        flex-direction: column;
        color: #f7d680;
        height: 240upx;
        background: linear-gradient(left, rgba(0, 0, 0, .7), rgba(0, 0, 0, .8));
        border-radius: 16upx 16upx 0 0;
        overflow: hidden;
        position: relative;
        padding: 20upx 24upx;

        .card-bg {
            position: absolute;
            top: 20upx;
            right: 0;
            width: 380upx;
            height: 260upx;
        }

        .b-btn {
            position: absolute;
            right: 20upx;
            top: 16upx;
            width: 132upx;
            height: 40upx;
            text-align: center;
            line-height: 40upx;
            font-size: 22upx;
            color: #36343c;
            border-radius: 20px;
            background: linear-gradient(left, #f9e6af, #ffd465);
            z-index: 1;
        }

        .tit {
            font-size: $font-base+2upx;
            color: #f7d680;
            margin-bottom: 28upx;

            .yticon {
                color: #f6e5a3;
                margin-right: 16upx;
            }
        }

        .e-b {
            font-size: $font-sm;
            color: #d8cba9;
            margin-top: 10upx;
        }
    }

    .cover-container {
        background: $page-color-base;
        margin-top: -150upx;
        padding: 0 30upx;
        position: relative;
        background: #f5f5f5;
        padding-bottom: 20upx;

        .arc {
            position: absolute;
            left: 0;
            top: -34upx;
            width: 100%;
            height: 36upx;
        }
    }

    .tj-sction {
        @extend %section;

        .tj-item {
            @extend %flex-center;
            flex-direction: column;
            height: 140upx;
            font-size: $font-sm;
            color: #75787d;
        }

        .num {
            font-size: $font-lg;
            color: $font-color-dark;
            margin-bottom: 8upx;
        }
    }

    .order-section {
        @extend %section;
        padding: 28upx 0;
        margin-top: 20upx;

        .order-item {
            @extend %flex-center;
            width: 120upx;
            height: 120upx;
            border-radius: 10upx;
            font-size: $font-sm;
            color: $font-color-dark;
        }

        .yticon {
            font-size: 48upx;
            margin-bottom: 18upx;
            color: #fa436a;
        }

        .icon-shouhoutuikuan {
            font-size: 44upx;
        }
    }

    .history-section {
        padding: 30upx 0 0;
        margin-top: 20upx;
        background: #fff;
        border-radius: 10upx;

        .sec-header {
            display: flex;
            align-items: center;
            font-size: $font-base;
            color: $font-color-dark;
            line-height: 40upx;
            margin-left: 30upx;

            .yticon {
                font-size: 44upx;
                color: #5eba8f;
                margin-right: 16upx;
                line-height: 40upx;
            }
        }

        .h-list {
            white-space: nowrap;
            padding: 30upx 30upx 0;

            image {
                display: inline-block;
                width: 160upx;
                height: 160upx;
                margin-right: 20upx;
                border-radius: 10upx;
            }
        }
    }

</style>
