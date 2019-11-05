<template>
  <div class="topn">
    <van-tabs>
      <van-tab title="全部" />
      <van-tab
      :key="index.id"
      v-for="index in categories"
      :title="index.cat_name" />
    </van-tabs>

    <table class="table" cellspacing="0">
      <tr class="head">
        <th>排名</th>
        <th>姓名</th>
        <th>积分</th>
      </tr>
      <tr>
        <td>1</td>
        <td>张三</td>
        <td>123</td>
      </tr>
      <tr>
        <td>2</td>
        <td>李四</td>
        <td>122</td>
      </tr>
      <tr>
        <td>3</td>
        <td>王五</td>
        <td>121</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categories: [{
        'id': 1,
        'cat_name': 'HTML'
      }, {
        'id': 2,
        'cat_name': 'CSS'
      }, {
        'id': 3,
        'cat_name': 'JavaScript'
      }, {
        'id': 4,
        'cat_name': 'Vue'
      }, {
        'id': 5,
        'cat_name': 'Express'
      }, {
        'id': 6,
        'cat_name': 'Node'
      }]
    }
  }
}
</script>

<style>
  .topn .table {
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }
  .topn th {
    padding: 5px;
    background-color: #eee;
  }
  .topn td {
    color: #666;
    padding: 3px;
  }
</style>
