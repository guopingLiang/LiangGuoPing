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

// 下单接口
app.post('/api/v1/orders', (req, res) => {
    // 0. 先判断令牌，并且从令牌中解析出用户ID来
    // 获取令牌（令牌是在协议头的 Authorzation )
    let token = req.headers.authorization
    if (token === undefined) {
        res.json({
            'ok': 0,
            'error': '令牌不存在！'
        })
        return
    }
    // 要去掉令牌前7个字符（Bearer )
    token = token.substring(7)
    // 解析用户ID
    try {
        // 解析令牌并从令牌中取出 id 属性，并重命名为 userId
        var {
            id: userId
        } = jsonwebtoken.verify(token, secret)
    } catch (err) {
        res.json({
            'ok': 0,
            'error': '无效的令牌！'
        })
        return
    }
    // 1. 接收数据
    let address_id = req.body.address_id
    let cart = req.body.cart
    let pay_method = req.body.pay_method
    // 2. 判断库存量
    // 从购物车中提取出所有商品的 id
    let goodsId = [] // 保存所有的商品ID
    cart.forEach(v => {
        goodsId.push(v.goods_id)
    })
    goodsId = goodsId.join(',') // 转成字符串 1,2,3,4,5
    // 根据 ID 取库存量
    let sql = `SELECT id,stock,price FROM shop_goods WHERE id IN(${goodsId})`
    db.query(sql, (err, data) => {
        /*
            data 的数据结构：
        [
            {
                "id": 1,
                "stock": 430
            },
            {
                "id": 4,
                "stock": 543
            },
            {
                "id": 5,
                "stock": 7656
            },
            {
                "id": 6,
                "stock": 543
            }
        ]*/
        // 循环购物车判断库存量 并 计算总价格
        let totalPrice = 0 // 总价
        for (let i = 0; i < cart.length; i++) {
            // 用购物车中商品的ID 到 data 中找 id 相同的对象
            let goodsStock = data.find(v => {
                return v.id === cart[i].goods_id
            })
            // 判断库存量是否不足
            if (goodsStock.stock < cart[i].buy_count) {
                res.json({
                    'ok': 0,
                    'error': '库存量不足！不足商品的ID=' + cart[i].goods_id
                })
                return
            } else {
                totalPrice += cart[i].buy_count * goodsStock.price
            }
        }
        // 下订单01  -  先在订单基本信息表中插入一条记录
        // 根据收货地址 ID 把收货信息取出来
        db.query(`SELECT name shr_name,
                        mobile shr_mobile,
                        province shr_province,
                        city shr_city,
                        area shr_area,
                        address shr_address,
                        zipcode shr_zipcode 
                        FROM shop_addresses WHERE id = ?`, address_id, (err, data) => {
            // 先构造订单表中的数据（20位订单号）
            let orderSN = new Date().getTime().toString() + Math.random().toString().substring(2, 9)
            let orderData = {
                user_id: userId, // 从令牌中解析获取
                order_sn: orderSN, // 生成一个订单号：生成 20 位长的唯一的字符串 （当前的毫秒时间戳 + 随机数）
                addtime: parseInt(new Date().getTime() / 1000), // 当前时间戳，单位：秒
                pay_method: pay_method,
                status: 0, // 订单状态 
                ...data[0],
                total_price: totalPrice
            }
            // 插入到数据库中
            db.query('INSERT INTO shop_orders SET ?', orderData, (err, data) => {
                if (err) {
                    res.json({
                        'ok': 0,
                        'error': err
                    })
                } else {
                    res.json(data)
                }
            })

        })
    })
})

// 监听端口启动服务
app.listen(9999, () => console.log('成功!监听:127.0.0.1:9999'))