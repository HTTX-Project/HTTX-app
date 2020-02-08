<template>
    <view class="bg-w">
        <mescroll-uni :down="downOption" :up="upOption" @down="downCallback"
                      @emptyclick="emptyClick"
                      @init="mescrollInit" @up="upCallback" top="0">
            <view class="top-warp">
<!--                <unio2o-tab :selectIndex="selectIndex" :tabs="tabs" @select="selectAct"></unio2o-tab>-->
                <sl-filter :color="titleColor" :confirm="confirm" :isTransNav="true" :menuList="menuList" :navHeight="0"
                           :ref="'slFilter'" :themeColor="themeColor" :topFixed="true"
                           @result="result"></sl-filter>
            </view>
            <scroll-view class="love-scroll" scroll-y="true">
                <view>
                    <view class="unio2o-money">
                        <!--                    <view class="flex alcenter  pd30">-->
                        <!--                        <text class="iconfont iconicon_balance_des ft20"></text>-->
                        <!--                        <text class="ft18 ftw600 text-default ml20">余额明细</text>-->
                        <!--                    </view>-->
                        <view>
                            <view class="text-center empty" v-if="!pdList.length">
                                <image src="/static/temp/zd.png" mode="aspectFit"></image>
                                <view class="ft16 text-notice">
                                    暂无收益信息
                                </view>
                            </view>
                            <view v-else>
                                <!-- top="xxx"下拉布局往下偏移,防止被悬浮菜单遮住 -->

                                <!-- 数据列表 -->
                                <view :key="index" class="list-item pd30" v-for="(item,index) in pdList">
                                    <view class="flex space">
                                        <view>
                                            <view class="title ft18 text-default" v-if="item.REASON_TYPE == 2">奖金</view>
                                            <view class="title ft18 text-default" v-if="item.REASON_TYPE == 4">购物</view>
                                            <view class="title ft18 text-default" v-if="item.REASON_TYPE == 5">转账</view>
                                            <view class="title ft18 text-default" v-if="item.REASON_TYPE == 6">提现</view>
                                            <view class="ft14 text-notice mt10" style="color: #333;">变动后金额:
                                                {{item.SUM_MONEY}}
                                            </view>
<!--                                            <view class="ft14 text-notice mt10" style="color: #333;">手续费: {{item.SXF}}-->
<!--                                            </view>-->
                                            <view class="ft14 text-notice" style="margin-top:5upx;color: #666;">
                                                {{item.START_TIME}}
                                            </view>
                                        </view>
                                        <view>
                                            <view class="je text-default text-right ftw600" v-if="item.TYPE == 1">
                                                +{{item.ONE_MONEY}}
                                            </view>
                                            <view class="je text-default text-right ftw600" v-if="item.TYPE == 2">
                                                -{{item.ONE_MONEY}}
                                            </view>
                                            <view class="ft14 text-info mt10 text-right ftw500"
                                                  v-if="item.REASON_TYPE == 6 && item.STATUS == 1">待处理
                                            </view>
                                            <view class="ft14 text-info mt10 text-right ftw500"
                                                  v-if="item.REASON_TYPE == 6 && item.STATUS == 2">已通过
                                            </view>
                                            <view class="ft14 text-info mt10 text-right ftw500"
                                                  v-if="item.REASON_TYPE == 6 && item.STATUS == 3">驳回
                                            </view>
                                            <!--                                            -->
                                        </view>
                                    </view>
                                </view>

                            </view>
                        </view>
                    </view>
                </view>

                <!--                <view class="pd30" v-else>-->

                <!--                </view>-->

            </scroll-view>
        </mescroll-uni>
    </view>
</template>

<script>
import unio2oTab from './components/tab/tab.vue';
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
import slFilter from '../../components/songlazy-sl-filter/sl-filter/sl-filter.vue';
import http from '@/utils/request.js'

