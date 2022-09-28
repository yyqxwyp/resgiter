// 导入数据库操作模块
const { result } = require('@hapi/joi/lib/base')
const db = require('../db/index')
const bcrypt = require('bcryptjs')



exports.gteUserinfo = (req, res) => {
    // res.send('ok')
    // 定义查询用户信息的sql语句
    const sql = `select id,username,nickname,email,user_pic from ev_users where id=?`
        // 调用db.query()只想sql语句
    db.query(sql, req.user.id, (err, results) => {
        // 执行sql语句失败
        if (err) return res.cc(err)
            // 执行sql语句成功，但是查询的结果可能为空
        if (results.length !== 1) return res.cc('用户信息失败')

        // 用户信息获取成功
        res.send({
            status: 0,
            message: '获取用户信息',
            data: results[0]
        })
    })
}


// 更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
    // res.send('ok')
    // 定义待执行的sql语句
    const sql = `update ev_users set ? where id=?`
        // 调用 `db.query()` 执行 SQL 语句并传参：
    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')

        // 修改用户信息成功
        return res.cc('修改用户基本信息成功！', 0)
    })
}

// 更新用户密码， 的处理函数
exports.updatepwd = (req, res) => {
    // res.send('ok')
    // 根据id查询用户的信息
    const sql = `select * from ev_users where id=?`

    // 执行 SQL 语句查询用户是否存在
    db.query(sql, req.user.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 检查指定 id 的用户是否存在
        if (results.length !== 1) return res.cc('用户不存在！')

        // TODO：判断提交的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (compareResult) return res.cc('旧密码错误');


        // 更新数据库中的密码
        // 定义更新密码的sql
        const sql = `update ev_users set password=? where id=?`
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
            // 调用db.query（）执行sql语句
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            // 执行sql语句失败
            if (err) return res.cc(err)
                // 判断影响的行数
            if (results.affectedRows !== 1) return res.cc('更新密码失败')
            res.cc('更新密码成功', 0)
        })

    })

}

// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
    // res.send('ok')
    // 定义更新头像的sql语句
    const sql = `update ev_users set user_pic=? where id=?`
        // 调用db.query执行sql语句
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        // 执行sql失败
        if (err) return res.cc('err')
            // 影响的行数是否为1
        if (results.affectedRows !== 1) return res.cc('更换头像失败！')
            // 成功
        res.cc('更换成功', 0)
    })
}