// 导入数据库操作模块
const { result } = require('@hapi/joi/lib/base')
const db = require('../db/index')
    // 这是路由处理函数模块
    // 获取文章分类列表的处理函数
exports.getArtCates = (req, res) => {
    // res.send('ok')
    // 定义查询分类列表数据的sql语句
    const sql = `select * from ev_artic_acte where is_delete=0 order by id asc`
        // 调用db.query这个方法执行sql语句
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取文章分类数据成功',
            data: results
        })
    })
}

// 新增文章分类
exports.addArticleCates = (req, res) => {
        //  插入
        // res.send('ok')
        // 定义查重的sql
        const sql = `select * from ev_artic_acte where name=? or alias=?`

        // 执行查重的sql
        db.query(sql, [req.body.name, req.body.alias], (err, results) => {
            // 判断是否执行sql
            if (err) return res.cc(err)
                // res.cc()

            // 判断数据的length
            if (results.length === 2) return res.cc('分类名称与分类别名被占用 请更换！')
                // length=1
            if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias)
                return res.cc('分类名称或分类别名被占用 请更换后重试i')
                    // 名称被占用
            if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用。请更换重试')
                // 分类别名被占用
            if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用。请更换重试')

            // tood两个都可以 执行添加的操作
            // 定义插入文章分类的sql
            const sql = `insert into  ev_artic_acte set ?`
                // 执行插入文章分类的sql语句
            db.query(sql, req.body, (err, results) => {
                if (err) return res.cc(err)
                if (results.affectedRows !== 1) return res.cc('新增文章分类失败')
                res.cc('新增成功', 0)

            })


        })



    }
    // 删除文章分类的处理函数
exports.deleteCateById = (req, res) => {
    // res.send('ok')
    // 定义删除文章的sql的语句
    const sql = `update ev_artic_acte set is_delete=1 where id=?`
        // 执行
    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')

        // 删除文章分类成功
        res.cc('删除文章分类成功！', 0)
    })
}

// 根据id获取文章分类的处理函数
exports.getArtCateById = (req, res) => {
    // res.send('ok')
    const sql = `select * from ev_artic_acte where id=?`
        // 
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('查询失败')
        res.send({
            status: 0,
            message: '获取文章成功',
            data: results[0]
        })
    })
}

// 根据id更新文章分类
exports.updateCateById = (req, res) => {
    // res.send('ok')
    const sql = `select * from ev_artic_acte where Id<>? and (name=? or alias=?)`
        // 执行查重操作
    db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 判断 分类名称 和 分类别名 是否被占用
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias)
            return res.cc('分类名称或分类别名被占用 请更换后重试i')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

        // TODO：更新文章分类
        // res.send('ok')
        const sql = `update ev_artic_acte set ? where Id=?`
            // 执行文章分类的sql
        db.query(sql, [req.body, req.body.Id], (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.cc(err)

            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')

            // 更新文章分类成功
            res.cc('更新文章分类成功！', 0)
        })
    })
}