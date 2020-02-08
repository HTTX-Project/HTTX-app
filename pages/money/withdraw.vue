<template>
    <view class="bg-w" style="min-height: 100vh;">
        <view v-if="isWithdraw == false">
            <view class="integral-top">
                <view class="integral-header">
                    <view class="pt40 text-center ft36 text-w ftw600">{{user.JJB || 0}}</view>
                    <view class="text-center opacity8 ft14 text-w mt20">当前奖金积分</view>
                </view>
                <view class="integral-header integral-header-r plr30">
                    <view class="pt40 text-center ft36 text-w ftw600">{{user.GWB || 0}}</view>
                    <view class="text-center opacity8 ft14 text-w mt20">当前购物积分</view>
                </view>
            </view>

            <view class="pd30">
                <view class="mt40 bg-w bdr16 box-shadow pd40">
                    <view class="ft16 text-info">提现额度</view>
                    <view class="flex alcenter mt30">
                        <text class="ft32 ftw600">￥</text>
                        <input class="ft32 ftw600 pl10" style="width:300rpx;height: 80rpx;" type="number"
                               v-model="money"/>
                    </view>
                </view>
                <view class="mt20 flex ft14  text-notice">*提现将扣除0.6%的手续费，最少提现10元；1-7个工作日到您绑定的微信零钱</view>

                <view class="mt40">

                    <button @click="onSubmit()" class="btn-main text-w ftw600">确认提现</button>

                </view>

            </view>
        </view>
        <view class="jg" v-if="isWithdraw">
            <view class="withdraw-main bg-w">
                <view class="text-center">
                    <text class="success-icon yticon icon-xuanzhong2"></text>
                </view>
                <view class="text-center ft18 text-default ftw600">提现申请成功</view>

                <view class="text-center ft16 text-info mt50">
                    我们会在1个工作日内审核并完成提现
                </view>

                <view class="center mt50">
                    <button class="btn-mid" @click="goMyBill">我的账单</button>
                    <button class="btn-mid mt30" @click="goHome">返回首页</button>
                </view>
            </view>
        </view>

    </view>
</template>

<script>
import http from '@/utils/request.js'

export default {
  data() {
    return {
      money: 0,
      isWithdraw: false,
      user: null,
      url: ''
    }
  },
  onLoad() {
    this.user = this.$store.state.userInfo
    this.url = this.$store.state.imgUrl
  },
  methods: {
    goHome() {
      this.$mRouter.reLaunch({
        route: this.$mRouterConfig.index
      })
    },
    goMyBill(){
      this.$mRouter.push({
        route: this.$mRouterConfig.myBill
      })
    },
    onSubmit() {
      // money
      const re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
      if (!re.test(this.money)) {
        this.$api.msg('请正确输入金额')
        return false
      }
      if (this.money <= 0) {
        this.$api.msg('提现金额不能为0')
        return false
      }
      uni.showLoading({
        mask: true
      })
      const param = {
        userId: this.user.USER_ID,
        oneMoney: parseFloat(this.money)
      }
      //
      http.post('/moneyImpl/withdraw', param).then(res => {
        console.log('res',res)
        this.$api.msg('提现成功', 1500, true, 'success')
      }).catch(err =>{
        console.log('提现错误',err)
      }).finally(()=>{
        uni.hideLoading({})
      })
    }
  }
}
</script>

<style>
    @import url("../../static/css/common.css");

    .withdraw-main {
        padding-top: 80rpx;
    }

    .jg {
        width: 100%;
        height: 100%;
        display: block;
        box-sizing: border-box;
    }

    .pd30 {
        padding: 30upx;
    }

    .withdraw-status {
        width: 300rpx;
        height: 300rpx;
    }

    .money-icon {
        width: 80rpx;
        height: 80rpx;
    }

    .tag-money {
        width: 180rpx;
        height: 100rpx;
        background: #FFFFFF;
        border-radius: 50rpx;
        border: 4rpx solid #E6E6E6;
        color: #333333;
        font-size: 32rpx;
        font-weight: 600;
    }

    .tag-money.on {
        border: none;
        background: #FF6D00;
        color: #FFFFFF;
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
    .success-icon {
        font-size: 160upx;
        color: #1aad19;
        margin-top: 100upx;
    }
</style>
