<template>
	<view v-if="show" class="unio2o-modal">
		<view @click="closed()" class="bg"></view>
		<view class="box bg-w" :class="show == true ? 'animated fast slideInUp' : ''">
			<view class="flex space alcenter pd30">
				<text class="ft16 ftw600 text-default">{{title}}</text>
				<text @click="closed()" class="iconfont iconbtn_close_black"></text>
			</view>
			<view class="line"></view>
			<view>
				<slot />
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			show:{
				type:Boolean,
				default:false
			},
			title:{
				type:String,
				default:''
			}
		},
		data(){
			return {

			}
		},
		methods:{
			closed(){
				this.$emit('closed',true);
			}
		}
	}
</script>

<style>
	@import url("../../static/css/common.css");
	.unio2o-modal .bg{
		position: fixed;
		z-index: 400;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,.3);
	}
	.unio2o-modal .box{
		position: fixed;
		z-index: 401;
		left: 0;
		bottom: 0;
		width: 100%;
		padding-bottom: env(safe-area-inset-bottom);
		border-radius:16rpx 16rpx 0rpx 0rpx;
	}
</style>
