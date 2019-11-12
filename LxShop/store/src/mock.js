import Mock from 'mockjs'

// 首页轮播图片
Mock.mock('http://localhost:9999/api/v1/main_ad_images', 'get', {
  'ok': 1,
  'data|6': [
    {
      'image': '@image(375x200,#02adea)',
      'link': "@url('http', 'nuysoft.com')"
    }
  ]
})

// 首页推荐分类
Mock.mock('http://localhost:9999/api/v1/index_categories', 'get', {
  'ok': 1,
  'data|12': [{
    'id|+1': 1,
    'cat_name': '@ctitle'
  }]
})

// 首页商品列表
Mock.mock(/http:\/\/localhost:9999\/api\/v1\/index_goods\?page=\d+&per_page=\d+/, 'get', {
  'ok': 1,
  'data|20': [{
    'id|+1': 1,
    'goods_name': '@ctitle',
    'price': '@integer(100,10000)',
    'image': '@image(130)'
  }]
})
