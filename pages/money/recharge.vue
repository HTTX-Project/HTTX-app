<template>
    <view class="bg-w" style="height: 100vh;">
        <view class="integral-top">
            <view class="integral-header">
                <view class="pt40 text-center ft36 text-w ftw600">2000</view>
                <view class="text-center opacity8 ft14 text-w mt20">当前奖金积分</view>
            </view>
            <view class="integral-header integral-header-r plr30">
                <view class="pt40 text-center ft36 text-w ftw600">2000</view>
                <view class="text-center opacity8 ft14 text-w mt20">当前购物积分</view>
            </view>
        </view>
        <view class="pt30">
            <view class="mt10 bg-w bdr16 box-shadow pd40 ">
                <view class="ft16 text-info">选择充值金额</view>
                <view class="flex wrap mt20">
                    <view :class="selectIndex == index ? 'on' : ''" :data-index="index" :key="index" @click="select"
                          class="tag-money mr20 mb20 flex center alcenter" v-for="(item,index) in  moneys">
                        {{item.label}}
                    </view>
                </view>
            </view>

            <view class="mt40 bg-w bdr16 box-shadow pd40">
                <view class="ft16 text-info">充值金额</view>
                <view class="flex alcenter mt30">
                    <text class="ft32 ftw600">￥</text>
                    <input class="ft32 ftw600 pl10" style="height: 80rpx;" type="text" v-model="money"/>
                </view>
            </view>

            <view class="mt40">
                <button class="btn-main text-w ftw600">确认充值</button>
            </view>
        </view>
    </view>
</template>

<script>
export default {
  data() {
    return {
      selectIndex: 0,
      money: 500,
      moneys: [
        { label: '500元', money: 500 },
        { label: '300元', money: 300 },
        { label: '200元', money: 200 },
        { label: '100元', money: 100 },
        { label: '50元', money: 50 },
        { label: '20元', money: 20 },
      ]
    }
  }, methods: {
    select(e) {
      let index = parseInt(e.currentTarget.dataset.index);
      this.selectIndex = index;
      this.money = this.moneys[index].money;
    }
  }
}
</script>

<style>
    @import url("../../static/css/common.css");

    .money-icon {
        width: 80rpx;
        height: 80rpx;
    }

    .pt30 {
        padding: 30upx;
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
</style>
