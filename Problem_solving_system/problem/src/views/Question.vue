<template>
  <div class="question">
    <van-nav-bar
      :title="catName"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 四个切换按钮 -->
    <van-tabs v-model="questionType" @change="changeType">
      <van-tab name="all" :title="'全部(' + total + ')'"></van-tab>
      <van-tab name="right" :title="'做对的(' + right + ')'"></van-tab>
      <van-tab name="wrong" :title="'做错的(' + wrong + ')'"></van-tab>
      <van-tab name="undo" :title="'未做的(' + undo + ')'"></van-tab>
    </van-tabs>

    <!-- 显示题目 -->
    <div class="ti">
      <!-- 没有题目时显示按钮，否则显示题目 -->
      <van-button
      v-if="questions.length==0"
      @click="getQuestions"
      type="primary">开始答题</van-button>
      <div v-else>
        <h2>题目：{{questions[cur_que].title}}</h2>
        <van-radio-group v-model="answer">
          <van-radio
          v-for="(item, index) in questions[cur_que].options.split(',')"
          :key="index"
          :name="index"
          >
          {{alph[index]}}. {{item}}
          </van-radio>
        </van-radio-group>
        <van-button @click="submit">提交，进入下一道</van-button>
        &nbsp;
        <van-button @click="showAnswer=!showAnswer">查看答案</van-button>
        &nbsp;

        <van-tag
        v-if="showAnswer"
        type="warning"
        >
        正确答案：{{alph[questions[cur_que].right]}}
        </van-tag>
      </div>
    </div>

  </div>
</template>

<script>
import { Dialog, Toast } from 'vant'
export default {
  // 在页面加载完之后第一次先执行
  created () {
    this.$http.get(`/categories/${this.$route.params.id}/question_count_info`).then(res => {
      this.total = res.data.data.total
      this.right = res.data.data.right
      this.wrong = res.data.data.wrong
      this.undo = res.data.data.undo
    })
  },
  data () {
    return {
      questionType: 'all', // 选中的题目的类型，默认值是 all
      answer: '', // 勾选的答案
      showAnswer: false, // 是否显示答案
      alph: ['A', 'B', 'C', 'D'],
      catName: sessionStorage.getItem('catName'), // 分类名称
      total: 0,
      right: 0,
      wrong: 0,
      undo: 0,
      cur_que: 0, // 当前显示哪道题
      questions: [] // 保存所有的题目
    }
  },
  methods: {
    // 切换按钮时所数据重置为初始状态
    changeType (name, title) {
      // 把之前所有的题目清空
      this.questions = []
      // 把当前题目设置成0
      this.cur_que = 0
      // 勾选的答案清空
      this.answer = ''
      this.showAnswer = false
    },
    submit () {
      // 必须要勾选
      if (this.answer === '') {
        Dialog({ message: '不能为空' })
        // 退出不再向后执行
        return false
      }

      // 判断是否正确
      if (this.answer === this.questions[this.cur_que].right) {
        Toast('恭喜！回答正确')
      } else {
        Dialog({ message: '回答错误' })
      }
    },
    getQuestions () {
      // 调用接口获取数据
      this.$http.get(`/categories/${this.$route.params.id}/questions?type=${this.questionType}`).then(res => {
        // 保存题目
        this.questions = res.data.data
      })
    }
  }
}
</script>

<style>
.question .ti {
  padding: 20px;
}
.question .van-radio{
  margin-bottom: 10px;
}
</style>
