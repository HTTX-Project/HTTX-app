<template>
	<view class="list-con">
    <view class="list-con-title">{{noticeInfo.TITLE}}</view>
    <view class="list-con-date">{{noticeInfo.INSERT_DATE}}</view>
	<view class="list-con-date ss-con">{{noticeInfo.CONTENT}}</view>
    <image class="img" mode="widthFix" :src="url+''+noticeInfo.PATH"/>
</view>

</template>

<script>
import http from '@/utils/request.js'
	export default {
		data() {
			return {
				user: null,
				url: '',
				noticeInfo: null
			}
		},
		onLoad(o){
			uni.showLoading({
				mask: true
			})
			this.url = this.$store.state.imgUrl
			debugger
			this.getData(o.id)
		},
		methods: {
			async getData(id){
				const res = await http.get(`/noticeImpl/noticeInfo?USER_ID=${id}`)
				console.log('notice',res.data.noticeInfo)
				this.noticeInfo = res.data.noticeInfo
				uni.hideLoading()
			}
		}
	}
</script>

<style lang='scss'>
	/* pages/bulletinDetails/index.wxss */
.list-con{
    width: 95%;
    margin: 0 auto;
    margin-top: 45upx;
}
.list-con-title{
    font-weight: bold;
    font-size: 38upx;
    margin: 20rpx 0;
}
.list-con-date{
    font-size: 28upx;
    color: #999;
    margin-bottom: 20upx;
}
.list-con-main{
    color: #333;
    font-size: 30upx;
    line-height: 45upx;
}
.img{
    display: inline-block;
    width: 100%;
}
.ss-con{
	display: inline-block;
	padding: 0 3%;
	box-sizing: border-box;
	margin-top: 6%;
	line-height: 35upx;
	font-size: 32uox;
	color: #333;
	text-indent: 10upx;
}

</style>
