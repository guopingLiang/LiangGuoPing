<template>
  <div class="app">
    <router-view />
    <van-tabbar :route="true">
      <van-tabbar-item icon="home-o" to="/">答题</van-tabbar-item>
      <van-tabbar-item icon="chart-trending-o" to="/topn">排行榜</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/me">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
