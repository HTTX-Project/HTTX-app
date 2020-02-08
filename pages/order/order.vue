<template>
    <view class="content">
        <view class="navbar">
            <view
                    :class="{current: tabCurrentIndex === index}" :key="index"
                    @click="tabClick(index)"
                    class="nav-item"
                    v-for="(item, index) in navList"
            >
                {{item.text}}
            </view>
        </view>

        <swiper :current="tabCurrentIndex" @change="changeTab" class="swiper-box" duration="300">
            <swiper-item :key="tabIndex" class="tab-content" v-for="(tabItem,tabIndex) in navList">
                <!--                        @scrolltolower="loadData"-->
                <scroll-view
                        class="list-scroll-content"
                        scroll-y
                >
                    <!-- 空白页 -->
                    <empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>
                    <!-- 订单列表 -->
                    <view
                            :key="index"
                            class="order-item" v-for="(item,index) in tabItem.orderList"
                            v-if="tabItem.orderList.length > 0"
                    >
                        <view class="i-top b-b">
                            <text class="time">订单号: {{item.ORDER_CODE}}</text>
                            <text class="state">{{navList[tabCurrentIndex].text}}</text>
                            <!--                            <text-->
                            <!--                                    @click="deleteOrder(index)"-->
                            <!--                                    class="del-btn yticon icon-iconfontshanchu1"-->
                            <!--                            ></text>-->
                        </view>
                        <view class="i-top b-b">
                            <text class="time">{{item.START_TIME}}</text>
                            <text class="state" style="color: #333;" v-if="item.PAY_TYPE == 1">在线支付</text>
                            <text class="state" style="color: #333;" v-if="item.PAY_TYPE == 2">奖金支付</text>
                            <text class="state" style="color: #333;" v-if="item.PAY_TYPE == 3">混合支付</text>
                        </view>
                        <scroll-view class="goods-box" scroll-x
                                     v-if="item.orderMiddleList.length > 1">
                            <view
                                    :key="goodsIndex" class="goods-item"
                                    v-for="(goodsItem, goodsIndex) in item.orderMiddleList"
                            >
                                <image :src="url+''+goodsItem.PATH" class="goods-img" mode="aspectFill"></image>
                            </view>
                        </scroll-view>
                        <view
                                :key="goodsIndex"
                                class="goods-box-single"
                                v-for="(goodsItem, goodsIndex) in item.orderMiddleList"
                                v-if="tabItem.orderList.length > 0 & item.orderMiddleList.length === 1"
                        >
                            <image :src="url+''+goodsItem.PATH" class="goods-img" mode="aspectFill"></image>
                            <view class="right">
                                <text class="title clamp">{{goodsItem.NAME}}</text>
                                <text class="title clamp num">x{{goodsItem.NUM}}</text>
                                <view v-if="tabCurrentIndex==2">
                                    <button v-if="tabCurrentIndex==2 && goodsItem.COMMENT_STATUS != '0'" @click="goPingJia(item,goodsItem)" class="action-btn recom pjbtn">立即评价</button>
                                <text v-else class="action-btn recom pjbtn" style="background: #fff;">已评价</text>
                                </view>
                                <!--                                <text class="attr-box">{{goodsItem.attr}} x {{goodsItem.number}}</text>-->
                                <!--                                <text class="price">{{goodsItem.price}}</text>-->
                            </view>
                        </view>

                        <view class="price-box">
<!--                            共-->
<!--                            <text class="num">{{item.orderMiddleList.length}}</text>-->
<!--                            件商品-->
                            实付款
                            <text class="price">{{item.TOTAL}}</text>
                        </view>
                        <view class="action-box b-t" v-show="tabCurrentIndex==0">
                            <button @click="cancelOrder(item)" class="action-btn">取消订单</button>
                            <button @click="item.PAY_TYPE == 1?onLinePay(item):orderPay(item)" class="action-btn recom">
                                立即支付
                            </button>
                        </view>
                        <view class="action-box b-t" v-show="tabCurrentIndex==1">
                            <button @click="goWuLiu(item)" class="action-btn recom">物流信息</button>
                        </view>
                    </view>


                </scroll-view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import empty from "@/components/empty";
