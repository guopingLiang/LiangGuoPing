import Mock from 'mockjs'

Mock.mock('http://localhost:9999/api/v1/categories', 'get', {
  'ok': 1,
  'data|30-100': [
    {
      'id|+1': 1,
      'cat_name': '@ctitle'
    }
  ]
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
  'data|30-100': [
    {
      'id|+1': 1,
      'title': '@ctitle',
      'options': '@ctitle(5,10),@ctitle(5,10),@ctitle(5,10),@ctitle(5,10)',
      'right': '@integer(0,3)',
      'category_id': 1
    }
  ]
})
