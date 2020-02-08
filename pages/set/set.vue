<template>
    <view class="container">
        <view :hover-stay-time="50" @click="navTo('userSetting')" class="list-cell b-b m-t" hover-class="cell-hover">
            <text class="cell-tit">个人资料</text>
            <text class="cell-more yticon icon-you"></text>
        </view>
        <view :hover-stay-time="50" @click="navTo('address')" class="list-cell b-b" hover-class="cell-hover">
            <text class="cell-tit">收货地址</text>
            <text class="cell-more yticon icon-you"></text>
        </view>
        <!--		<view class="list-cell" @click="navTo('实名认证')" hover-class="cell-hover" :hover-stay-time="50">-->
        <!--			<text class="cell-tit">实名认证</text>-->
        <!--			<text class="cell-more yticon icon-you"></text>-->
        <!--		</view>-->

        <view class="list-cell m-t">
            <text class="cell-tit">消息推送</text>
            <switch @change="switchChange" checked color="#fa436a"/>
        </view>
        <view :hover-stay-time="50" @click="clearSto" class="list-cell m-t b-b" hover-class="cell-hover">
            <text class="cell-tit">清除缓存</text>
            <text class="cell-more yticon icon-you"></text>
        </view>
        <view :hover-stay-time="50" @click="navTo('关于Dcloud')" class="list-cell b-b" hover-class="cell-hover">
            <text class="cell-tit">关于App</text>
            <text class="cell-more yticon icon-you"></text>
        </view>
        <view class="list-cell">
            <text class="cell-tit">检查更新</text>
            <text class="cell-tip">当前版本 1.0.3</text>
            <text class="cell-more yticon icon-you"></text>
        </view>
        <view @click="toLogout" class="list-cell log-out-btn">
            <text class="cell-tit">退出登录</text>
        </view>
    </view>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {};
  },
  onLoad() {
  },
  onShow() {
    // #ifdef APP-PLUS
    // plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
    //   console.log('当前版本号：', widgetInfo.version)
    //   http.get(`/version/getAndroidNewVersion?version=${widgetInfo.version}`).then(result => {
    //     if (result.result == 'success') {
      // plus.runtime.install(downloadResult.tempFilePath, {
      //   force: false
      // }, function() {
      //   console.log('install success...');
      //   plus.runtime.restart();
      // }, function(e) {
      //   console.error('install fail...');
      // });
      // }
      // }).catch(err => {
      //   console.log('更新err', err)
      // })


      // uni.request({
      //   url: 'http://www.example.com/update/',
      //   data: {
      //     version: widgetInfo.version,
      //     name: widgetInfo.name
      //   },
      //   success: (result) => {
      //     var data = result.data;
      //     if (data.update && data.wgtUrl) {
      //       uni.downloadFile({
      //         url: data.wgtUrl,
      //         success: (downloadResult) => {
      //           if (downloadResult.statusCode === 200) {
      //
      //           }
      //         }
      //       });
      //     }
      //   }
      // });
    // });
// #endif
  },
  methods: {
    ...mapMutations(['logout']),

    navTo(url) {
      const self = this
      this.$mRouter.push({
        route: this.$mRouterConfig[url]
      })
      // this.$api.msg(`跳转到${url}`);
    },
    clearSto(){
      const self = this
      uni.showModal({
        content: '缓存清理后需重新登录，是否继续操作?',
        success: (e) => {
          if (e.confirm) {
            try {
              uni.clearStorageSync();
              self.$api.msg('缓存清理成功')
              setTimeout(() => {
                self.$mRouter.reLaunch({
                  route: self.$mRouterConfig.login
                })
              }, 200)
            } catch (e) {
              self.$api.msg('缓存清理失败')
            }
          }
        }
      });
    },
    //退出登录
    toLogout() {
      const self = this
      uni.showModal({
        content: '确定要退出登录么',
        success: (e) => {
          if (e.confirm) {
            this.logout();
            setTimeout(() => {
              self.$mRouter.push({
                route: self.$mRouterConfig.login
              })
            }, 200)
          }
        }
      });
    },
    //switch
    switchChange(e) {
      let statusTip = e.detail.value ? '打开' : '关闭';
      this.$api.msg(`${statusTip}消息推送`);
    },

  }
}
</script>

<style lang='scss'>
    page {
        background: $page-color-base;
    }

    .list-cell {
        display: flex;
        align-items: baseline;
        padding: 20upx $page-row-spacing;
        line-height: 60upx;
        position: relative;
        background: #fff;
        justify-content: center;

        &.log-out-btn {
            margin-top: 40upx;

            .cell-tit {
                color: $uni-color-primary;
                text-align: center;
                margin-right: 0;
            }
        }

        &.cell-hover {
            background: #fafafa;
        }

        &.b-b:after {
            left: 30upx;
        }

        &.m-t {
            margin-top: 16upx;
        }

        .cell-more {
            align-self: baseline;
            font-size: $font-lg;
            color: $font-color-light;
            margin-left: 10upx;
        }

        .cell-tit {
            flex: 1;
            font-size: $font-base + 2upx;
            color: $font-color-dark;
            margin-right: 10upx;
        }

        .cell-tip {
            font-size: $font-base;
            color: $font-color-light;
        }

        switch {
            transform: translateX(16upx) scale(.84);
        }
    }
</style>
