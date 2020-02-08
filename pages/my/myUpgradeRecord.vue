<template>
    <view class="bg-w">
        <view class="unio2o-money">
            <view>
                <view class="text-center empty" v-if="!list.length">
                    <image mode="aspectFit" src="/static/jllisticon.png"></image>
                    <view class="ft16 text-notice">
                        暂无升级记录
                    </view>
                </view>
                <view v-else>
                    <view class="list-item pd30" v-for="(item,index) in list" :key="index">
                        <view class="flex space">
                            <view>
                                <view v-if="item.LEVEL == 99" class="ft16 title ft18 text-default">升到电商</view>
                                <view v-else-if="item.LEVEL == 6" class="ft16 title ft18 text-default">升到董事级别</view>
                                <view v-else class="ft16 title ft18 text-default">升到{{item.LEVEL}}星会员</view>
                            </view>
                            <view>
                                <view v-if="item.STATUS == 0" class="ft16 je text-default text-right ftw600">未审核</view>
                                <view v-if="item.STATUS == 1" class="ft16 je text-default text-right ftw600">审核通过</view>
                                <view v-if="item.STATUS == 2" class="ft16 je text-default text-right ftw600">驳回</view>
                            </view>
                        </view>
                        <view class="list-info-money list-infi-money-date">{{item.START_TIME}}</view>
                    </view>
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
      user: null,
      url: '',
      list: []
    }
  },
  onLoad() {
    this.user = this.$store.state.userInfo
    this.url = this.$store.state.imgUrl
    this.getData()
  },
  methods:{
    getData(){
      const self = this
      uni.showLoading({
        mask: true
      })
      http.get(`/userImpl/getUpHistoryList?USER_ID=${self.user.USER_ID}`).then(res =>{
        self.list = res.data.list
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
    @import url("../../static/css/common.css");

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

    .bg-w {
        background: #fff;
    }

    .list-item {
        background: #fff;
    }

    .top-warp {
        /*z-index: 999;*/
        /*position: fixed;*/
        /*top: --window-top;*/
        left: 0;
        width: 100%;
        /*height: 60px;*/
        background-color: #fff;
        /*padding-bottom: 200px;*/
    }

    .je {
        color: #EE7600;
        font-size: 30upx;
        /*font-weight: bold;*/
        font-weight: normal !important;
    }

    .title {
        font-size: 30upx;
        font-weight: normal !important;
    }

    .ft14 {
        font-size: 30upx;
    }

    .love-scroll {
        height: calc(100vh - 100rpx);
    }

    .unio2o-money {
        border: none !important;
    }

    .list-item {
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
    }
</style>
