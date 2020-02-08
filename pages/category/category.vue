<template>
    <view class="content">
        <view class="category-list">
            <!-- 左侧分类导航 -->
            <scroll-view scroll-y="true" class="left">
                <view class="row" v-for="(category,index) in categoryList" :key="category.USER_ID"
                      :class="[index==showCategoryIndex?'on':'']" @tap="showCategory(index)">
                    <view class="text">
                        <view class="block"></view>
                        {{category.NAME}}
                    </view>
                </view>

            </scroll-view>
            <!-- 右侧子导航 -->
            <scroll-view scroll-y="true" class="right">
                <view class="category" v-for="(category,index) in categoryList" :key="category.USER_ID"
                      v-show="index==showCategoryIndex">
                    <view class="list">
                        <view class="box" v-for="(box,i) in category.childList" :key="i" @tap="toCategory(box)">
                            <image :src="url+''+box.ICON"></image>
                            <view class="text">{{box.NAME}}</view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
import http from '@/utils/request.js'

export default {
  data() {
    return {
      sizeCalcState: false,
      tabScrollTop: 0,
      currentId: 1,
      flist: [],
      slist: [],
      tlist: [],
      user: null,
      url: '',
      //分类列表
      showCategoryIndex: 0,
      categoryList: []
    }
  },
  onLoad() {
    this.loadData();
    this.user = this.$store.state.userInfo
    this.url = this.$store.state.imgUrl
  },
  methods: {
    async loadData() {
      const self = this
      let list = await this.$api.json('cateList');
      list.forEach(item => {
        if (!item.pid) {
          this.flist.push(item);  //pid为父级id, 没有pid或者pid=0是一级分类
        } else if (!item.picture) {
          this.slist.push(item); //没有图的是2级分类
        } else {
          this.tlist.push(item); //3级分类
        }
      })
      console.log('flist', this.flist);
      console.log('slist', this.slist);
      console.log('tlist', this.tlist);
      // console.log('list', list);
      http.get(`/goodImpl/goodTypeList`, []).then((res) => {
        self.categoryList = res.data.typeList;
        // const data = self.getItem(res.data.typeList)
        // self.typeList = data
        // console.log(self.typeList);
      }).catch(error => {
        console.log('分类', error)
      });
      //
    },
    getItem(data) {
      console.log('123');
      let countData = []
      for (const item of data) {
        if (item.childList && item.childList.length > 0) {
          countData.push(item)
          const res = this.getItem(item.childList)
          console.log('res', res)
          countData = countData.concat(res)
        } else {
          countData.push(item)
        }
      }
      return countData
    },
    //一级分类点击
    tabtap(item) {
      if (!this.sizeCalcState) {
        this.calcSize();
      }
      this.currentId = item.id;
      let index = this.slist.findIndex(sitem => sitem.pid === item.id);
      this.tabScrollTop = this.slist[index].top;
    },
    //右侧栏滚动
    asideScroll(e) {
      if (!this.sizeCalcState) {
        this.calcSize();
      }
      let scrollTop = e.detail.scrollTop;
      let tabs = this.slist.filter(item => item.top <= scrollTop).reverse();
      if (tabs.length > 0) {
        this.currentId = tabs[0].pid;
      }
    },
    //计算右侧栏每个tab的高度等信息
    calcSize() {
      let h = 0;
      this.slist.forEach(item => {
        let view = uni.createSelectorQuery().select("#main-" + item.id);
        view.fields({
          size: true
        }, data => {
          item.top = h;
          h += data.height;
          item.bottom = h;
        }).exec();
      })
      this.sizeCalcState = true;
    },
    navToList(sid, tid) {
      uni.navigateTo({
        url: `/pages/product/list?fid=${this.currentId}&sid=${sid}&tid=${tid}`
      })
    },
    //
    //消息列表
    toMsg() {
      uni.navigateTo({
        url: '../../msg/msg'
      })
    },
    //分类切换显示
    showCategory(index) {
      this.showCategoryIndex = index;
    },
    toCategory(e) {
      this.$mRouter.push({
        route: this.$mRouterConfig.productList,
        query: {
          id: e.USER_ID,
          pId: e.PARENT_ID
        }
      })
      // uni.setStorageSync('catName', e.name);
      // uni.navigateTo({
      //   url: '../../goods/goods-list/goods-list?cid=' + e.id + '&name=' + e.name
      // });
    },
    //搜索跳转
    toSearch() {
      uni.showToast({ title: "建议跳转到新页面做搜索功能" });
    }
  }
}
</script>

