// 发布新文章处理函数
exports.addArticle = (req, res) => {
        res.send('ok')
    }
    // 导入解析formdata格式表单数据的包
    // const multer = require('multer')
    // const path = require('path')

// // 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
// const upload = multer({ dest: path.join(__dirname, '../uploads') })






// // 创建multer的实例对象
// // 发布新文章的处理函数
// exports.addArticle = (req, res) => {
//     console.log(req.body);
//     console.log(req.file);
//     res.send('ok')
// }