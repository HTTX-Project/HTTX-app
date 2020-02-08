<template>
    <view class="container">
        <view class="nav">

        </view>
        <view class="banner">
            <image src="https://static.hexindai.com/attachment/uploads/homepic/2019/11/11/1573458126_homepic.png"></image>
        </view>
        <view class="main">
            <view class="recommend">
                <view class="re-le">
                    <h3>热门推荐 <i></i></h3>
                </view>
                <view class="pocket-card">
                    <view class="pocket-intro">
                        <h4>2020-01-01新标新标新标</h4>
                        <view class="left">
                            <text class="suz">5.5</text>%
                            <text class="p">本期预售剩余</text>
                        </view>
                        <view class="right">
                            <text class="suz">30</text>天
                            <text class="p">服务期限</text>
                        </view>
                    </view>
                    <view class="pocket-operation">
                        <view class="btn-primary">立即抢购</view>
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
        user: {},
        url: ''
      };
    },

    onLoad() {
      this.user = this.$store.state.userInfo
      this.url = this.$store.state.imgUrl
    },
    methods: {
      getData() {
        // const res = await http.get(``)
      }
    }
  }
</script>

<!--suppress CssInvalidPropertyValue -->
<style lang="scss">
    .nav {
        overflow: hidden;
        height: 75 upx;
        padding: 35 upx 5 upx;
        position: relative;
    }
    .banner{
        width: 92%;
        margin: 4% auto;
        image{
            width: 100%;
            height: 360upx;
        }
    }

    .main {
        .recommend {
            width: 92%;
            margin: 0 auto;
            .re-le {
                position: relative;
                padding-bottom: 5upx;
                h3 {
                    padding: 0;
                    line-height: 80upx;
                    color: #333;
                    font-size: 36upx;
                    height: 80upx;
                    overflow: hidden;
                    margin-bottom: 30upx;
                    i{
                        background: url("/static/icon-fire.png") no-repeat;
                        width: 35upx;
                        height: 40upx;
                        display: inline-block;
                        vertical-align: top;
                        background-size: cover;
                        position: relative;
                        top: 17upx;
                        left: 10upx;
                    }
                }
            }
            .pocket-card{
                width: 100%;
                /*width: 92%;*/
                /*margin: 0 auto;*/
                background-color: #fff;
                box-shadow: 0 0 13upx 0 rgba(0,0,0,0.18);
                border-radius: 5%;
                background: #f5f5f5 !important;
                padding-bottom: 45upx;
                .pocket-intro{
                    padding-left: 30upx;
                    padding-top: 40upx;
                    padding-right: 30upx;
                    overflow: hidden;
                    /*padding-bottom: 40upx;*/
                    h4{
                        padding-left: 7upx;
                        font-size: 34upx;
                        font-weight: bold;
                        margin-bottom: 40upx;
                    }
                    .left{
                        display: inline-block;
                        vertical-align: bottom;
                        width: 48%;
                        font-size: 30upx;
                        color: #E71D36;
                        text-align: center;
                        .suz{
                            font-size: 70upx;
                            font-weight: 600;
                        }
                        .p{
                            display: block;
                            color: #999;
                            font-size: 26upx;
                            letter-spacing: 2upx;
                            padding-top: 5upx;
                        }
                    }
                    .right{
                        display: inline-block;
                        vertical-align: middle;
                        font-size: 32upx;
                        margin-left: 155upx;
                        .suz{
                            color: #333;
                            font-size: 58upx;
                            font-weight: 600;
                        }
                        .p{
                            display: block;
                            color: #999;
                            font-size: 26upx;
                            letter-spacing: 2upx;
                            padding-top: 5upx;
                        }
                    }
                }
                .pocket-operation{
                    padding-top: 10%;
                }
                .btn-primary{
                    width: 65%;
                    text-align: center;
                    margin: 0 auto;
                    height: 75upx;
                    line-height: 75upx;
                    border-radius: 15upx;
                    color: #fff;
                    font-size: 30upx;
                    background: #E71D36;
                    letter-spacing: 2upx;
                }
            }
        }
    }
</style>
