// 导入 express 模块
const express = require('express')
    // 创建 express 的服务器实例
const app = express()
    // 导入 cors 中间件
const cors = require('cors')
    // 将 cors 注册为全局中间件
app.use(cors())
    //导入joi包
const joi = require('@hapi/joi')

// 配置解析 `application/x-www-form-urlencoded` 格式的表单数据的中间件：
app.use(express.urlencoded({ extended: false }))

// 一定要在路由之前封装res.cc函数 中间件
app.use((req, res, next) => {
    // 默认值为1表示失败的情况 err可能是一个错误的对象 也可能是一个失败的字符串
    res.cc = function(err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 一定要在路由之前配置解析token中间件
const expressJWT = require('express-jwt')
const config = require('./config')

app.use(expressJWT({
    secret: config.jwtSecretKey
}).unless({ path: [/^\/api\//] }))




// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 导入并使用用户信息的路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)
    // 导入并使用文章分类的路由模块
const artCateRouter = require('./router/artcate')
app.use('/my/article', artCateRouter)
    // 导入并使用文章路由模块
const articleRouter = require('./router/article')
    // 为文章的路由挂载统一的访问前缀 /my/article
app.use('/my/article', articleRouter)

// 定义错误级别的中间案件
app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if (err instanceof joi.ValidationError) res.cc(err)
        // 省份认证失败
    if (err.name === 'UnauthorizedError') return res.cc('身份验证失败')
        // 未知的错误
    res.cc(err)

})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function() {
    console.log('api server running at http://127.0.0.1:3007')
})