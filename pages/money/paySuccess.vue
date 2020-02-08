<template>
    <view class="content">
        <view class="zfcg-Title">支付成功</view>
        <text class="success-icon yticon icon-xuanzhong2"></text>
        <text class="tit">支付成功</text>

        <view class="btn-group">
            <view class="mix-btn" open-type="redirect" @click="goOrder">查看订单</view>
            <view class="mix-btn hollow" open-type="switchTab" @click="goHome">返回首页</view>
        </view>
    </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    goOrder(){
      uni.reLaunch({
        url: '/pages/order/order?state=1'
      })
    },
    goHome(){
      uni.reLaunch({
        url: '/pages/index/index'
      })
    }
  }
}
</script>

<style lang='scss'>
    .zfcg-Title{
        width: 100%;
        font-size: 32upx;
        color: #fff;
        height: 95upx;
        line-height: 95upx;
        text-align: center;
        /*background: #FF6D00;*/
        /*margin-bottom: 3%;*/
    }
    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .success-icon {
        font-size: 185upx;
        color: #1aad19;
        margin-top: 100upx;
    }

    .tit {
        font-size: 38upx;
        color: #1aad19;
    }

    .btn-group {
        padding-top: 100upx;
    }

    .mix-btn {
        margin-top: 35upx;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 600upx;
        height: 90upx;
        font-size: $font-lg;
        color: #fff;
        background-color: #FF6D00;
        border-radius: 10upx;

        &.hollow {
            background: #fff;
            color: #303133;
            border: 1px solid #ccc;
        }
    }
</style>
