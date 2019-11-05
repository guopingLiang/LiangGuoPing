<template>
  <div>
    <!-- 表头 -->
    <van-nav-bar title="注册" left-arrow @click-left="onClickLeft" />
    <!-- 注册 -->
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
      <van-field
        v-model="confirm_password"
        type="password"
        label="确认密码"
        placeholder="请输入确认密码"
        required
        clearable
        left-icon="lock"
      />
      <van-button type="danger" size="large" @click="regist">注册</van-button>
      <van-button type="warning" size="large" @click="goLogin">已有账号？点击登录</van-button>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 2,
      username: '',
      password: '',
      confirm_password: ''
    }
  },
  methods: {
    // 路径跳转
    onClickLeft () {
      this.$router.push('/')
    },
    // 去登录页面
    goLogin () {
      this.$router.push('/login')
    },
    // 注册
    regist () {
      if (this.username === '') {
        this.$toast.fail('用户名不能为空!')
        return false
      } else if (this.password === '') {
        this.$toast.fail('密码不能为空!')
        return false
      } else if (this.confirm_password === '') {
        this.$toast.fail('确认密码不能为空!')
        return false
      } else if (this.confirm_password !== this.password) {
        this.$toast.fail('两次输入密码不一致!')
        return false
      } else {
        this.$http
          .post('/users/register', {
            username: this.username,
            password: this.password,
            confirm_password: this.confirm_password
          })
          .then(res => {
            if (res.data.ok === 1) {
              this.$toast.success('注册成功!')
              this.$router.push('/login')
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
