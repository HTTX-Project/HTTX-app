<template>
	<view class="unio2o-tab">
		<view class="flex alcenter">
			<view v-for="(item,index) in  tabs" :key="index" :class="'col'+tabs.length + (index == selectIndex ? ' on' :'')">
				<view :data-index="index" @click="selectAct" class="item text-center ft16 text-main">
					{{item.name}}
				</view>
			</view>
		</view>
		<view :style="getLeft" class="block"></view>
	</view>
</template>

<script>
	export default{
		props:{
			tabs:{
				type:Array,
				default:function(){
					return new Array;
				}
			},
			selectIndex:{
				type:Number,
				default:0,
			}
		},
		computed:{
			getLeft(){
				var len  = this.tabs.length;
				var w = 100/len;
				let l = w / 2 + w * this.selectIndex;
				let myw = uni.upx2px(20);
				return 'left:calc('+l+'% - '+myw+'px)';
			}
		},

		data(){
			return {

			}
		},methods:{
			selectAct(e){
				this.$emit('select',e.currentTarget.dataset.index);
			}
		}
	}
</script>

<style>
	@import url("../../../../static/css/common.css");
	.unio2o-tab{
		position: relative;
		z-index: 2;
		height: 104rpx;
		width: 100%;
	}
	.unio2o-tab .tab-item{
		position: relative;
	}
	.unio2o-tab .item{
		height: 96rpx;
		line-height: 96rpx;
	}
	.unio2o-tab .on .item{
		font-weight: 600;
	}
	.unio2o-tab .block{
		width:40rpx;
		height:8rpx;
		background:#FF6D00;
		border-radius:4rpx;
		position: absolute;
		bottom: 0rpx;
		transition: all .3s;
	}
</style>
