const express = require('express');
const router = require('./user');
const rotuer = express.Router();

// 路由挂载

// 导入路由处理函数模块
const userinfo_handler = require('../router_handler/userinfo')
    // 导入验证数据的中间件
const expiresJoi = require('@escook/express-joi')
    // 导入需要的验证规则对象
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')

// 获取用户基本信息的路由
router.get('/userinfo', userinfo_handler.gteUserinfo)
    // 更新用户信息的路由
router.post('/userinfo', expiresJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)
    // 更新密码的路由
router.post('/updatepwd', expiresJoi(update_password_schema), userinfo_handler.updatepwd)

// 更换头像的路由
router.post('/update/avatar', expiresJoi(update_avatar_schema), userinfo_handler.updateAvatar)
module.exports = router;