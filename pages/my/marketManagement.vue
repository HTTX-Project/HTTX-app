<template>
    <view style="background-color: #F2F6FC;">
        <view class="content mm-content">
            <view class="text-center empty" v-if="!list.length">
                <image mode="aspectFit" src="/static/tdlist.png"></image>
                <view class="ft16 text-notice">
                    暂无信息
                </view>
            </view>
            <view :key="index" class="cart-item" v-else v-for="(item,index) in list">
                <view class="cart-img">
                    <image class="portrait mm-img" src="/static/missing-face.png"></image>
                    <view class="shop-yes shop-no" v-if="item.STATE == 0">已激活</view>
                    <view class="shop-no" v-else>未激活</view>
                </view>
                <view class="cart-main">
                    <view class="mm-name">{{item.NAME}}</view>
                    <view class="mm-phone">电话：{{item.PHONE}}</view>
                    <view class="mm-phone">业务合计：{{item.ALL_SALE || 0}}</view>
                    <view class="mm-star">{{item.LEVEL}}星会员</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import http from '@/utils/request.js'

export default {
  name: "marketManagement",
  data() {
    return {
      user: null,
      url: '',
      list: []
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
      http.get(`/userImpl/childUser?USER_ID=${self.user.USER_ID}&LEVEL=&keywords=`, []).then((res) => {
        // self.obj = res.data.salepd
        self.list = res.data.childList
      }).catch(error => {
        console.log('市场管理', error)
      }).finally(() => {
        uni.hideLoading({})
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import url("../../static/css/common.css");
    .empty {
        width: 100%;
        height: 45vh;
        padding-bottom: 100upx;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        background: #fff;

        image {
            width: 240upx;
            height: 160upx;
            margin-bottom: 30upx;
        }

        .empty-tips {
            display: flex;
            font-size: $font-sm+2upx;
            color: $font-color-disabled;

            .navigator {
                color: $uni-color-primary;
                margin-left: 16upx;
            }
        }
        .text-notice{
            color: #666;
        }
    }

    .mm-content {
        padding-top: 40upx;
        height: calc(100vh - 44upx);
    }

    .cart-item {
        display: flex;
        flex-flow: row;
        justify-content: space-around;
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
        padding: 40upx 0;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        /*position: relative;*/
        z-index: 1;
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
        margin-top: -20upx;
        /*width: 65%;*/
        /*padding-left: 180upx;*/
        height: 200upx;
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
        margin-top: 20upx !important;
    }

    .cart-main view {
        font-size: 26upx;
        color: #333;
        margin: 0 10upx;
    }
</style>
