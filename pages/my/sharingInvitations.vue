<template>
    <view>
    <view class="qr_box">
        <image class="qr_logo" src="/static/temp/logo.png"></image>
    </view>
    <text class="qr_text">邀请新人请扫描下方二维码</text>
    <view class="qr_box">
        <view class="qr_qr">
            <image class="qr_img" :src="url+''+img" />
        </view>
    </view>
    </view>
</template>

<script>
import http from '@/utils/request.js'
export default {
  name: "sharingInvitations",
  data() {
    return {
      user: null,
      url: '',
      img: ''
    }
  },
  onLoad() {
    this.user = this.$store.state.userInfo
    this.url = this.$store.state.imgUrl
    // this.getData()
    if (this.user.STATE == 1){
      this.$api.msg('免费会员不能分享')
    }else{
      uni.showLoading({
        mask: true
      })
      this.getData()
    }
  },
  methods:{
    getData(){
      const self = this
      if(self.user.QR_CODE){
        self.img = self.user.QR_CODE
      }else{
        http.get(`/wxSmallImpl/getQrCode?userId=${self.user.USER_ID}`).then(res =>{
          self.img = res.data.qrCodeUrl
        }).catch(err => {
          console.log('获取二维码',err)
        }).finally(() => {
          uni.hideLoading({})
        })
      }
    }
  }
}
</script>

<style scoped>
    /* pages/QrCard/QrCard.wxss */
    .header-container {
        background-color: #fff;
        height: 180upx;
    }
    .header-name{
        line-height: 270upx;
    }
    .header-container .goback{
        margin-top: 90upx !important;
    }

    .qr_box {
        display: flex;
        justify-content: center;
        margin-top: 20%;
    }
    .qr_logo {
        margin-top: 80upx;
        margin-bottom: 80upx;
        width: 170upx;
        height: 170upx;
    }
    .qr_text {
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: 32upx;
    }
    .qr_qr {
        display: block;
        /*background-color: #80848f;*/
        width: 400upx;
        height: 400upx;
        margin: 0 auto;
        margin-top: 30upx;
    }
    .qr_img{
        width: 400upx;
        height: 400upx;
    }
    .person_id {
        text-align: center;
        margin-top: 10upx;
    }
    .person_id_text,.person_id {
        color: #999999;
        font-size: 30upx;
    }

</style>
