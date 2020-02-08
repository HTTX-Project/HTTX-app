<template>
  <!-- <view class="content">
			<view class="list">
				<view class="row" v-for="(row,Rindex) in commentList" :key="Rindex">
					<view class="left">
						<view class="face">
							<image :src="row.WX_IMG"></image>
						</view>
					</view>
					<view class="right">
						<view class="name-date">
							<view class="username">
								{{row.VIP_NAME}}
							</view>
							<view class="date">
								{{row.INSERT_DATE}}
							</view>
						</view>
						<view class="spec">
							123
						</view>
						<view class="first">
							<view class="rat">
								{{row.PL_CONTENT || ''}}
							</view>
						</view>
						<view class="append" v-if="row.ADMIN_BACK != '' && row.ADMIN_BACK">
							<view class="date">
								掌柜回复
							</view>
							<view class="rat">
								{{row.ADMIN_BACK}}
							</view>
						</view>
					</view>
				</view>
			</view>
  </view>-->
  <view class="content">
    <uni-evaluate :list-data="commentList" :rate="rateData" />
  </view>
</template>

<script>
import uniEvaluate from "@/components/xiujun-evaluate/uni-evaluate.vue";
import http from "@/utils/request.js";
export default {
  components: {
    uniEvaluate
  },
  data() {
    return {
      labelIndex: 0,
      videoDirection: 0,
      showFullscreenBtn: true,
      showPlayBtn: true,
      isPlayVideo: true,
      videoSrc: "",
      commentList: [],
      listData: [
        {
          content: "好评",
          create_time: "2019-04-12",
          header_img: "http://cs.zhangkaixing.com/face/face_2.jpg",
          user_name: "测试1",
          rate: 5,
          imgs: []
        },
        {
          content: "中评",
          create_time: "2019-04-12",
          header_img: "http://cs.zhangkaixing.com/face/face_12.jpg",
          user_name: "测试2",
          rate: 4
        },
        {
          content: "",
          create_time: "2019-04-12",
          header_img: "http://cs.zhangkaixing.com/face/face_15.jpg",
          user_name: "测试3",
          rate: 2,
          imgs: []
        }
      ],
      rateData: 4.6
    };
  },
  onLoad(o) {
    this.getData(o.id);
  },
  onReady: function(res) {
    // this.videoContext = uni.createVideoContext('myVideo')
  },
  methods: {
    getData(id) {
      const self = this;
      uni.showLoading({
        mask: true
      });
      http
        .get(`/goodImpl/goodCommentList?GOOD_ID=${id}&USER_ID=&ORDER_ID=`, [])
        .then(res => {
          self.commentList = res.data.commentList;
          console.log("commentList", self.commentList);
        })
        .catch(err => {
          console.log("评价", error);
        })
        .finally(() => {
          uni.hideLoading({});
        });
    },
    loadRatings(index) {
      this.labelIndex = index;
      uni.showToast({
        title: "切换评论列表"
      });
    }
    // playVideo(path) {
    // 	this.videoSrc = path;
    // 	// this.isPlayVideo = true;
    // 	this.$nextTick(function() {
    // 		this.videoContext.requestFullScreen({direction:0});
    // 	});
    //
    // },
    // stopPlayVideo(){
    // 	this.videoContext.pause();
    // },
    // videoPause(){
    // 	// this.isPlayVideo = false;
    // 	this.videoSrc = '';
    // },
    // viderFullscreen(e){
    // 	if(e.detail.fullScreen){
    // 		this.videoContext.play();
    // 	}else{
    // 		this.stopPlayVideo();
    // 	}
    // },
    // showBigImg(src,srclist){
    // 	uni.previewImage({
    // 		current:src,
    // 		urls: srclist
    // 	});
    // }
  }
};
</script>


<style>
.content {
  text-align: center;
  height: 400upx;
}
.logo {
  height: 200upx;
  width: 200upx;
  margin-top: 200upx;
}
.title {
  font-size: 36upx;
  color: #8f8f94;
}
</style>
<style lang="scss">
// 	page{
// 		background-color: #fff;
// 	}

