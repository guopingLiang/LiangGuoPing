import Mock from 'mockjs'

// 注册
Mock.mock('http://localhost:9999/api/v1/users/register', 'post', {
  'ok': '@integer(0,1)',
  'error': '用户名已存在！'
})

// 修改密码
Mock.mock('http://localhost:9999/api/v1/users/passwords', 'post', {
  'ok': '@integer(0,1)',
  'error': '修改失败！'
})

// 首页数据
Mock.mock('http://localhost:9999/api/v1/categories', 'get', {
  'ok': 1,
  'data|30-100': [{
    'id|+1': 1,
    'cat_name': '@ctitle',
    'member_cate_question_rate': '@integer(0,100)%'
  }]
})

Mock.mock(/http:\/\/localhost:9999\/api\/v1\/categories\/\d+\/question_count_info/, 'get', {
  'ok': 1,
  'data': {
    'total': 130,
    'right': 100,
    'wrong': 10,
    'undo': 20
  }
})

Mock.mock(/http:\/\/localhost:9999\/api\/v1\/categories\/\d+\/questions\?type=(all|wrong|right|undo)/, 'get', {
  'ok': 1,
  'data|30-100': [{
    'id|+1': 1,
    'title': '@ctitle',
    'options': '@ctitle(5,10),@ctitle(5,10),@ctitle(5,10),@ctitle(5,10)',
    'right': '@integer(0,3)',
    'category_id': 1
  }]
})

// 登录
Mock.mock('http://localhost:9999/api/v1/users/access_token', 'post', {
  'ok': '@integer(0,1)',
  'error': '用户名或者密码错误！',
  'data': {
    'token': 'fdgsgsdvdvse',
    'integral': '@integer(50,1000)'
  }
})
