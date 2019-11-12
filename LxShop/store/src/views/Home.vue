<template>
  <div class="home">
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in images" :key="index">
       <van-image :src="item.image"></van-image>
      </van-swipe-item>
    </van-swipe>
    <!-- 首页推荐分类 -->
    <van-grid :column-num="4">
      <van-grid-item v-for="(item1,index1) in categories" :key="index1" :text="item1.cat_name" />
    </van-grid>
    <!-- 首页商品列表 -->
    <van-row>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
         <van-grid :column-num="2">
      <van-grid-item v-for="(item2,index2) in goods" :key="index2" class="qqq">
         <img :src="item2.image" alt />
            <p>{{item2.goods_name}}</p>
            <van-button type="warning" size="small" @click="addToCart(item2.id)">加入购物车</van-button>
            <p style="color:red">￥{{item2.price}}</p>
        </van-grid-item>
    </van-grid>
      </van-list>
    </van-row>
  </div>
</template>

<script>
export default {
  created () {
    this.getImage()
    this.getCategories()
    this.getGoods()
  },
  data () {
    return {
      images: [],
      categories: [],
      finished: false,
      //  当前第几页
      page: 1,
      //   每页加载多少条
      perPage: 20,
      goods: [],
      loading: false,
      shopcarlistId: [],
      count: 1
    }
  },
  methods: {
    // 获取轮播图
    getImage () {
      this.$http.get('/main_ad_images').then(res => {
        this.images = res.data.data
      })
    },
    // 获取分类数据
    getCategories () {
      this.$http.get('/index_categories').then(res => {
        this.categories = res.data.data
      })
    },
    // 加入购物车的方法
    addToCart (id) {
    // 先从浏览器中把这个对象取出来 然后再转回对象
      let cart = JSON.parse(localStorage.getItem('cart'))
      // 如果购物车是空的，就创建一个新的购物车对象
      if (cart === null) {
        // 创建购物车对象
        cart = {
          ids: [id],
          info: {
            [id]: {
              count: 1,
              ischk: true
            }
          }
        }
      } else {
        // 判断购物车中是否已经有了这件商品的ID
        // 如果没有就加入新商品信息 否则把数量加1
        if (cart.ids.indexOf(id) === -1) {
          // 把新的商品ID追回到商品ID 数组中
          cart.ids.push(id)
          // 用户商品作为下标 保存这件商品的数量和勾选状态
          cart.info[id] = {
            count: 1,
            ischk: true
          }
        } else {
          // 商品数量加1
          cart.info[id].count++
        }
      }
      // 先转成字符串，再保存到浏览器中
      localStorage.setItem('cart', JSON.stringify(cart))
    },
    // 获取商品列表
    getGoods (page, perPage) {
      this.$http
        .get(`index_goods?page=${this.page}&per_page=${this.perPage}`)
        .then(res => {
          res.data.data.forEach(item => {
            this.goods.push(item)
          })
          this.goods = res.data.data
        })
    },
    onLoad (page, perPage) {
      this.page++
      this.$http
        .get(`index_goods?page=${this.page}&per_page=${this.perPage}`)
        .then(res => {
          res.data.data.forEach(item => {
            this.goods.push(item)
          })
        })
      this.loading = false
      if (this.goods.length >= 24) {
        this.finished = true
      }
    }
  }
}
</script>

<style>
.home .qqq img {
  width: 130px;
  height: 130px;
}

</style>
