<template>

  <div class="app">
    <router-view />
    <van-tabbar :route="true">
      <van-tabbar-item
      to="/"
      icon="home-o"
      >答题</van-tabbar-item>
      <van-tabbar-item
      to="/topn"
      icon="chart-trending-o"
      >排行榜</van-tabbar-item>
      <van-tabbar-item
      to="/me"
      icon="user-o"
      >我</van-tabbar-item>
    </van-tabbar>
  </div>

</template>
