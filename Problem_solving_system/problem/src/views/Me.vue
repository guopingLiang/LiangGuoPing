<template>
  <div>
    <!-- 头部 -->
    <van-row type="flex" justify="space-around" class="login-box">
      <van-col span="6">
       <van-uploader>
          <van-image
            round
            width="75"
            height=75
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </van-uploader>
      </van-col>
      <van-col span="6">
        <div class="username">{{username}}</div>
        <div class="integral">
          <van-icon name="gem-o" />
          {{integral}}
        </div>
      </van-col>
      <van-col span="6">
        <van-button type="primary" size="small" @click="goPassword">修改密码</van-button>
      </van-col>
    </van-row>
    <!-- 数据 -->
    <van-grid :column-num="3" class="categories">
      <van-grid-item v-for="(item,index) in categories" :key="index">
        <div>{{item.cat_name}}</div>
        <div class="accuracy">(正确率:{{item.member_cate_question_rate}})</div>
      </van-grid-item>
    </van-grid>
    <!-- 退出按钮 -->
    <van-button type="info" size="large" class="logout" @click="logout">退出</van-button>
    <!-- 底部 -->
    <van-tabbar v-model="active" fixed>
      <van-tabbar-item icon="home-o" @click="goCategories">答题</van-tabbar-item>
      <van-tabbar-item icon="bar-chart-o" @click="toTopn">排行榜</van-tabbar-item>
      <van-tabbar-item icon="manager-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  beforeCreate () {
    // 未登录就跳到登录页
    let token = sessionStorage.getItem('token')
    if (token === null) {
      this.$router.push('/login')
      return false
    }
  },
  // 这个页面创建完之后马上执行
  created () {
    // 加载数据
    this.username = sessionStorage.getItem('username')
    this.integral = sessionStorage.getItem('integral')
    this.getList()
  },
  data () {
    return {
      username: '',
      integral: 0,
      active: 2,
      categories: []
    }
  },
  methods: {
    // 获取首屏数据
    getList () {
      this.$http.get('/categories').then(res => {
        this.categories = res.data.data
      })
    },
    // 路径跳转
    goCategories () {
      if (this.active === 0) {
        this.$router.push('/')
      }
    },
    toTopn () {
      if (this.active === 1) {
        this.$router.push('/topn')
      }
    },
    goPassword () {
      this.$router.push('/password')
    },
    // 退出功能
    logout () {
      sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.login-box {
  padding: 25px;
  background-color: #00659f;
}
.username {
  font-weight: 700;
  color: white;
  font-size: 20px;
  margin-bottom: 4px;
}
.integral {
  color: white;
}
.van-cell-group {
  margin-top: 100px;
}
.logout {
  margin-top: 20px;
    background-color: #00659f;
}
.categories{
  border-top: 16px solid #eee;
    border-bottom: 16px solid #eee;
}
.accuracy {
  color: red;
  font-size: 12px;
}
</style>
