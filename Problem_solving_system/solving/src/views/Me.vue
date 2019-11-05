<template>
  <div class="me">
    <van-row class="head">
      <van-col span="8">
        <van-uploader>
          <van-image
            round
            width="75"
            height=75
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </van-uploader>
      </van-col>
      <van-col span="8" class="mid">
        张三
        <br />
        <van-icon name="star-o" /> 12345
      </van-col>
      <van-col span="8">
        <van-button type="primary" size="small">修改密码</van-button>
      </van-col>
    </van-row>

    <van-grid class="right_rate" :column-num="3">
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
    </van-grid>

    <van-button type="primary" size="large">退出</van-button>

  </div>
</template>

<style>
  .me .head {
    background-color: #00649d;
    height: 100px;
    text-align: center;
    padding-top: 20px;
  }
  .me .mid {
    text-align: left;
    color: #fff;
  }
  .me .right_rate {
    border-top: 15px solid #eee;
    border-bottom: 15px solid #eee;
  }
</style>
