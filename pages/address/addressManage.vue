<template>
    <view class="content">
        <view class="row b-b">
            <text class="tit">联系人</text>
            <input class="input" type="text" v-model="addressData.NAME" placeholder="收货人姓名"
                   placeholder-class="placeholder"/>
        </view>
        <view class="row b-b">
            <text class="tit">手机号</text>
            <input class="input" type="number" v-model="addressData.TEL" placeholder="收货人手机号码"
                   placeholder-class="placeholder"/>
        </view>
        <!--		<view class="row b-b">-->
        <!--			<text class="tit">地址</text>-->
        <!--			<text @click="chooseLocation" class="input">-->
        <!--				{{addressData.addressName}}-->
        <!--			</text>-->
        <!--			<text class="yticon icon-shouhuodizhi"></text>-->
        <!--		</view>-->
        <view class="row b-b">
            <view class="tit">
                选择地区
            </view>
            <view class="input" @tap="chooseCity">
                <span v-if="region.cityCode == ''" style="color: #999;">{{region.label}}</span>
                <span v-else>{{region.label}}</span>
            </view>
        </view>
        <view class="row b-b">
            <text class="tit">详细地址</text>
            <input class="input" type="text" v-model="addressData.ADDRESS" placeholder="街道门牌信息"
                   placeholder-class="placeholder"/>
        </view>

        <view class="row default-row">
            <text class="tit">设为默认</text>
            <switch :checked="addressData.IS_USE" color="#fa436a" @change="switchChange"/>
        </view>

        <button class="add-btn" @click="confirm">提交</button>
        <button v-if="manageType == 'edit'" class="add-btn del-btn" @click="removeAdd">删除地址</button>
        <mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue"
                           @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
    </view>
</template>

<script>
import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
import http from '@/utils/request.js'

export default {
  components: {
    mpvueCityPicker
  },
  data() {
    return {
      cityPickerValue: [0, 0, 1],
      themeColor: '#007AFF',
      region: { label: "请点击选择地址", value: [], cityCode: "" },
      addressData: {
        VIP_ID: '',
        ADDRESS: '',
        PROVINCE: '',
        CITY: '',
        DISTRICT: '',
        IS_USE: false,
        NAME: '',
        TEL: '',
      },
      user: null,
      url: '',
      manageType: '',
      source: 0
    }
  },
  onLoad(option) {
    this.user = this.$store.state.userInfo
    this.url = this.$store.state.imgUrl
    this.source = option.source
    let title = '新增收货地址';
    if (option.type === 'edit') {
      title = '编辑收货地址'
      this.addressData = JSON.parse(option.data)
      this.addressData.IS_USE = this.addressData.IS_USE == 1 ? true:false
      this.region.label = this.addressData.PROVINCE + '-' + this.addressData.CITY + '-' + this.addressData.DISTRICT
      this.region.cityCode = 1
    }
    this.manageType = option.type;
    uni.setNavigationBarTitle({
      title
    })
  },
  methods: {
    chooseCity() {
      uni.hideKeyboard()
      this.$refs.mpvueCityPicker.show()
    },
    onCancel(e) {
      console.log(e)
    },
    onConfirm(e) {
      this.region = e;
      this.cityPickerValue = e.value;
    },
    switchChange(e) {
      this.addressData.IS_USE = e.detail.value;
    },
    //地图选择地址
    chooseLocation() {
      uni.chooseLocation({
        success: (data) => {
          console.log(data.name)
          this.addressData.addressName = data.name;
          this.addressData.address = data.name;
        }
      })
    },
    removeAdd(){
      const self = this
      uni.showModal({
        content: '确定删除该收货地址吗?',
        success: (e) => {
          if (e.confirm) {
              self.delAddress()
          }
        }
      });
    },
    async delAddress(){
      const self = this
      uni.showLoading({
        mask: true
      })
      const res = http.get(`/userImpl/deleteAddress?UESR_ID=${self.addressData.USER_ID}`)
      self.$api.msg(`删除成功`,1500,true,'success');
      setTimeout(() => {
        self.$mRouter.redirectTo({
          route: self.$mRouterConfig.address
        })
      }, 500)
    },
    //提交
    confirm() {
      const self = this
      let data = this.addressData;
      if (!data.NAME) {
        this.$api.msg('请填写收货人姓名');
        return;
      }
      if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.TEL)) {
        this.$api.msg('请输入正确的手机号码');
        return;
      }
      const address = this.region.label.split('-');
      if (!address.length > 0) {
        this.$api.msg('请选择地区');
        return;
      }
      if (!data.ADDRESS) {
        this.$api.msg('请填写详细地址');
        return;
      }
      uni.showLoading({
        mask: true
      })
      let obj = JSON.parse(JSON.stringify(this.addressData))
      obj.VIP_ID = this.user.USER_ID + ''
      obj.PROVINCE = address[0]
      obj.CITY = address[1]
      obj.DISTRICT = address[2]
      obj.IS_USE = this.addressData.IS_USE ? '1' : '0'
      console.log('addressData', this.addressData)
      //this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
      // this.$api.prePage().refreshList(data, this.manageType);
      // const obj = this.addressData
      let url = ''
      if (this.manageType == 'edit') {
        url = '/userImpl/editAddress'
        obj.USER_ID = self.addressData.USER_ID
      } else {
        url = '/userImpl/addAddress'
      }
      http.post(url, obj).then(res => {
        debugger
        self.$api.msg(`地址${this.manageType == 'edit' ? '修改' : '添加'}成功`,1500,true,'success');
        if (self.source == 1) {
          //this.$api.prePage()获取上一页实例，在App.vue定义
          self.$api.prePage().addressData = res.data.addressDate;
          uni.navigateBack()
        }else{
          setTimeout(() => {
            self.$mRouter.redirectTo({
              route: self.$mRouterConfig.address
            })
          }, 500)
        }
      }).catch(err => {
        console.log('收货地址操作报错', err)
      }).finally(() => {
        uni.hideLoading({})
      })
    },
  }
}
</script>

<style lang="scss">
    page {
        background: $page-color-base;
        padding-top: 16upx;
    }

    .row {
        display: flex;
        align-items: center;
        position: relative;
        padding: 0 30upx;
        height: 110upx;
        background: #fff;

        .tit {
            flex-shrink: 0;
            width: 120upx;
            margin-right: 2%;
            font-size: 30upx;
            color: $font-color-dark;
        }

        .input {
            flex: 1;
            font-size: 30upx;
            color: $font-color-dark;
        }

        .icon-shouhuodizhi {
            font-size: 36upx;
            color: $font-color-light;
        }
    }
    .del-btn{
        background: #e64340 !important;
        margin-top: 4% !important;
    }
    .default-row {
        margin-top: 16upx;

        .tit {
            flex: 1;
        }

        switch {
            transform: translateX(16upx) scale(.9);
        }
    }

    .add-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 690upx;
        height: 80upx;
        margin: 60upx auto;
        margin-bottom: 0 !important;
        font-size: $font-lg;
        color: #fff;
        background-color: $base-color;
        border-radius: 10upx;
        box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
    }
</style>