import http from '@/utils/request.js'

export default {
  components: {
    uniLoadMore,
    empty
  },
  data() {
    return {
      tabCurrentIndex: 0,
      navList: [
        {
          state: 1,
          text: '待付款',
          loadingType: 'more',
          orderList: []
        },
        {
          state: 2,
          text: '已发货',
          loadingType: 'more',
          orderList: []
        },
        {
          state: 3,
          text: '已完成',
          loadingType: 'more',
          orderList: []
        },
        {
          state: 4,
          text: '已取消',
          loadingType: 'more',
          orderList: []
        }
      ],
      user: {},
      url: {}
    };
  },

  onLoad(options) {
    /**
     * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
     * 替换onLoad下代码即可
     */
    this.user = this.$store.state.userInfo
    this.url = this.$store.state.imgUrl
    this.tabCurrentIndex = +options.state;
    this.loadData()
    // this.state = options.state
    // this.loadData(options.state)
    // #ifndef MP
    // this.loadData()
    // #endif
    // #ifdef MP
    // if (options.state == 0) {
    //   this.loadData()
    // }
    // #endif
  },

  methods: {
    //获取订单列表
    loadData(source) {
      const self = this
      //这里是将订单挂载到tab列表下
      let index = this.tabCurrentIndex;
      let navItem = this.navList[index];
      let state = navItem.state;
      // if (source === 'tabChange' && navItem.loaded === true) {
      //   //tab切换只有第一次需要加载数据
      //   return;
      // }
      if (navItem.loadingType === 'loading') {
        //防止重复加载
        return;
      }
      uni.showLoading({
        mask: true
      })

      navItem.loadingType = 'loading';
      let url = ''
      if (self.tabCurrentIndex == 0) {
        url = `/orderImpl/orderList?USER_ID=${this.user.USER_ID}&PAY_STATUS=1&ORDER_STATUS=`
      } else if (self.tabCurrentIndex == 1) {
        url = `/orderImpl/orderList?USER_ID=${this.user.USER_ID}&ORDER_STATUS=1&PAY_STATUS=`
      } else if (self.tabCurrentIndex == 2) {
        url = `/orderImpl/orderList?USER_ID=${this.user.USER_ID}&ORDER_STATUS=3&PAY_STATUS=`
      } else {
        url = `/orderImpl/orderList?USER_ID=${this.user.USER_ID}&ORDER_STATUS=2&PAY_STATUS=`
      }
      self.orderList = []
      navItem.orderList = []
      http.get(url, []).then(res => {
        self.orderList = res.data.orderList
        navItem.orderList = self.orderList
        console.log('orderList', self.orderList)
      }).catch(err => {
        console.log('order查询失败', err)
      }).finally(() => {
        this.$set(navItem, 'loaded', true);
        //判断是否还有数据， 有改为 more， 没有改为noMore
        navItem.loadingType = 'more';
        uni.hideLoading({})
      })
    },
    //swiper 切换
    changeTab(e) {
      this.tabCurrentIndex = e.target.current;
      this.loadData('tabChange');
    },
    //顶部tab点击
    tabClick(index) {
      this.tabCurrentIndex = index;
    },
    goPingJia(order,goods){
      debugger
        this.$mRouter.push({
          route: this.$mRouterConfig.pingjia,
          query: {
              oId: order.USER_ID,
              gId: goods.GOOD_ID
          }
        })
    },
    goWuLiu(item) {
      if (item.EMS_CODE && item.EMS_CODE != ''){
        this.$mRouter.push({
          route: this.$mRouterConfig.kuaidi
        })
      }else{
        this.$api.msg('无物流单号')
      }
    },
    //删除订单
    deleteOrder(index) {
      uni.showLoading({
        title: '请稍后'
      })
      setTimeout(() => {
        this.navList[this.tabCurrentIndex].orderList.splice(index, 1);
        uni.hideLoading();
      }, 600)
    },
    //取消订单
    cancelOrder(item) {
      const self = this
      uni.showLoading({
        title: '请稍后',
        mask: true
      })
      uni.showModal({
        content: '确定要取消订单吗?',
        success: (e) => {
          if (e.confirm) {
            http.get(`/orderImpl/editOrder?USER_ID=${item.USER_ID}&ORDER_CODE=${item.ORDER_CODE}&ORDER_STATUS=2`, {}).then(res => {
              self.$api.msg('取消订单成功', 1500, true, 'success')
              self.loadData()
            }).catch(err => {
              console.log('取消订单报错', err)
            }).finally(() => {
              uni.hideLoading({})
            })
          }
        }
      });
    },
    onLinePay() {
      console.log('在线支付')
    },
    orderPay(row) {
      const self = this
      uni.showLoading({
        title: '请稍后',
        mask: true
      })
      http.get(`/orderImpl/orderPay?USER_ID=${self.user.USER_ID}&ORDER_CODE=${row.ORDER_CODE}&PAY_TYPE=${row.PAY_TYPE}`, {}).then(res => {
        uni.redirectTo({
          url: '/pages/money/paySuccess'
        })
      }).catch(err => {
        console.log('订单支付失败', err);
      }).finally(() => {
        uni.hideLoading({})
      })
    },
    //订单状态文字和颜色
    orderStateExp(state) {
      let stateTip = '',
        stateTipColor = '#fa436a';
      switch (+state) {
        case 1:
          stateTip = '待付款';
          break;
        case 2:
          stateTip = '待发货';
          break;
        case 9:
          stateTip = '订单已关闭';
          stateTipColor = '#909399';
          break;

        //更多自定义
      }
      return { stateTip, stateTipColor };
    }
  },
}
</script>

