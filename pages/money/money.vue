<template>
    <view class="content b-t">
        <view>
            <view class="integral-top">
                <view class="integral-header plr30">
                    <view class="pt40 text-center ft36 text-w ftw600">{{user.JJB || 0}}</view>
                    <view class="text-center opacity8 ft14 text-w mt20">当前奖金积分</view>
                </view>
                <view class="integral-header integral-header-r plr30">
                    <view class="pt40 text-center ft36 text-w ftw600">{{user.GWB || 0}}</view>
                    <view class="text-center opacity8 ft14 text-w mt20">当前购物积分</view>
                </view>
                <view @click="showAlert = true" class="wh iconfont iconbtn_question ft24 text-w"></view>
            </view>
            <view class="">
<!--                <navigator @click="goToNavBat('recharge')" class='con-item'>-->
<!--                    <view class="btn btn-money flex alcenter ft18 text-w ftw600">-->
<!--                        <image src="../../static/temp/mycz.png"></image>-->
<!--                        充值-->
<!--                    </view>-->
<!--                    <view class="icon">-->
<!--                    </view>-->
<!--                </navigator>-->
                <navigator @click="goToNavBat('withdraw')" class='con-item'>
                    <view class="btn btn-withdraw bg-w flex alcenter ft18 text-main ftw600">
                        <image src="../../static/temp/mytx.png"></image>
                        提现
                    </view>
                    <view class="icon">
                    </view>
                </navigator>
                <navigator @click="goToNavBat('accounts')" class='con-item'>
                    <view class="btn btn-zz bg-w flex alcenter ft18 text-main ftw600">
                        <image src="../../static/temp/myzz.png"></image>
                        转账
                    </view>
                    <view class="icon">
                    </view>
                </navigator>
            </view>
        </view>
    </view>
</template>

<script>

export default {
  data() {
    return {
      isEmpty: false,
      user: null,
      url: ''
    }
  },
  onLoad() {
    this.user = this.$store.state.userInfo
    this.url = this.$store.state.imgUrl
  },
  methods: {
    goToNavBat(key) {
      this.$mRouter.push({
        route: this.$mRouterConfig[key]
      })
    }
  }
}
</script>

<style>
    @import url("../../static/css/common.css");

    .btn {
        width: 100%;
        /*display: block;*/
        height: 110upx;
        line-height: 110upx;
        /*background:#FF6D00;*/
        /*box-shadow:0rpx 8rpx 32rpx 0rpx rgba(255,109,0,0.3);*/
        /*border-radius:48rpx;*/
        color: #333;
        background: #fff;
        text-align: left !important;
        padding: 0 5%;
        font-size: 31upx;
        font-style: normal;
        font-weight: normal;
        border-bottom: 1px solid #eee;
        /*align-items: normal !important;*/
        /*margin: 0 auto;*/
    }

    .con-item {
        position: relative;
    }

    .btn image {
        width: 55upx;
        height: 55upx;
        margin-right: 20upx;
    }

    .icon::after {
        content: " ";
        display: inline-block;
        width: 6px;
        height: 6px;
        position: absolute;
        top: 50%;
        right: 35upx;
        border-width: 2px 2px 0 0;
        border-color: #dddee1;
        border-style: solid;
        transform: translateY(-50%) matrix(.71, .71, -.71, .71, 0, 0);
    }

    .integral-top .wh {
        position: absolute;
        right: 30upx;
        top: 40upx;
        z-index: 3;
    }

    .integral-top {
        height: 360upx;
        width: 100%;
        position: relative;
        z-index: 1;
        overflow: hidden;
    }

    .integral-top::after {
        content: "";
        width: 160%;
        height: 400upx;
        position: absolute;
        left: -30%;
        top: 0;
        z-index: 1;
        /*border-radius: 0 0 50% 50%;*/
        background: linear-gradient(135deg, rgba(255, 164, 75, 1) 0%, rgba(251, 74, 134, 1) 100%);
        box-shadow: 0upx 12upx 12upx -4upx rgba(252, 114, 107, 0.2);
    }

    .integral-header {
        position: absolute;
        width: 50%;
        left: 0;
        top: 15%;
        z-index: 2;
    }

    .integral-header-r {
        left: 50% !important;
    }
</style>
