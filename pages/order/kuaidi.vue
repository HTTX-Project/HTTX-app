<template>
    <view class="container">
        <view class="top-sec">
            <view class="logo">
                <image :src="ems.logo"></image>
            </view>
            <view class="a-row">
                <view class="label">物流公司</view>
                <view class="text">{{ems.expName}}</view>
            </view>
            <view class="a-row">
                <view class="label">物流客服电话</view>
                <view class="text">{{ems.expPhone}}</view>
            </view>
            <view class="a-row">
                <view class="label">物流单号</view>
                <view class="text">{{ems.number}}</view>
            </view>
        </view>
        <view class="sec-wrap">
            <view class="details-info">
                <ul>
                    <li class="a-row" v-for="(item,index) in ems.list" :key="index">
                        <view class="info">
                            <view class="date-box">{{item.status}}</view>
                            <view class="text">{{item.time}}</view>
                        </view>
                    </li>
                </ul>
            </view>
        </view>
    </view>

</template>

<script>
import http from '@/utils/request.js'

export default {
  data() {
    return {
      user: null,
      url: '',
      list: [],
      ems: null
    }
  },
  onLoad(options) {
    this.user = this.$store.state.userInfo
    this.url = this.$store.state.imgUrl
    this.getData(options)
  },
  methods:{
    getData(){
      const self = this
      uni.showLoading({
        mask: true
      })
      http.get(`/orderImpl/orderEMS?EMS_CODE=295033352614`).then(res =>{
        self.ems = res.data.resultJson.result
      }).catch(err => {
        console.log('升级记录报错',err)
      }).finally(() => {
        uni.hideLoading({})
      })
    }
  }
}
</script>

<style lang="scss">
    /*@import url("../../static/css/common.css");*/
    .logo{
        position: absolute;
        right: 5%;
        top: 20%;
        width: 120upx;
        height: 120upx;
    }
    .logo image{
        width: 120upx;
        height: 120upx;
    }
    .top-sec{
        position: relative;
    }
    .empty {
        /*position: fixed;*/
        /*left: 0;*/
        /*top: 0;*/
        width: 100%;
        height: 45vh;
        padding-bottom: 100upx;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        background: #fff;

        image {
            width: 240upx;
            height: 160upx;
            margin-bottom: 30upx;
        }

        .empty-tips {
            display: flex;
            font-size: $font-sm+2upx;
            color: $font-color-disabled;

            .navigator {
                color: $uni-color-primary;
                margin-left: 16upx;
            }
        }
    }
    .container {
        width: 100%;
        height: 100%;
        /*margin-top: 130upx;*/
    }

    .header-container {
        background-color: #fff;
    }

    .iphone {
        margin-top: 180upx;
    }

    page {
        background-color: #f2f2f2;
    }

    .top-sec {
        background-color: #fff;
        width: 100%;
        margin-top: 20upx;
        box-sizing: border-box;
        padding: 24upx 30upx;
        border-top: 2upx solid #f5f5f5;
    }

    .top-sec .a-row {
        display: flex;
        font-size: 28upx;
        line-height: 54upx;
    }

    .top-sec .a-row .label {
        color: #999;
        margin-right: 28upx;
    }

    .sec-wrap {
        width: 100%;
        background-color: #fff;
        padding-top: 10upx;
        margin-top: 10upx;
    }

    .details-info {
        position: relative;
        width: 100%;
        margin-top: 20upx;
        overflow: hidden;
    }
    .details-info ul{
        margin: 0;
        padding: 0;
    }
    .details-info .a-row {
        display: flex;
        position: relative;
        z-index: 4;
        width: 93%;
        margin: 0 auto;
        margin-bottom: 14upx;
        border-bottom: 2upx dashed #f5f5f5;
        padding-bottom: 10upx;
    }

    .details-info .a-row .info {
        font-size: 28upx;
        display: flex;
    }

    .date-box {
        font-size: 26upx;
        color: #333;
        margin-bottom: 20upx;
        width: 530upx;
    }

    .info .text {
        color: #999;
        width: 25%;
        text-align: right;
        font-size: 22upx;
    }

    .dot {
        width: 30upx;
        height: 30upx;
        margin-right: 30upx;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
    }

    .default-dot {
        background: #ddd;
        width: 14upx;
        height: 14upx;
        border-radius: 100%;
    }

    .active-dot {
        border: 2upx solid #e64340;
        width: 26upx;
        height: 26upx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
    }

    .active-dot .yuan-red {
        background: #e64340;
        width: 14upx;
        height: 14upx;
        border-radius: 50%;
    }

    .none {
        text-align: center;
        padding-top: 100upx;
        padding-bottom: 120upx;
        font-size: 30upx;
        color: #333;
    }

</style>
