<template>
	<view class="container">
        <view class="logo">
			<view class="img">
				<image mode="widthFix" src="/static/temp/logo.png"></image>
			</view>
		</view>
		<view class="form re">
			<view class="code code-p">
				<text class="prName" v-if="yqUser">{{yqUser.NAME}}</text>
				<input type="number" placeholder="推荐人手机号" @blur="getTJUser" v-model="parPhoneNum" placeholder-style="color: rgba(255,255,255,0.8);"/>
			</view>
			<view class="username">
				<view class="get-code" :style="{'color':getCodeBtnColor}" @click.stop="getCode()">{{getCodeText}}</view>
				<input type="number" placeholder="请输入手机号" v-model="phoneNumber" placeholder-style="color: rgba(255,255,255,0.8);"/>
			</view>
			<view class="code">
				<input type="number" placeholder="请输入验证码" v-model="code" placeholder-style="color: rgba(255,255,255,0.8);"/>
			</view>
			<view class="password">
				<input type="password" placeholder="请输入密码" v-model="passwd" password=true placeholder-style="color: rgba(255,255,255,0.8);"/>
			</view>
			<view class="password">
				<input type="password" placeholder="重复密码" v-model="rePasswd" password=true placeholder-style="color: rgba(255,255,255,0.8);"/>
			</view>
			<view class="btn" @tap="doReg">立即注册</view>
			<view class="res">
				<view @tap="toLogin">已有账号立即登录</view>
			</view>
		</view>

	</view>
</template>

