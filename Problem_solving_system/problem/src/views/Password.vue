<template>
  <div>
    <!-- 表头 -->
    <van-nav-bar title="修改密码" left-arrow @click-left="onClickLeft" />
    <!-- 修改密码 -->
    <van-cell-group>
      <van-field
        v-model="old_password"
        type="password"
        label="原密码"
        placeholder="请输入原密码"
        required
        clearable
        left-icon="lock"
      />
      <van-field
        v-model="new_password"
        type="password"
        label="新密码"
        placeholder="请输入新密码"
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
      <van-button type="danger" size="large" @click="regist">提交</van-button>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      old_password: '',
      new_password: '',
      confirm_password: ''
    }
  },
  methods: {
    //   返回按钮
    onClickLeft () {
      this.$router.push('/me')
    },
    // 提交
    regist () {
      if (this.old_password === '') {
        this.$toast.fail('原密码不能为空!')
        return false
      } else if (this.new_password === '') {
        this.$toast.fail('新密码不能为空!')
        return false
      } else if (this.confirm_password === '') {
        this.$toast.fail('确认密码不能为空!')
        return false
      } else if (this.confirm_password !== this.new_password) {
        this.$toast.fail('两次输入密码不一致!')
        return false
      } else if (this.old_password !== sessionStorage.getItem('password')) {
        this.$toast.fail('原密码输入错误!')
        return false
      } else {
        this.$http
          .post('/users/passwords', {
            old_password: this.old_password,
            new_password: this.new_password,
            confirm_password: this.confirm_password
          })
          .then(res => {
            if (res.data.ok === 1) {
              sessionStorage.clear()
              this.$toast.success('修改成功!')
              this.$router.push('/login')
            } else {
              this.$dialog.alert({
                message: res.data.error })
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