<style lang="scss">
    page, .content {
        background: $page-color-base;
        height: 100%;
    }
    .num{
        display: inline-block;
        /*margin:upx 15upx;*/
        margin-top: 30upx;
        margin-left: 10upx;
        color: #666 !important;
    }
    .swiper-box {
        height: calc(100% - 40px);
    }
    .right{
        position: relative;
    }
    .pjbtn{
        position: absolute;
        right: 3%;
        bottom: 3%;
    }
    .list-scroll-content {
        height: 100%;
    }

    .navbar {
        display: flex;
        height: 40px;
        padding: 0 5px;
        background: #fff;
        box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
        position: relative;
        z-index: 10;

        .nav-item {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            font-size: 15px;
            color: $font-color-dark;
            position: relative;

            &.current {
                color: $base-color;

                &:after {
                    content: '';
                    position: absolute;
                    left: 50%;
                    bottom: 0;
                    transform: translateX(-50%);
                    width: 44px;
                    height: 0;
                    border-bottom: 2px solid $base-color;
                }
            }
        }
    }

    .uni-swiper-item {
        height: auto;
    }

    .order-item {
        display: flex;
        flex-direction: column;
        padding-left: 30upx;
        background: #fff;
        margin-top: 16upx;

        .i-top {
            display: flex;
            align-items: center;
            height: 80upx;
            padding-right: 30upx;
            font-size: $font-base;
            color: $font-color-dark;
            position: relative;

            .time {
                flex: 1;
            }

            .state {
                color: $base-color;
            }

            .del-btn {
                padding: 10upx 0 10upx 36upx;
                font-size: $font-lg;
                color: $font-color-light;
                position: relative;

                &:after {
                    content: '';
                    width: 0;
                    height: 30upx;
                    border-left: 1px solid $border-color-dark;
                    position: absolute;
                    left: 20upx;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }

        /* 多条商品 */
        .goods-box {
            height: 160upx;
            padding: 20upx 0;
            white-space: nowrap;

            .goods-item {
                width: 120upx;
                height: 120upx;
                display: inline-block;
                margin-right: 24upx;
            }

            .goods-img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }

        /* 单条商品 */
        .goods-box-single {
            display: flex;
            padding: 20upx 0;

            .goods-img {
                display: block;
                width: 140upx;
                height: 140upx;
            }

            .right {
                flex: 1;
                display: flex;
                flex-direction: column;
                padding: 0 30upx 0 24upx;
                overflow: hidden;
                padding-top: 10upx;
                .title {
                    font-size: $font-base + 2upx;
                    color: $font-color-dark;
                    line-height: 1;
                }

                .attr-box {
                    font-size: $font-sm + 2upx;
                    color: $font-color-light;
                    padding: 10upx 12upx;
                }

                .price {
                    font-size: $font-base + 2upx;
                    color: $font-color-dark;

                    &:before {
                        content: '￥';
                        font-size: $font-sm;
                        margin: 0 2upx 0 8upx;
                    }
                }
            }
        }

        .price-box {
            display: flex;
            justify-content: flex-end;
            align-items: baseline;
            padding: 20upx 30upx;
            font-size: $font-sm + 2upx;
            color: $font-color-light;

            .num {
                margin: 0 8upx;
                color: $font-color-dark;
            }

            .price {
                font-size: $font-lg;
                color: $font-color-dark;

                &:before {
                    content: '￥';
                    font-size: $font-sm;
                    margin: 0 2upx 0 8upx;
                }
            }
        }

        .action-box {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            height: 100upx;
            position: relative;
            padding-right: 30upx;
        }

        .action-btn {
            width: 160upx;
            height: 60upx;
            margin: 0;
            margin-left: 24upx;
            padding: 0;
            text-align: center;
            line-height: 60upx;
            font-size: $font-sm + 2upx;
            color: $font-color-dark;
            background: #fff;
            border-radius: 100px;

            &:after {
                border-radius: 100px;
            }

            &.recom {
                background: #fff9f9;
                color: $base-color;

                &:after {
                    border-color: #f7bcc8;
                }
            }
        }
    }


    /* load-more */
    .uni-load-more {
        display: flex;
        flex-direction: row;
        height: 80upx;
        align-items: center;
        justify-content: center
    }

    .uni-load-more__text {
        font-size: 28upx;
        color: #999
    }

    .uni-load-more__img {
        height: 24px;
        width: 24px;
        margin-right: 10px
    }

    .uni-load-more__img > view {
        position: absolute
    }

    .uni-load-more__img > view view {
        width: 6px;
        height: 2px;
        border-top-left-radius: 1px;
        border-bottom-left-radius: 1px;
        background: #999;
        position: absolute;
        opacity: .2;
        transform-origin: 50%;
        animation: load 1.56s ease infinite
    }

    .uni-load-more__img > view view:nth-child(1) {
        transform: rotate(90deg);
        top: 2px;
        left: 9px
    }

    .uni-load-more__img > view view:nth-child(2) {
        transform: rotate(180deg);
        top: 11px;
        right: 0
    }

    .uni-load-more__img > view view:nth-child(3) {
        transform: rotate(270deg);
        bottom: 2px;
        left: 9px
    }

    .uni-load-more__img > view view:nth-child(4) {
        top: 11px;
        left: 0
    }

    .load1,
    .load2,
    .load3 {
        height: 24px;
        width: 24px
    }

    .load2 {
        transform: rotate(30deg)
    }

    .load3 {
        transform: rotate(60deg)
    }

    .load1 view:nth-child(1) {
        animation-delay: 0s
    }

    .load2 view:nth-child(1) {
        animation-delay: .13s
    }

    .load3 view:nth-child(1) {
        animation-delay: .26s
    }

    .load1 view:nth-child(2) {
        animation-delay: .39s
    }

    .load2 view:nth-child(2) {
        animation-delay: .52s
    }

    .load3 view:nth-child(2) {
        animation-delay: .65s
    }

    .load1 view:nth-child(3) {
        animation-delay: .78s
    }

    .load2 view:nth-child(3) {
        animation-delay: .91s
    }

    .load3 view:nth-child(3) {
        animation-delay: 1.04s
    }

    .load1 view:nth-child(4) {
        animation-delay: 1.17s
    }

    .load2 view:nth-child(4) {
        animation-delay: 1.3s
    }

    .load3 view:nth-child(4) {
        animation-delay: 1.43s
    }

    @-webkit-keyframes load {
        0% {
            opacity: 1
        }

        100% {
            opacity: .2
        }
    }
</style>
