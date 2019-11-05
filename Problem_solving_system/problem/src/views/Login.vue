<template>
  <div>
    <!-- 表头 -->
    <van-nav-bar title="登录" left-arrow @click-left="onClickLeft" />
    <!-- 登录 -->
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        placeholder="请输入用户名"
        left-icon="manager"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        clearable
        left-icon="lock"
      />
      <van-button type="danger" size="large" @click="login">登录</van-button>
      <van-button type="warning" size="large" @click="regist">没有账号？点击注册</van-button>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 2,
      username: '',
      password: ''
    }
  },
  methods: {
    // 路径跳转
    onClickLeft () {
      this.$router.push('/')
    },
    regist () {
      this.$router.push('/regist')
    },
    // 登录功能
    login () {
      if (this.username === '') {
        this.$toast.fail('用户名不能为空!')
        return false
      } else if (this.password === '') {
        this.$toast.fail('密码不能为空!')
        return false
      } else {
        this.$http
          .post('/users/access_token', {
            username: this.username,
            password: this.password
          })
          .then(res => {
            if (res.data.ok === 1) {
              this.$toast.success('登录成功!')
              sessionStorage.setItem('token', res.data.data.token)
              sessionStorage.setItem('username', this.username)
              sessionStorage.setItem('password', this.password)
              sessionStorage.setItem('integral', res.data.data.integral)
              this.$router.push('/')
            } else {
              this.$dialog.alert({
                message: res.data.error
              })
            }
          })
      }
    }
  }
}
</script>

<style>
.van-cell-group {
  margin-top: 100px;
}
.van-button {
  margin-top: 10px;
  margin-bottom: 30px;
}
</style>