// .myVideo{
// 	position: fixed;
// 	top: 50%;
// 	right: 100%;
// }
// .content{
// 	view{
// 		display: flex;
// 	}
// 	width: 94%;
// 	padding: 0 3%;

// 	.label{
// 		width: 100%;
// 		flex-wrap:wrap;
// 		view{
// 			padding: 0 20upx;
// 			height: 50upx;
// 			border-radius: 40upx;
// 			border:solid 1upx #ddd;
// 			align-items: center;
// 			color: #555;
// 			font-size: 26upx;
// 			background-color: #f9f9f9;
// 			margin: 10upx 20upx 10upx 0;
// 			&.on{
// 				border:solid 1upx #f06c7a;
// 				color: #f06c7a;
// 			}
// 		}
// 	}
// 	.list{
// 		width: 100%;
// 		flex-wrap: wrap;
// 		padding: 20upx 0;
// 		.row{
// 			width: 100%;
// 			margin-top: 40upx;
// 			.left{
// 				width: 10vw;
// 				flex-shrink: 0;
// 				margin-right: 10upx;
// 				.face{
// 					width: 100%;
// 					image{
// 						width: 10vw;
// 						height: 10vw;
// 						border-radius: 100%;
// 					}

// 				}
// 			}
// 			.right{
// 				width: 100%;
// 				flex-wrap: wrap;
// 				.name-date{
// 					width: 100%;
// 					justify-content: space-between;
// 					align-items: baseline;
// 					.username{
// 						font-size: 32upx;
// 						color: #555;
// 					}
// 					.date{
// 						font-size:28upx;
// 						color: #aaa;
// 					}
// 				}
// 				.spec{
// 					width: 100%;
// 					color: #aaa;
// 					font-size: 26upx;
// 				}
// 				.first{
// 					width: 100%;
// 					flex-wrap: wrap;
// 					.rat{
// 						font-size: 30upx;
// 						margin-top: 10upx;
// 					}
// 					.img-video{
// 						width: 100%;
// 						flex-wrap: wrap;
// 						.box{
// 							width: calc((84.6vw - 50upx)/4);
// 							height: calc((84.6vw - 50upx)/4);
// 							margin: 5upx 5upx;
// 							position: relative;
// 							justify-content: center;
// 							align-items: center;
// 							image{
// 								position: absolute;
// 								width: 100%;
// 								height: 100%;
// 								border-radius: 10upx;
// 							}
// 							.playbtn{
// 								position: absolute;
// 								.icon{
// 									font-size: 80upx;
// 									color: rgba(255,255,255,.9)
// 								}
// 							}
// 						}
// 					}
// 				}

// 				.append{
// 					width: 100%;
// 					flex-wrap: wrap;
// 					.date{
// 						width: 100%;
// 						height: 40upx;
// 						border-left: 10upx solid #f06c7a;
// 						padding-left: 10upx;
// 						align-items: center;
// 						font-size: 32upx;
// 						margin: 20upx 0;
// 					}
// 					.rat{
// 						font-size: 30upx;
// 					}
// 					.img-video{
// 						width: 100%;
// 						flex-wrap: wrap;
// 						.box{
// 							width: calc((84.6vw - 10upx - (10upx * 4))/4);
// 							height: calc((84.6vw - 10upx - (10upx * 4))/4);
// 							margin: 5upx 5upx;
// 							position: relative;
// 							justify-content: center;
// 							align-items: center;
// 							image{
// 								position: absolute;
// 								width: 100%;
// 								height: 100%;
// 								border-radius: 10upx;
// 							}
// 							.playbtn{
// 								position: absolute;
// 								.icon{
// 									font-size: 80upx;
// 									color: rgba(255,255,255,.9);
// 								}
// 							}
// 						}
// 					}
// 				}
// 			}
// 		}
// 	}
// }
</style>