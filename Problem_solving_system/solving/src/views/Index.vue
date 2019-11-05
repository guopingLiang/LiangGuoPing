<template>
  <div class="index">
    <van-nav-bar
      title="选择答题的分类"
    />

    <van-grid>
      <van-grid-item
      v-for="(item, index) in categories"
      :key="index"
      :text="item.cat_name"
      :to="'/categories/'+item.id+'/question'"
      @click="setCateName(item.cat_name)"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  // 获取页面的初始数据时
  created () {
    // res ：返回值
    this.$http.get('/categories').then(res => {
      this.categories = res.data.data
    })
  },
  data () {
    return {
      categories: [] // 保存所有的分类
    }
  },
  methods: {
    setCateName (catName) {
      // 保存到浏览器中
      sessionStorage.setItem('catName', catName)
    }
  }
}
</script>
