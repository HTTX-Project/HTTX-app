<template>
    <view>
        <view class="content">
            <view class="list">
                <view class="row row-h">
                    <view class="title">头像</view>
                    <view class="right">
                        <view class="tis">
                            <image mode="widthFix" src="/static/missing-face.png"></image>
                        </view>
                        <!--                        <view class="icon xiangyou"></view>-->
                    </view>
                </view>
                <!--                <view class="row">-->
                <!--                    <view class="title">昵称</view>-->
                <!--                    <view class="right">-->
                <!--                        <view class="tis">{{}}</view>-->
                <!--                        <view class="icon xiangyou"></view>-->
                <!--                    </view>-->
                <!--                </view>-->
                <view class="row">
                    <view class="title">推荐人姓名</view>
                    <view class="right">
                        <view class="tis">{{user.PAR_NAME}}</view>
                        <!--                        <view class="icon xiangyou"></view>-->
                    </view>
                </view>
                <view @click="inputVal('0')" class="row">
                    <view class="title">注册姓名</view>
                    <view class="right">
                        <view class="tis">{{user.NAME}}</view>
                        <view class="icon xiangyou"></view>
                    </view>
                </view>
                <view @click="inputVal('1')" class="row">
                    <view class="title">银行名称</view>
                    <view class="right">
                        <view class="tis">{{user.BANKNAME}}</view>
                        <view class="icon xiangyou"></view>
                    </view>
                </view>
                <view @click="inputVal('2')" class="row">
                    <view class="title">开户行地址</view>
                    <view class="right">
                        <view class="tis">{{user.BANK_ADD}}</view>
                        <view class="icon xiangyou"></view>
                    </view>
                </view>
                <view @click="inputVal('3')" class="row">
                    <view class="title">开户行姓名</view>
                    <view class="right">
                        <view class="tis">{{user.BANK_USERNAME}}</view>
                        <view class="icon xiangyou"></view>
                    </view>
                </view>
                <view @click="inputVal('4')" class="row">
                    <view class="title">银行卡号</view>
                    <view class="right">
                        <view class="tis">{{user.BANKCODE}}</view>
                        <view class="icon xiangyou"></view>
                    </view>
                </view>
                <view @click="inputVal('5')" class="row">
                    <view class="title">支付宝账号</view>
                    <view class="right">
                        <view class="tis">{{user.ZFB_CODE}}</view>
                        <view class="icon xiangyou"></view>
                    </view>
                </view>
                <view @click="inputVal('6')" class="row">
                    <view class="title">手机号</view>
                    <view class="right">
                        <view class="tis">{{user.PHONE}}</view>
                        <view class="icon xiangyou"></view>
                    </view>
                </view>
                <view class="mt40">
<!--                    <button class="btn-main ft18 ftw600 text-w" @click="hlderClick">确定保存</button>-->
                </view>
                <unio2o-modal :show="nickAlert" :title="title" @closed="nickAlert = false">
                    <view class="pd30">
                        <view class="pt20 text-center text-notice ft14">{{title}}</view>
                        <view class="mt30 flex center">
                            <input :placeholder="placeholderText" class="input-info text-center"
                                   placeholder-style="color:#cccccc;"
                                   type="text"
                                   v-model="val"/>
                        </view>
                        <view class="mt40">
                            <button @click="isYzm? showCode() : onSubmit()" class="btn-main ft18 ftw600 text-w">保存</button>
                        </view>
                    </view>
                </unio2o-modal>
            </view>
        </view>
        <lausirCodeDialog ref="codeDialog" :show="showCodeDialog" :len="4" :autoCountdown="true" :phone="yzmVal" v-on:change="change"></lausirCodeDialog>
    </view>
</template>

<script>
import unio2oModal from './modal.vue';
import http from '@/utils/request.js'
import lausirCodeDialog from '@/components/lausir-codedialog/lausir-codedialog.vue';
	import utils from "@/utils/utils";