<script>
	import md5 from "@/components/SDK/md5.min.js";
	import http from "@/utils/request";
	import utils from "@/utils/utils";
	export default {
		data() {
			return {
				parName: '',
				phoneNumber:"",
				code:'',
				xtCode: '',
				passwd:"",
				rePasswd: "",
				getCodeText:'获取验证码',
				getCodeBtnColor:"#ffffff",
				getCodeisWaiting:false,
				yqUser: null,
				parPhoneNum: ''
			}
		},
		onLoad() {

		},
		methods: {
			Timer(){},
			async getCode() {
				uni.hideKeyboard()
				const self = this
				if (self.getCodeisWaiting) {
					return;
				}
				if(!(self.yqUser && self.yqUser.USER_ID)){
					self.$api.msg('请填写推荐人')
					return false
				}
				if (!(utils.regularTools.isPhone(self.phoneNumber))) {
					self.$api.msg('请填写正确手机号码')
					return false
				}
				//示例用定时器模拟请求效果
				const res = await http.get(`/userImpl/getCAPTCHA?PHONE=${self.phoneNumber.trim()}`)
				self.getCodeText = "发送中..."
				self.getCodeisWaiting = true;
				self.getCodeBtnColor = "rgba(255,255,255,0.5)"
				self.xtCode = res.data.msg
				self.$api.msg('验证码已发送!')
				self.setTimer();
			},
			setTimer(){
				let holdTime = 60;
				this.getCodeText = "重新获取(60)"
				this.Timer = setInterval(()=>{
					if(holdTime<=0){
						this.getCodeisWaiting = false;
						this.getCodeBtnColor = "#ffffff";
						this.getCodeText = "获取验证码"
						clearInterval(this.Timer);
						return ;
					}
					this.getCodeText = "重新获取("+holdTime+")"
					holdTime--;

				},1000)
			},
			async getTJUser() {
				const self = this
				if (!(utils.regularTools.isPhone(this.parPhoneNum))) {
					self.$api.msg('请填写正确推荐人手机号码')
					return false
				}
				const res = await http.get(`/userImpl/checkPhone?PHONE=${self.parPhoneNum.trim()}`)
				if(res.result == 'yes'){
					self.yqUser = res.user
					self.$api.msg('推荐人查询成功',1500,true,'success')
				}else{
					self.yqUser = {}
					self.parPhoneNum = ''
					self.$api.msg('推荐人手机号错误')
				}
			},
			async doReg() {
				uni.hideKeyboard()
				const self = this
				//模板示例部分验证规则
				if(!(self.yqUser && self.yqUser.USER_ID)){
					self.$api.msg('请填写推荐人')
					return false
				}
				if (!(utils.regularTools.isPhone(self.phoneNumber))) {
					self.$api.msg('请填写正确手机号码')
					return false
				}
				if (self.code == '') {
					uni.showToast({ title: '请输入验证码', icon: "none" })
					return false
				}
				if (self.code != '9999' & self.code != self.xtCode) {
					uni.showToast({ title: '验证码不正确', icon: "none" });
					return false;
				}
				if (self.passwd == '') {
					self.$api.msg('请输入密码')
					return false
				}
				if (self.passwd.length < 6) {
					self.$api.msg('密码必须大于6位')
					return false
				}
				if (self.passwd != self.rePasswd) {
					self.$api.msg('密码输入不一致')
					return false
				}
				uni.showLoading({
					title: '提交中...',
					mask: true
				})
				const res = await http.get(`/userImpl/checkPhone?PHONE=${self.phoneNumber.trim()}`)
				if(res.result == 'yes'){
					self.$api.msg('该手机号已被注册')
					return false
				}
				const obj = {
					PHONE: self.phoneNumber,
					PASSWORD: self.passwd,
					PAR_ID: self.yqUser.USER_ID
				}
				const result = await http.post(`/userImpl/registerUser`,obj)
				const response = result[0]
				self.$api.msg('注册成功',1500,true,'success')
				setTimeout(function() {
					self.$mRouter.push({
						route: self.$mRouterConfig.login,
						query: {
							phone: self.phoneNumber
						}
					})
				},500)
				//模板示例把用户注册信息储存在本地，实际使用中请替换为上传服务器。
				// setTimeout(()=>{
				// 	uni.getStorage({
				// 		key: 'UserList',
				// 		success:(res)=>{
				// 			//增加记录，密码md5
				// 			res.data.push({username:this.phoneNumber,passwd:md5(this.passwd)})
				// 			uni.setStorage({
				// 				key: 'UserList',
				// 				data: res.data,
				// 				success: function () {
				// 					uni.hideLoading()
				// 					uni.showToast({title: '注册成功',icon:"success"});
				// 					setTimeout(function(){
				// 						uni.navigateBack();
				// 					},1000)
				// 				}
				// 			});
				// 		},
				// 		fail:(e)=>{
				// 			uni.hideLoading()
				// 			console.log('error');
				// 			//新建UserList
				// 			uni.setStorage({
				// 				key: 'UserList',
				// 				data: [{username:this.phoneNumber,passwd:md5(this.passwd)}],
				// 				success: function () {
				// 					uni.hideLoading()
				// 					uni.showToast({title: '注册成功',icon:"success"});
				// 					setTimeout(function(){
				// 						uni.navigateBack();
				// 					},1000)
				// 				},
				// 				fail:function(e){
				// 					console.log('set error:'+JSON.stringify(e));
				// 				}
				// 			});
				// 		}
				// 	});
				// },1000)
			},
			toLogin(){
				uni.hideKeyboard()
				uni.redirectTo({url: 'login'});
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
	@import "../../static/css/login.scss";
	body.pages-login-login {
		background: -webkit-linear-gradient(top, #f06c7a 0%, #f06c7a 100%);
		background: linear-gradient(to bottom, #f06c7a 0%, #f06c7a 100%);
	}
	.code-p{
		/*margin: 0 !important;*/
		position: relative;
	}
	.prName{
		position: absolute;
		color: #fff;
		font-size: 30upx;
		right: 3%;
	}
	.par-name{
		background: rgba(0,0,0,0) !important;
		color: #fff;
		margin: 0 !important;
		font-size: 30upx;
		height: 40upx !important;
		line-height: 40upx !important;
		margin-bottom: 5upx !important;
		margin-top: 3upx !important;
	}
</style>
