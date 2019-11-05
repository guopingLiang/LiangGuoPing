<template>
  <div class="login">
    <van-nav-bar
      title="登录"
      left-text="首页"
      left-arrow
      @click-left="$router.push('/')"
    />
    <van-cell-group>
      <van-field
        v-model.trim="username"
        left-icon="manager"
        required
        clearable
        label="用户名"
        placeholder="请输入用户名"
        :error-message="error.username"
      />
      <van-field
        v-model.trim="password"
        left-icon="lock"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="error.password"
      />
    </van-cell-group>

    <van-button @click="login">登录</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      // 保存所有的错误信息
      error: {
        username: '', // 用户名的错误信息
        password: '' // 密码的错误信息
      }
    }
  },
  methods: {
    login () {
      if (this.username === '') {
        this.error.username = '用户名不能为空！'
      } else {
        this.error.username = ''
      }
    }
  }
}
</script>