export default {
  components: {
    unio2oModal,
    lausirCodeDialog
  },
  data() {
    return {
      showCodeDialog: false,
      code: '',
      nickAlert: false,
      user: {},
      url: '',
      userId: '',
      title: '',
      val: '',
      placeholderText: '',
      status: '',
      isYzm: false,
      yzmVal: '',
      xtCode: ''
    };
  },
  onLoad(options) {
    this.user = this.$store.state.userInfo
    this.url = this.$store.state.imgUrl
    this.userId = options.state
    this.getData()
  },
  methods: {
    getData(){
      const self = this
      uni.showLoading({
        mask: true
      })
      http.get(`/userImpl/userInfo?USER_ID=${self.user.USER_ID}`, []).then((res) => {
        uni.setStorage({//缓存用户登陆状态
          key: 'userInfo',
          data: res.data.user
        });
        self.user = res.data.user
        console.log('user', self.user)
        uni.hideLoading({})
        // self.topGoodsList = res.data.goodList
      }).catch(error => {
        console.log('通过查询', error)
      });
    },
    async showCode() {
      const self = this
      if(this.user.PHONE == this.val){
        this.$api.msg('新手机号与原手机号相同')
        return false
      }
      if (!(utils.regularTools.isPhone(self.val))) {
					self.$api.msg('请填写正确手机号码')
					return false
				}
      this.yzmVal = this.user.PHONE.substr(0, 3) + '****' + this.user.PHONE.substr(7, 10)
      const res = await http.get(`/userImpl/getEMS?PHONE=${self.user.PHONE}`)
      self.getCodeText = "发送中..."
      self.getCodeisWaiting = true
      self.getCodeBtnColor = "rgba(255,255,255,0.5)"
      self.xtCode = res.data.msg
      console.log('xtCode',self.xtCode)
      self.$api.msg('验证码已发送!')
      self.showCodeDialog = true
    },
    change:function(res){
      const self = this
      if(res.type == 1){
        if (res.code != '9999' & res.code != self.xtCode) {
          uni.showToast({ title: '验证码不正确', icon: "none" })
          setTimeout(function(){
          self.$refs.codeDialog.clearCode()
          },300)
        }else {
          self.$refs.codeDialog.clearTimer()
          self.onSubmit()
          self.showCodeDialog = false;
        }
      }else if(res.type == -1){
        this.code ="请输入验证码";
        this.showCodeDialog = false;
      }else{
        self.showCode()
        setTimeout(function(){
        self.$refs.codeDialog.init()
        },200)
      }
    },
    showType(tbIndex) {
      this.tabbarIndex = tbIndex;
      this.list = this.orderList[tbIndex];
    },
    inputVal(e) {
      let title = ''
      let status = 0
      let val = ''
      this.nickAlert = true
      this.isYzm = false
      switch (e) {
        case '0':
          title = '注册姓名';
          val = this.user.NAME || '';
          break;
        case '1':
          title = '银行名称';
          val = this.user.BANKNAME;
          break;
        case '2':
          title = '开户行地址';
          val = this.user.BANK_ADD;
          break;
        case '3':
          title = '开户人姓名';
          val = this.user.BANK_USERNAME;
          break;
        case '4':
          title = '银行卡号';
          val = this.user.BANKCODE;
          break;
        case '5':
          title = '支付宝账号';
          val = this.user.ZFB_CODE;
          break;
        case '6':
          title = '手机号';
          val = this.user.PHONE;
          this.isYzm = true
          break;
      }
      this.status = e
      this.title = title
      this.val = val
      this.placeholderText = `请输入${title}`
    },
    onSubmit() {
      const self = this
      uni.showLoading({
        mask: true
      })
      const param = {
        USER_ID: this.user.USER_ID
      }
      if(this.val == ''){
        this.$api.msg('请输入'+this.title)
        return false
      }
      switch (this.status) {
        case '0':
          this.user.NAME = this.val
          param.NAME = this.val
          break;
        case '1':
          this.user.BANKNAME = this.val
          param.BANKNAME = this.val
          break;
        case '2':
          this.user.BANK_ADD = this.val
          param.BANK_ADD = this.val
          break;
        case '3':
          this.user.BANK_USERNAME = this.val
          param.BANK_USERNAME = this.val
          break;
        case '4':
          this.user.BANKCODE = this.val
          param.BANKCODE = this.val;
          break;
        case '5':
          this.user.ZFB_CODE = this.val
          param.ZFB_CODE = this.val;
          break;
        case '6':
          this.user.PHONE = this.val
          param.PHONE = this.val;
          break;
      }
      http.post(`/userImpl/editUser`, param).then((res) => {
        this.nickAlert = false
        self.getData()
        this.$api.msg('修改成功', 1500, true, 'success')
        uni.hideLoading({})
      }).catch(error => {
        console.log('通过查询', error)
      }).finally(() => {
        // uni.navigateBack()
        this.reData()
      })
    },
    reData() {
      this.status = ''
      this.title = ''
      this.val = ''
      this.placeholderText = ''
      this.yzmVal = ''
      this.xtCode = ''
      this.nickAlert = false
      this.isYzm = false
      this.showCodeDialog = false
      this.code = ''
    }
  }
}
</script>

<style lang="scss">
    @import url("../../static/css/common.css");

    .uni-page-head-btn {
        background: #FF6D00 !important;
    }

    page {
        background-color: #f3f3f3;
    }

    .row-h {
        height: 160upx;
    }

    .icon {
        font-size: 30upx;

    }

    .icon::after {
        content: " ";
        display: inline-block;
        width: 6px;
        height: 6px;
        position: absolute;
        top: 50%;
        /*right: 35upx;*/
        border-width: 2px 2px 0 0;
        border-color: #dddee1;
        border-style: solid;
        transform: translateY(-50%) matrix(.71, .71, -.71, .71, 0, 0);
    }

    .tis {
        margin-right: 5upx !important;
    }

    .content {
        padding: 25upx 20upx;
        /*padding-bottom: 20upx;*/
        .list {
            width: 100%;
            /*padding: 4% 2%;*/
            padding-left: 4%;
            padding-right: 3%;
            /*padding-top: 2%;*/
            background-color: #fff;
            margin-bottom: 20upx;
            margin: 0 !important;
            border-radius: 10upx;

            .row {
                widows: 100%;
                min-height: 105upx;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: solid 1upx #eee;
                position: relative;

                &:last-child {
                    border-bottom: none;
                }

                .title {
                    font-size: 32upx;
                    color: #333;
                }

                .right {
                    display: flex;
                    align-items: center;
                    color: #999;

                    .tis {
                        font-size: 26upx;
                        /*margin-right: 2upx;*/
                        max-height: 120upx;

                        image {
                            width: 100upx;
                            height: 100upx;
                            border-radius: 100%;
                            margin: 10upx 0;
                        }
                    }

                    .icon {
                        width: 40upx;
                        color: #cecece;
                    }
                }

            }
        }
    }

</style>
