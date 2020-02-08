<template>
    <view class="content b-t">


        <view v-if="!addressList.length" class="empty">
            <image src="/static/address_empty.png" mode="aspectFit"></image>
            <view class="empty-tips">
                还没有添加地址呢
                <!--				<navigator class="navigator">随便逛逛>-->
                <!--				</navigator>-->
            </view>
        </view>
        <view v-else class="list b-b" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
            <view class="wrapper">
                <view class="address-box">
                    <text v-if="item.IS_USE == 1" class="tag">默认</text>
                    <text class="address">{{item.PROVINCE}}{{item.CITY}}{{item.DISTRICT}}{{item.ADDRESS}}</text>
                </view>
                <view class="u-box">
                    <text class="name">{{item.NAME}}</text>
                    <text class="mobile">{{item.TEL}}</text>
                </view>
            </view>
            <text class="yticon icon-bianji" @click.stop="addAddress('edit', item)"></text>
        </view>
        <button class="add-btn" @click="addAddress('add')">新增地址</button>
    </view>
</template>

<script>
import http from '@/utils/request.js'

export default {
  data() {
    return {
      source: 0,
      addressList: [],
      // addressList: [
      //   {
      //     name: '刘晓晓',
      //     mobile: '18666666666',
      //     addressName: '贵族皇仕牛排(东城店)',
      //     address: '北京市东城区',
      //     area: 'B区',
      //     default: true
      //   }, {
      //     name: '刘大大',
      //     mobile: '18667766666',
      //     addressName: '龙回1区12号楼',
      //     address: '山东省济南市历城区',
      //     area: '西单元302',
      //     default: false,
      //   }
      // ]
    }
  },
  onLoad(option) {
    this.user = this.$store.state.userInfo
    this.url = this.$store.state.imgUrl
    this.source = option.source;
  },
  onShow(){
    this.getData()
  },
  methods: {
    getData() {
      const self = this
      uni.showLoading({
        mask: true
      })
      http.get(`/userImpl/getAddressList?USER_ID=${self.user.USER_ID}`, []).then((res) => {
        self.addressList = res.data.addList
        console.log('addressList', self.addressList)
        setTimeout(function() {
          uni.hideLoading({})
        }, 100)
        console.log('goodInfo', self.goodList)
      }).catch(error => {
        console.log('单商品报错', error)
      }).finally(() => {
        uni.hideLoading({})
      })
    },
    //选择地址
    checkAddress(item) {
      if (this.source == 1) {
        //this.$api.prePage()获取上一页实例，在App.vue定义
        this.$api.prePage().addressData = item;
        uni.navigateBack()
      }
    },
    addAddress(type, item) {
      uni.redirectTo({
        url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}`
      })
    },
    //添加或修改成功之后回调
    refreshList(data, type) {
      //添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
      this.addressList.unshift(data);

      console.log(data, type);
    }
  }
}
</script>

<style lang='scss'>
    page {
        padding-bottom: 120upx;
    }

    .content {
        /*padding-bottom: 134upx;*/
        /* 空白页 */
        .empty {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100vh;
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
    }

    .content {
        position: relative;
    }

    .list {
        display: flex;
        align-items: center;
        padding: 20upx 30upx;;
        background: #fff;
        position: relative;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .address-box {
        display: flex;
        align-items: center;

        .tag {
            display: inline-block;
            box-sizing: border-box;
            font-size: 24upx;
            color: $base-color;
            margin-right: 10upx;
            background: #fffafb;
            border: 1px solid #ffb4c7;
            border-radius: 4upx;
            /*padding: 4upx 10upx;*/
            padding: 5upx;
            line-height: 1;
        }

        .address {
            font-size: 30upx;
            color: $font-color-dark;
        }
    }

    .u-box {
        font-size: 28upx;
        color: $font-color-light;
        margin-top: 16upx;

        .name {
            margin-right: 30upx;
        }
    }

    .icon-bianji {
        display: flex;
        align-items: center;
        height: 80upx;
        font-size: 40upx;
        color: $font-color-light;
        padding-left: 30upx;
    }

    .add-btn {
        position: fixed;
        left: 30upx;
        right: 30upx;
        bottom: 16upx;
        z-index: 95;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 690upx;
        height: 80upx;
        font-size: 32upx;
        color: #fff;
        background-color: $base-color;
        border-radius: 10upx;
        box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
    }
</style>
