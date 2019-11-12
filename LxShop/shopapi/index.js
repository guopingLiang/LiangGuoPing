const express = require('express')
const app = express()

// 解决跨域
app.use(require('cors')())

// 引入mysql
const mysql = require('mysql')
// 配置mysql
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: '11.07'
})
// 连接mysql
db.connect()

// 首页轮播图接口
app.get('/api/v1/main_ad_images', (req, res) => {
    // 查询数据库取数据
    let sql = 'SELECT image,link FROM shop_swipe_images'
    // 执行sql语句
    db.query(sql, (err, data) => {
        if (err) {
            // 返回前数据
            res.json({
                'ok': 0,
                'error': err
            })
        } else {
            res.json({
                'ok': 1,
                'data': data
            })
        }
    })
})

// 首页分类推荐
app.get('/api/v1/index_categories', (req, res) => {
    // 查询数据库取数据
    let sql = 'SELECT id,cat_name FROM shop_categories'
    // 执行sql语句
    db.query(sql, (err, data) => {
        if (err) {
            // 返回前数据
            res.json({
                'ok': 0,
                'error': err
            })
        } else {
            res.json({
                'ok': 1,
                'data': data
            })
        }
    })
})

// 商品接口
app.get('/api/v1/index_goods', (req, res) => {
    // 接收page和pre_page两个参数 如果没有传默认是1和20
    let page = req.query.page || 1
    let pre_page = req.query.pre_page || 20
    // 当前的下标 (当前页-1)*per_page
    let offset = (page - 1) * pre_page
    let sql = `SELECT * FROM shop_goods LIMIT ${offset},${pre_page}`
    // 执行SQL语句
    db.query(sql, (err, data) => {
        // 如果错误就返回错误信息 如果成功就返回数据
        if (err) {
            // 返回前数据
            res.json({
                'ok': 0,
                'error': err
            })
        } else {
            res.json({
                'ok': 1,
                'data': data
            })
        }
    })
})

app.get('/api/v1/goods', (req, res) => {
    // 接收商品id
    let id = req.query.id
    // 拼 ?
    let wenhao = [] //保存所有的问号
    // 把id转成数组
    id = id.split(',')
    // 循环id拼?
    id.forEach(v => {
        wenhao.push('?')
    })
    // 把问号的数组转成字符串
    wenhao = wenhao.join(',')

    let sql = `SELECT * FROM shop_goods WHERE id IN(${wenhao})`
    db.query(sql,id, (err, data) => {
        // 如果错误就返回错误信息 如果成功就返回数据
        if (err) {
            // 返回前数据
            res.json({
                'ok': 0,
                'error': err
            })
        } else {
            res.json({
                'ok': 1,
                'data': data
            })
        }
    })
})

// 监听端口启动服务
app.listen(9999, () => console.log('成功!监听:127.0.0.1:9999'))