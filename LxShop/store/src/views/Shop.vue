<template>
  <div class="cart">
    <van-nav-bar title="购物车" />
    <div v-if="goods.length >0">
      <!-- 商品列表 -->
      <van-checkbox
        v-for="(item,index) in goods"
        :key="index"
        v-model="cart.info[item.id].ischk"
        :label-disabled="true"
      >
        <van-card
          :num="cart.info[item.id].count"
          :price="item.price"
          :title="item.goods_name"
          :thumb="item.image"
        >
          <!-- 购买数量步进器 -->
          <van-stepper slot="num" v-model="cart.info[item.id].count" />
          <!-- 自定义右下角该商品总价 -->
          <van-tag
            type="warning"
            slot="footer"
          >小计:￥{{(cart.info[item.id].count*item.price).toFixed(2)}}</van-tag>
        </van-card>
      </van-checkbox>
      <!-- 提交订单 -->
      <van-submit-bar :price="totalPrice" button-text="结算">
        <van-checkbox v-model="chkAll">全选</van-checkbox>
        <span slot="tip">
          你的收货地址不支持同城送,
          <span>修改地址</span>
        </span>
      </van-submit-bar>
    </div>
    <div v-else>
      购物车是空的!请去添加宝贝噢!
      <van-button type="primary" to="/">去首页</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cart: JSON.parse(localStorage.getItem('cart')), // 购物车数据
      goods: []
    }
  },
  created () {
    // 当购物车不为空时调用数据
    if (this.cart !== null) {
      // 把商品ID 转成字符串并调用接口
      this.$http.get('/goods?id=' + this.cart.ids.join(',')).then(res => {
        this.goods = res.data.data
      })
    }
  },
  // 计算属性
  computed: {
    // 全选按钮是否选中状态
    // 说明:默认计算属性只读的，高级用法：即有getter 又有setter
    chkAll: {
      // 当读取值时这个函数调用
      get: function () {
        // 循环所有商品判断是否都是选中的
        // 说明：使用for ... in 来循环对象
        for (let i in this.cart.info) {
          if (this.cart.info[i].ischk === false) {
            // 退出函数并返回 false
            return false
          }
        }
        return true
      },
      // 当修改值时这个函数调用，参数是新值
      set: function (newValue) {
        // 修改所有商品的勾选状态和当前的新值一样
        for (let i in this.cart.info) {
          this.cart.info[i].ischk = newValue
        }
      }
    },
    totalPrice: function () {
      let sum = 0 // 保存总价
      // 循环所有商品
      this.goods.forEach(v => {
        // 只有勾选的才计算
        if (this.cart.info[v.id].ischk) {
          sum += v.price * this.cart.info[v.id].count
        }
      })
      // 结果返回(因为合计是以分为单元的，所有要转换为元)
      return sum * 100
    }
  },
  // 监听器：监听一个数据，当这个数据发生变化时出发一个函数
  // 注意：如果监听的数据是一个对象，那么需要深度监听
  watch: {
    cart: {
      deep: true, // 深度监听（监听对象时）
      handler: function () {
        // 把cart写到浏览器中
        localStorage.setItem('cart', JSON.stringify(this.cart))
      }
    }
  }
}
</script>

<style>
.cart {
  margin-bottom: 100px;
}

.cart .van-submit-bar {
  bottom: 50px;
}
</style>
