<template>
    <view class="container iphone">
        <my-issue key="2" :score="0" @submit="onSubmit"/>
    </view>

</template>

<script>
import myIssue from '@/components/myIssue/myIssue.vue'
import http from '@/utils/request.js'
export default {
  components:{myIssue},
  data() {
    return {
      title: 'Hello',
      obj: {},
      user: {},
      url: null
    }
  },
  onLoad(o) {
    this.obj = {
      gId: o.gId,
      oId: o.oId
    }
    this.user = this.$store.state.userInfo
    this.url = this.$store.state.imgUrl
  },
  methods: {
    async onSubmit(e) {
      const self = this;
      if (e.score < 1) {
        this.$api.msg('请选择星级别')
        return false;
      }
      if (e.textareaValue == '') {
        this.$api.msg('请填写评价')
        return false;
      }
      uni.showLoading({
        mask: true
      })
      const data = {
        GOOD_ID: self.obj.gId,
        ORDER_ID: self.obj.oId,
        USER_ID: self.user.USER_ID,
        PL_STAR: e.score,
        PL_CONTENT: e.textareaValue
      }
      const res = await http.post('/goodImpl/saveComment', data)
      this.$api.msg('评价成功',1500,true,'success')
      setTimeout(function() {
        uni.navigateTo()
      },500)
    }
  }
}
</script>
<style>
    .content{
        height: 100%;
    }
</style>
