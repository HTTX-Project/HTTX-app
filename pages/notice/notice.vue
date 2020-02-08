<template>
	<view>
		<view class="notice-item" v-for="(item,index) in list" :key="index">
			<text class="time">{{item.INSERT_DATE}}</text>
			<view class="content">
				<text class="title">{{item.TITLE || ''}}</text>
				<view class="img-wrapper">
					<image class="pic" :src="url+''+item.PATH"></image>
				</view>
				<text class="introduce">
					{{item.CONTENT || ''}}
				</text>
				<view class="bot b-t" @click="goDetail(item)">
					<text>查看详情</text>
					<text class="more-icon yticon icon-you"></text>
				</view>
			</view>
		</view>
		<!-- <view class="notice-item">
			<text class="time">昨天 12:30</text>
			<view class="content">
				<text class="title">新品上市，全场满199减50</text>
				<view class="img-wrapper">
					<image class="pic" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3761064275,227090144&fm=26&gp=0.jpg"></image>
					<view class="cover">
						活动结束
					</view>
				</view>
				<view class="bot b-t">
					<text>查看详情</text>
					<text class="more-icon yticon icon-you"></text>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
import http from '@/utils/request.js'
	export default {
		data() {
			return {
				user: null,
				url: '',
				list: []
			}
		},
		onLoad(){
			uni.showLoading({
				mask: true
			})
			 this.user = this.$store.state.userInfo
             this.url = this.$store.state.imgUrl
			 this.getData()
		},
		methods: {
			async getData(){
				const res = await http.get('/noticeImpl/noticeList')
				console.log('notice',res.data.noticeList)
				this.list = res.data.noticeList
				uni.hideLoading()
			},
			goDetail(e){
				this.$mRouter.push({
					route: this.$mRouterConfig.noticeDetail,
					query: {
						id:e.USER_ID
					}
				})
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background-color: #f7f7f7;
		padding-bottom: 30upx;
	}

	.notice-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.time {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80upx;
		padding-top: 10upx;
		font-size: 26upx;
		color: #7d7d7d;
	}

	.content {
		width: 710upx;
		padding: 0 24upx;
		background-color: #fff;
		border-radius: 4upx;
	}

	.title {
		display: flex;
		align-items: center;
		height: 90upx;
		font-size: 32upx;
		color: #303133;
	}

	.img-wrapper {
		width: 100%;
		height: 260upx;
		position: relative;
	}

	.pic {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 6upx;
	}

	.cover {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		font-size: 36upx;
		color: #fff;
	}

	.introduce {
		display: inline-block;
		padding: 16upx 0;
		font-size: 28upx;
		color: #606266;
		line-height: 38upx;
	}

	.bot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80upx;
		font-size: 24upx;
		color: #707070;
		position: relative;
	}

	.more-icon {
		font-size: 32upx;
	}
</style>
