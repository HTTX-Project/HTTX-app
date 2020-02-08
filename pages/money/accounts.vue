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
                <view class="bg-w bdr16 box-shadow pd40">
                    <view class="ft16 text-info">请输入转账人信息</view>
                    <view class="ss mt30" v-if="parStatus">
                        <view class="jet ft16 text-info">姓名</view>
                        <view class="je flex alcenter" style="width: 80%; margin-left: 2%; font-size: 32upx;color: #666;">
                            {{parUserInfo.name || ''}}
                        </view>
                    </view>
                    <view class="ss mt30">
                        <view class="jet ft16 text-info">手机号</view>
                        <view class="je flex alcenter" style="width: 80%; margin-left: 2%;">
                            <input class="pl10" style="width:100%;height: 70rpx; border-bottom: 1px solid #eee;"
                                   type="number"
                                   v-model="phone" @blur="phoneValData"/>
                        </view>
                    </view>
                </view>

                <view class="mt20 bg-w bdr16 box-shadow pd40">
                    <view class="ft16 text-info">请选择转账类型</view>
                    <view class="mt30 uni-list">
                        <radio-group @change="radioChange">
                            <label :key="item.value" class="uni-list-cell uni-list-cell-pd"
                                   v-for="(item, index) in items">
                                <view>
                                    <radio :checked="index === 0" :value="item.value"/>
                                </view>
                                <view class="yt-item-text">{{item.name}}</view>
                            </label>
                        </radio-group>
                    </view>
                </view>

                <view class="mt20 bg-w bdr16 box-shadow pd40">
                    <view class="ft16 text-info">转账金额</view>
                    <view class="flex alcenter mt30">
                        <text class="ft32 ftw600">￥</text>
                        <input class="ft32 ftw600 pl10" style="width:300rpx;height: 80rpx;" type="number"
                               v-model="money"/>
                    </view>
                </view>
<!--                <view class="mt20 flex ft14  text-notice">*提现将扣除0.6%的手续费，最少提现10元；1-7个工作日到您绑定的微信零钱</view>-->

                <view class="mt40">

                    <button @click="onSubmit" class="btn-main text-w ftw600">确认转账</button>

                </view>

            </view>
        </view>
        <view class="jg" v-if="isWithdraw">
            <view class="withdraw-main bg-w">
                <view class="text-center">
                    <text class="success-icon yticon icon-xuanzhong2"></text>
                </view>
                <view class="text-center ft18 text-default ftw600">转账申请成功</view>

                <view class="text-center ft16 text-info mt50">
                    我们会在1个工作日内审核并完成转账
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
import utils from "@/utils/utils"
import http from '@/utils/request.js'
export default {
  data() {
    return {
      money: 0,
      parUserInfo: {
        name: '',
        phone: '',
        id: ''
      },
      user: null,
      url: '',
      parStatus: false,
      isWithdraw: false,
      phone: '',
      current: '1',
      items: [
        {
          value: '1',
          name: '奖金积分转账',
          checked: 'true'
        },
        {
          value: '2',
          name: '购物积分转账'
        }
      ],
    }
  },
  onShow(){
    this.user = this.$store.state.userInfo
    this.url = this.$store.state.imgUrl
  },
  methods: {
    phoneValData(){
      const self = this
      if (!utils.regularTools.isPhone(this.phone)){
        this.$api.msg('手机号输入错误')
        return false
      }
      http.post(`/userImpl/getUserByPhone?PHONE=${self.phone}`, '').then(res => {
        // this.$api.msg('提现成功', 1500, true, 'success')
        self.parUserInfo.id = res.data.user.USER_ID
        self.parUserInfo.name = res.data.user.NAME
        self.parStatus = true
      }).catch(err =>{
        console.log('转账查询err',err)
      }).finally(()=>{
        uni.hideLoading({})
      })
      //
    },
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
    radioChange(evt) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].value === evt.target.value) {
          this.current = ++i;
          console.log(this.current)
          break;
        }
      }
    },
    onSubmit(){
      const self = this
      if (!this.parStatus && !this.parUserInfo.id){
        this.$api.msg('收款人手机号填写错误')
        return false
      }
      if (!utils.regularTools.isNumberString(this.money)){
        this.$api.msg('请正确输入金额')
        return false
      }
      if (this.money <= 0){
        this.$api.msg('转账金额不能为0')
        return false
      }
      if (this.money == ''){
        this.$api.msg('请输入正确金额')
        return false
      }
      uni.showLoading({
        mask: true
      })
      const param = {
        remitterId: self.user.USER_ID,
        payeeId: self.parUserInfo.id,
        oneMoney: parseFloat(self.money),
        MoneyTransferType: self.current
      };
      http.post('/moneyImpl/transfer', param).then(res => {
        self.isWithdraw = true
        // this.$api.msg('转账成功', 1500, true, 'success')
      }).catch(err =>{
        console.log('转账错误',err)
      }).finally(()=>{
        uni.hideLoading({})
      })
    }
  }
}
</script>

<style lang="scss">
    @import url("../../static/css/common.css");

    .withdraw-main {
        padding-top: 80rpx;
    }
    .success-icon {
        font-size: 160upx;
        color: #1aad19;
        margin-top: 100upx;
    }
    .ss {
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: flex-start;
        justify-content: flex-start;
    }

    .jet {
        line-height: 70upx;
        height: 70upx;
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

	.uni-list-cell {
		justify-content: flex-start
	}
	.uni-list {
		background-color: #FFFFFF;
		position: relative;
		width: 100%;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;

		.uni-radio-group, .uni-checkbox-group {
			width: 100%;
			padding-left: 20upx;
		}

		.uni-list-cell {
			position: relative;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-orient: horizontal;
			-webkit-box-direction: normal;
			-webkit-flex-direction: row;
			flex-direction: row;
			-webkit-box-pack: justify;
			-webkit-justify-content: space-between;
			justify-content: space-between;
			-webkit-box-align: center;
			-webkit-align-items: center;
			align-items: center;
			justify-content: flex-start;
			padding: 9px 12px;
		}

		.yt-item-text {
			font-size: 25upx;
			color: #333;
		}
	}
</style>
