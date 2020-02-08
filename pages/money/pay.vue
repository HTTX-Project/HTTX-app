<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{orderInfo.count}}</text>
		</view>

		<view class="pay-type-list">

			<view class="type-item b-b" @click="changePayType(1)" v-if="orderInfo.payStu == 1">
				<text class="icon yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 1' />
					</radio>
				</label>
			</view>
<!--			<view class="type-item b-b" @click="changePayType(2)">-->
<!--				<text class="icon yticon icon-alipay"></text>-->
<!--				<view class="con">-->
<!--					<text class="tit">支付宝支付</text>-->
<!--				</view>-->
<!--				<label class="radio">-->
<!--					<radio value="" color="#fa436a" :checked='payType == 2' />-->
<!--					</radio>-->
<!--				</label>-->
<!--			</view>-->
			<view class="type-item" @click="changePayType(2)" v-if="orderInfo.payStu == 2">
				<text class="icon yticon icon-erjiye-yucunkuan"></text>
				<view class="con">
					<text class="tit">奖金积分支付</text>
					<text>可用奖金积分 {{user.JJB}}</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 2' />
					</radio>
				</label>
			</view>
			<view class="type-item" @click="changePayType(3)" v-if="orderInfo.payStu == 3">
				<text class="icon yticon icon-erjiye-yucunkuan"></text>
				<view class="con">
					<text class="tit">积分奖金混合支付</text>
					<text>可用购物积分 {{user.GWB}}</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 3' />
					</radio>
				</label>
			</view>
		</view>

		<text class="mix-btn" @click="confirm">确认支付</text>
	</view>
</template>

<script>
import http from '@/utils/request.js'
// import util from '@/utils/utils'
	export default {
		data() {
			return {
				payType: 1,
				orderInfo: {},
				user: null,
				url: ''
			};
		},
		computed: {

		},
		onLoad(options) {
			this.orderInfo = {
				addressId: options.addressId,
				count: options.count,
				orderCode: options.orderCode,
				payStu: options.status
			}
			this.payType = parseInt(options.status)
		},
		onShow() {
			const self = this
			// console.log(self.)
			this.user = this.$store.state.userInfo
			this.url = this.$store.state.imgUrl
			// if (!this.$store.state.hasLogin){
			// 	self.navTo('login','')
			// 	return false
			// }
		},
		methods: {
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			//确认支付
			confirm: function() {
				uni.showLoading({
					mask: true
				})
				if (this.orderInfo.payStu == '1'){
					// 在线支付
					this.onLinePay()
				}else{
					// 线上支付
					this.orderPay()
				}
			},
			onLinePay(){
				console.log('在线支付')
			},
			orderPay(){
				const self = this
				http.get(`/orderImpl/orderPay?USER_ID=${self.user.USER_ID}&ORDER_CODE=${self.orderInfo.orderCode}&PAY_TYPE=${self.orderInfo.status}`,{}).then(res => {
					uni.redirectTo({
						url: '/pages/money/paySuccess'
					})
				}).catch(err => {
					console.log('订单支付失败',err);
				}).finally(() => {
					uni.hideLoading({})
				})
			}
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}
	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price{
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;
			&:before{
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;

		.type-item{
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position:relative;
		}

		.icon{
			width: 100upx;
			font-size: 52upx;
		}
		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}
		.icon-weixinzhifu {
			color: #36cb59;
		}
		.icon-alipay {
			color: #01aaef;
		}
		.tit{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}
		.con{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

</style>