export default {
  components: {
    unio2oTab,
    slFilter,
    MescrollUni
  },
  data() {
    return {
      downOption: {
        auto: false, // 不自动加载
      },
      upOption: {
        auto: false, // 不自动加载
        // page: {
        // 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
        // 	size: 10 // 每页数据的数量
        // },
        noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
        empty: {
          tip: '~ 空空如也 ~', // 提示
          btnText: '去看看'
        }
      },
      isEmpty: false,
      themeColor: '#FF6D00',
      titleColor: '#666',
      filterResult: '',
      selectIndex: 0,
      menuList: [{
        'title': '奖品类型',
        'key': 'single',
        'isMutiple': false,
        'detailTitle': '请选择（单选）',
        'reflexTitle': true,
        'detailList': [{
          'title': '不限',
          'value': ''
        },
          {
            'title': '直推奖',
            'value': 1
          },
          {
            'title': '极差奖',
            'value': 2
          },
          {
            'title': '团队奖',
            'value': 3
          },
          {
            'title': '分红奖',
            'value': 4
          },
          {
            'title': '代理进货提层',
            'value': 5
          }
        ]

      },
        {
          'title': '收益时间',
          'key': 'sort',
          // 'isSort': true,
          'isDates': true,
          'reflexTitle': true,
          'detailList': [{
            'title': '默认排序',
            'value': ''
          },
            {
              'title': '发布时间',
              'value': 'add_time'
            },
            {
              'title': '薪资最高',
              'value': 'wages_up'
            },
            {
              'title': '离我最近',
              'value': 'location'
            }
          ]
        }
      ],
      // tabs: [
      //   { name: '奖金积分' },
      //   { name: '购物积分' }
      // ],
      user: null,
      url: '',
      JJB_TYPE: '',
      date: '',
      page: 1,
      mescroll: null,
      pdList: []
    }
  },
  onLoad() {
    this.user = this.$store.state.userInfo
    this.url = this.$store.state.imgUrl
  },
  mounted() {
    this.mescroll.triggerDownScroll();
  },
  methods: {
    /*下拉刷新的回调 */
    downCallback(mescroll) {
      // 这里加载你想下拉刷新的数据, 比如刷新轮播数据
      // loadSwiper();
      // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
      mescroll.resetUpScroll()
    },
    selectAct(e) {
      let index = parseInt(e);
      this.selectIndex = index;
      this.MONEY_TYPE = ++index;
      this.mescroll.num = 1
      this.downCallback(this.mescroll)
    },
    /*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
    upCallback(mescroll) {
      //联网加载数据
      uni.showLoading({
        mask: true
      })
      this.getListDataFromNet(mescroll.num, mescroll.size, (curPageData) => {
        //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
        console.log("i=" + this.i + ", mescroll.num=" + mescroll.num + ", mescroll.size=" + mescroll.size + ", curPageData.length=" + curPageData.length);
        mescroll.endSuccess(curPageData.length);
        //设置列表数据
        if (mescroll.num == 1) this.pdList = []; //如果是第一页需手动制空列表
        this.pdList = this.pdList.concat(curPageData); //追加新数据
        uni.hideLoading({})
      }, () => {
        //联网失败的回调,隐藏下拉刷新的状态
        mescroll.endErr();
      })
    },
    //点击空布局按钮的回调
    emptyClick() {
      uni.showToast({
        title: '点击了按钮,具体逻辑自行实现'
      })
    },
    /*联网加载列表数据
			在您的实际项目中,请参考官方写法: http://www.mescroll.com/uni.html#tagUpCallback
			请忽略getListDataFromNet的逻辑,这里仅仅是在本地模拟分页数据,本地演示用
			实际项目以您服务器接口返回的数据为准,无需本地处理分页.
			* */
    getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
      // debugger
      const self = this
      uni.showLoading({
        mask: true
      })
      const url = `/moneyImpl/moneyChangeList?USER_ID=${self.user.USER_ID}&MONEY_TYPE=1&REASON_TYPE=2&JJB_TYPE=${self.JJB_TYPE}&START_TIME=${self.date}&page=${self.page}`
      http.get(url, []).then(res => {
        // debugger
        successCallback && successCallback(res.data.list);
      }).catch(err => {
        console.log('查询账单失败', err)
        errorCallback && errorCallback();
      }).finally(() => {
        uni.hideLoading({})
      })
      //延时一秒,模拟联网
      // setTimeout(() => {
      //
      // try {
      //   let listData = []
      // if (this.i === 0) {
      //   for (let i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
      //     if (i === mockData.length) break
      //     listData.push(mockData[i])
      //   }
      // } else {
      //   let wordArr = ['', '奶粉', '面膜', '图书']
      //   let word = wordArr[this.i]
      //   for (let i = 0; i < mockData.length; i++) {
      //     if (mockData[i].pdName.indexOf(word) !== -1) {
      //       listData.push(mockData[i])
      //     }
      //   }
      // }
      // 回调
      // successCallback && successCallback(listData);
      // } catch (e) {
      //联网失败的回调
      // errorCallback && errorCallback();
      // }
      // }, 1000)
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    result(val) {
      this.JJB_TYPE = val.single
      if (val.date == "请选择时间") {
        this.date = ''
      } else {
        this.date = val.date
      }
      this.mescroll.num = 1
      this.downCallback(this.mescroll)
    },
    confirm() {
      debugger
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
        background-color: white;
        /*padding-bottom: 200px;*/
    }

    .je {
        color: #EE7600;
        font-size: 50upx;
        font-weight: bold;
        /*font-weight: normal !important;*/
        margin-top: -10upx;
    }

    .title {
        font-size: 37upx;
    }

    .ft14 {
        font-size: 25upx;
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
