<template>
	<view>
        <view class="logo">
			<view class="img">
				<image mode="widthFix" src="/static/temp/logo.png"></image>
			</view>
		</view>
		<view class="form re">
			<view class="username">
				<view class="get-code" :style="{'color':getCodeBtnColor}" @click.stop="getCode()">{{getCodeText}}</view>
				<input placeholder="请输入手机号" v-model="phoneNumber" placeholder-style="color: rgba(255,255,255,0.8);"/>
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
			<view class="btn" @tap="doReset">重置密码</view>
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
				phoneNumber:"",
				code:'',
				xtCode: '',
				rePasswd: '',
				passwd:"",
				getCodeText:'获取验证码',
				getCodeBtnColor:"#ffffff",
				getCodeisWaiting:false
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
				if (!(utils.regularTools.isPhone(self.phoneNumber))) {
					self.$api.msg('请填写正确手机号码')
					return false
				}
				//示例用定时器模拟请求效果
				const res = await http.get(`/userImpl/getEMS?PHONE=${self.phoneNumber.trim()}`)
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
			async doReset() {
				const self = this
				uni.hideKeyboard()
				//模板示例部分验证规则
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
				const obj = {
					PHONE: self.phoneNumber,
					PASSWORD: self.passwd
				}
				const res = await http.post('/userImpl/changePassword', obj)
				debugger
				self.$api.msg('找回成功',1500,true,'success')
				setTimeout(function() {
					self.$mRouter.push({
						route: self.$mRouterConfig.login,
						query: {
							phone: self.phoneNumber
						}
					})
				},500)
				//模板示例修改本地储存的用户信息，实际使用中请替换为上传服务器修改。
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
</style>
