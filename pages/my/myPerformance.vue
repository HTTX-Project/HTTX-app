<template>
    <view style="background-color: #F2F6FC;">
        <view class="content mm-content">
            <view class="cart-item">
                <view class="cart-item-t">个人业绩合计：{{obj.SELF_SALE || 0}}</view>
                <view class="cart-item-t">市场业绩合计：{{obj.ALL_SALE || 0}}</view>
                <!--                <view class="cart-img">-->
                <!--                    <image src="/static/missing-face.png" class="portrait mm-img"></image>-->
                <!--                    <view class="shop-no">未购物</view>-->
                <!--                </view>-->
                <!--                <view class="cart-main">-->
                <!--                    <view class="mm-name">何少爷</view>-->
                <!--                    <view class="mm-phone">15524444266</view>-->
                <!--                    <view class="mm-star">一星会员</view>-->
                <!--                </view>-->
            </view>
        </view>
    </view>
</template>

<script>
import http from '@/utils/request.js'

export default {
  name: "myPerformance",
  data() {
    return {
      user: null,
      url: '',
      obj: {
        SELF_SALE: 0,
        ALL_SALE: 0
      }
    }
  },
  onLoad() {
    this.user = this.$store.state.userInfo
    this.url = this.$store.state.imgUrl
    this.getData()
  },
  methods: {
    getData() {
      const self = this
      uni.showLoading({
        mask: true
      });
      http.get(`/userImpl/vipSale?USER_ID=${self.user.USER_ID}`, []).then((res) => {
        self.obj = res.data.salepd
      }).catch(error => {
        console.log('业绩统计查询', error)
      }).finally(() => {
        uni.hideLoading({})
      })
    }
  }
}
</script>

<style scoped>
    .mm-content {
        padding-top: 40upx;
        height: calc(100vh - 44upx);
    }

    .cart-item {
        /*display: flex;*/
        /*flex-flow: row;*/
        /*justify-content: space-around;*/
        /*display: block;*/
        margin: 0 30upx 40upx;
        font-size: 26upx;
        overflow: hidden;
        /*position: relative;*/
        background-color: #ffffff;
        box-shadow: 0 5upx 20upx 0 rgba(0, 0, 0, .10);
        /*border: 1px solid #dddee1;*/
        border-radius: 16upx;
        /*height: 160upx;*/
        padding: 30upx 35upx;
        /*display: -webkit-box;*/
        /*display: -webkit-flex;*/
        /*display: flex;*/
        /*-webkit-box-align: center;*/
        /*-webkit-align-items: center;*/
        /*align-items: center;*/
        /*position: relative;*/
        z-index: 1;
    }

    .cart-item-t {
        width: 100%;
        height: 60upx;
        line-height: 60upx;
    }

    .cart-img {
        float: left;
        /*width: 100%;*/
        /*height: 100%;*/
        /*margin-left: 30upx;*/
        vertical-align: middle;
    }

    .shop-no {
        font-size: 24upx;
        text-align: center;
        line-height: 24upx;
        margin-top: 14upx;
        color: #C0C4CC;
    }

    .shop-yes {
        color: #67C23A;
    }

    .cart-img image {
        width: 130upx;
        height: 130upx;
        vertical-align: middle;
    }

    .mm-img {
        border-radius: 20upx !important;
        background-color: #888;
    }

    .cart-main {
        float: left;
        /*width: 65%;*/
        /*padding-left: 180upx;*/
        height: 170upx;
    }

    .mm-name {
        font-size: 35upx !important;
        font-weight: bold !important;
        color: #303133 !important;
        margin-top: 14upx !important;
        margin-bottom: 8upx;
    }

    .mm-phone {
        color: #909399 !important;
        font-size: 28upx !important;
        line-height: 27upx !important;
        margin-top: 8upx !important;
    }

    .mm-star {
        font-size: 20upx !important;
        line-height: 20upx !important;
        color: #409EFF !important;
        background-color: rgb(236, 245, 255) !important;
        border-radius: 20upx !important;
        padding: 10upx 20upx !important;
        width: 140upx !important;
        text-align: center !important;
        margin-top: 32upx !important;
    }

    .cart-main view {
        font-size: 26upx;
        color: #333;
        margin: 0 10upx;
    }
</style>