<style lang='scss'>
    page,
    .content {
        height: 100%;
        background-color: #f8f8f8;
    }

    .content {
        display: flex;
    }

    .left-aside {
        flex-shrink: 0;
        width: 200upx;
        height: 100%;
        background-color: #fff;
    }

    .f-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100upx;
        font-size: 28upx;
        color: $font-color-base;
        position: relative;

        &.active {
            color: $base-color;
            background: #f8f8f8;

            &:before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                height: 36upx;
                width: 8upx;
                background-color: $base-color;
                border-radius: 0 4px 4px 0;
                opacity: .8;
            }
        }
    }

    .right-aside {
        flex: 1;
        overflow: hidden;
        padding-left: 20upx;
    }

    .s-item {
        display: flex;
        align-items: center;
        height: 70upx;
        padding-top: 8upx;
        font-size: 28upx;
        color: $font-color-dark;
    }

    .t-list {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        background: #fff;
        padding-top: 12upx;

        &:after {
            content: '';
            flex: 99;
            height: 0;
        }
    }

    .t-item {
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 176upx;
        font-size: 26upx;
        color: #666;
        padding-bottom: 20upx;

        image {
            width: 140upx;
            height: 140upx;
        }
    }
</style>

<style lang="scss">

    .status {
        width: 100%;
        height: 0;
        position: fixed;
        z-index: 10;
        background-color: #fff;
        top: 0;
        /*  #ifdef  APP-PLUS  */
        height: var(--status-bar-height); //覆盖样式
        /*  #endif  */

    }

    .header {
        width: 92%;
        padding: 0 4%;
        height: 100upx;
        display: flex;
        align-items: center;
        position: fixed;
        top: 0;
        z-index: 10;
        background-color: #fff;
        /*  #ifdef  APP-PLUS  */
        top: var(--status-bar-height);
        /*  #endif  */

        .addr {
            width: 120upx;
            height: 60upx;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            font-size: 28upx;

            .icon {
                height: 60upx;
                margin-right: 5upx;
                display: flex;
                align-items: center;
                font-size: 42upx;
                color: #ffc50a;
            }
        }

        .input-box {
            width: 100%;
            height: 60upx;
            background-color: #f5f5f5;
            border-radius: 30upx;
            position: relative;
            display: flex;
            align-items: center;

            .icon {
                display: flex;
                align-items: center;
                position: absolute;
                top: 0;
                right: 0;
                width: 60upx;
                height: 60upx;
                font-size: 34upx;
                color: #c0c0c0;
            }

            input {
                padding-left: 28upx;
                height: 28upx;
                font-size: 28upx;
            }
        }

        .icon-btn {
            width: 60upx;
            height: 60upx;
            flex-shrink: 0;
            display: flex;

            .icon {
                width: 60upx;
                height: 60upx;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                font-size: 42upx;
            }
        }
    }

    .place {

        background-color: #ffffff;
        height: 100upx;
        /*  #ifdef  APP-PLUS  */
        margin-top: var(--status-bar-height);
        /*  #endif  */
    }

    .category-list {
        width: 100%;
        background-color: #fff;
        display: flex;
        border-top: 1px solid #eee;

        .left, .right {
            // position: absolute;
            // top: 100upx;
            /*  #ifdef  APP-PLUS  */
            // top: calc(100upx + var(--status-bar-height));
            // /*  #endif  */
            // bottom: 0upx;
        }

        .left {
            width: 25%;
            left: 0upx;
            background-color: #f2f2f2;

            .row {
                width: 100%;
                height: 100upx;
                display: flex;
                align-items: center;

                .text {
                    width: 100%;
                    position: relative;
                    font-size: 28upx;
                    display: flex;
                    height: 100upx;
                    line-height: 100upx;
                    justify-content: center;
                    color: #3c3c3c;

                    .block {
                        position: absolute;
                        width: 0upx;
                        left: 0;
                    }
                }

                &.on {
                    height: 100upx;
                    background-color: #fff;

                    .text {
                        font-size: 30upx;
                        font-weight: 600;
                        color: #2d2d2d;

                        .block {
                            width: 7upx;
                            height: 100%;
                            // top: 10%;
                            background-color: #fa436a;
                        }
                    }
                }
            }
        }

        .right {
            width: 76%;
            left: 25%;

            .category {
                width: 95%;
                padding: 15upx 0;
                // padding: 20upx 3%;
                .banner {
                    width: 100%;
                    height: 24.262vw;
                    border-radius: 10upx;
                    overflow: hidden;
                    box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.3);

                    image {
                        width: 100%;
                        height: 24.262vw;
                    }
                }

                .list {
                    // margin-top: 40upx;
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;

                    .box {
                        width: calc(71.44vw / 3);
                        margin-bottom: 30upx;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-wrap: wrap;

                        image {
                            width: 60%;
                            height: calc(71.44vw / 3 * 0.6);
                        }

                        .text {
                            margin-top: 5upx;
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            font-size: 26upx;
                        }
                    }
                }
            }
        }
    }

</style>
