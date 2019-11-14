<template>
  <div class="login">
    <van-nav-bar
      title="注册"
      left-arrow
      @click-left="$router.push('/')" />

      <van-cell-group>
        <van-field
          v-model="form.mobile"
          required
          clearable
          left-icon="manager"
          label="手机号"
          placeholder="请输入11位手机号"
          :error-message="error.mobile"
        />
        <van-field
          v-model="form.password"
          type="password"
          label="密码"
          required
          clearable
          placeholder="请输入6~18位密码"
          left-icon="lock"
          :error-message="error.password"
        />
        <van-field
          v-model="form.cpassword"
          type="password"
          label="确认密码"
          required
          clearable
          placeholder="请输入确认密码"
          left-icon="lock"
          :error-message="error.cpassword"
        />
      </van-cell-group>
      <van-button @click="regist" class="login-btn" type="danger">注册</van-button>
      <van-button @click="$router.push('/login')" class="login-btn" type="warning">已有账号？点击登录</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        mobile: '',
        cpassword: '',
        password: ''
      },
      error: {
        mobile: '',
        password: '',
        cpassword: ''
      }
    }
  },
  methods: {
    regist () {
      let mobileRE = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (!mobileRE.test(this.form.mobile)) {
        this.error.mobile = '手机格式不正确'
        return false
      }

      if (this.form.password.length < 6 || this.form.password.length > 18) {
        this.error.password = '密码必须是6~18位'
        return false
      }

      if (this.form.password !== this.form.cpassword) {
        this.error.cpassword = '两次密码输入不一致'
        return false
      }

      // 注册接口
      this.$http.post('/regist', this.form).then(res => {
        if (res.data.ok === 1) {
          // 提示
          this.$toast('注册成功！')
          // 跳转
          this.$router.push('/login')
        } else {
          this.$toast(res.data.error)
        }
      })
    }
  }
}
</script>

<style>
  .login .van-cell-group {
    margin-top: 100px;
  }
  .login {
    text-align: center;
  }
  .login .login-btn {
    margin-top: 50px;
    width: 70%;
  }
</style>
