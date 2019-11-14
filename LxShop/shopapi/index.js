const express = require('express')
const app = express()
const md5 = require('md5')
const jsonwebtoken = require('jsonwebtoken')

// 定义一个密钥
const secret = "fgsdgsdgsdg./[sfgds[gsd[ffd*(&&^*%sajlfdnkvnkd#%&^*&54654/*-++++++@@@!!!"
// 解决跨域
app.use(require('cors')())

// 为了接收body中的参数需要添加
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

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

// 购物车
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
    db.query(sql, id, (err, data) => {
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

// 注册接口
app.post('/api/v1/regist', (req, res) => {
    // 接收表单中的参数
    let mobile = req.body.mobile
    let password = req.body.password
    // 验证数据
    let mobileRE = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
    if (!mobileRE.test(mobile)) {
        res.json({
            'ok': 0,
            'error': '手机号码格式不正确'
        })
        // 退出函数，后面的代码不再执行
        return
    }
    if (password.length < 6 || password.length > 18) {
        res.json({
            'ok': 0,
            'error': '密码必须是6-18位'
        })
        // 退出函数 后面的代码不再执行
        return
    }
    // 先到数据库中查询这个手机号是否已经存在
    let sql = 'SELECT COUNT(*) FROM shop_users WHERE mobile =?'
    db.query(sql, mobile, (error, data) => {
        // 如果执行 SQL 失败
        if (error) {
            res.json({
                'ok': 0,
                'error': error
            })
            // 退出函数 后面代码不再执行
            return
        } else {
            // 如果手机号码已经在数据库中存在
            if (data[0].c > 0) {
                res.json({
                    'ok': 0,
                    'error': '手机号码已经存在!请换一个'
                })
            } else {
                // 把账号插入到数据库中
                sql = 'INSERT INTO shop_users SET ?'
                // 获取当前时间的时间戳 以秒为单位
                let regtime = parseInt(new Date().getTime() / 1000)
                let data = {
                    // 字段：插入的值
                    mobile: mobile,
                    password: md5(password + secret),
                    regtime: regtime
                }
                // 执行 SQL 
                db.query(sql, data, (err, data) => {
                    if (err) {
                        res.json({
                            'ok': 0,
                            'error': err
                        })
                        // 退出函数 后面代码不再执行
                        return
                    } else {
                        res.json({
                            'ok': 1
                        })
                    }
                })
            }
        }
    })
})

// 登录接口
app.post('/api/v1/login', (req, res) => {
    // 接收表单中的参数
    let mobile = req.body.mobile
    let password = req.body.password
    // 验证数据
    let mobileRE = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
    if (!mobileRE.test(mobile)) {
        res.json({
            'ok': 0,
            'error': '手机号码格式不正确'
        })
        // 退出函数,后面代码不再执行
        return
    }
    // 先使用手机号码到数据库中查询这个账号的ID和密码查询出来 因为要用
    let sql = 'SELECT id, password FROM shop_users WHERE mobile =?'
    db.query(sql, mobile, (err, data) => {
        // 如果sql语句执行失败就返回失败的原因
        if (err) {
            res.json({
                'ok': 0,
                'error': err
            })
            // 退出函数，后面代码不再执行
            return
        } else {
            // 为了测试，把数据库的返回结果返回看看什么样
            if (data.length === 0) {
                res.json({
                    'ok': 0,
                    'error': '账号不存在!'
                })
                // 退出函数 后面代码不再执行
                return
            } else {
                // 如果账号存在 再判断用户输入的密码和数据库中查询出来的密码是否一致
                if (data[0].password === md5(password + secret)) {
                    // 登录成功之后，我们需要生成一个令牌
                    // 生成令牌要把这个用户的信息(ID等)保存到令牌
                    let token = jsonwebtoken.sign({
                        id: data[0].id
                    }, secret, {
                        expiresIn: 60 * 60 * 24 * 30 * 6
                    })
                    res.json({
                        'ok': 1,
                        'data': {
                            'token': token
                        }
                    })
                    // 退出函数，后面代码不在执行
                    return
                } else {
                    res.json({
                        'ok': 0,
                        'error': '密码错误'
                    })
                    return
                }
            }
        }
    })
})

// 监听端口启动服务
app.listen(9999, () => console.log('成功!监听:127.0.0.1:9999'))