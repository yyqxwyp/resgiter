// 定义验证表单规则
// 导入定义验证规则
const Joi = require('joi')
const joi = require('joi')

// 定义name和alias的验证规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()
    // 定义分类id的校验规则
const id = joi.number().integer().min(1).required()

// 向外共享验证规则
exports.add_cate_schema = {
        body: {
            name,
            alias,
        }
    }
    // 
exports.delete_cate_schema = {
    params: {
        id,
    }
}

// 验证规则对象 根据id获取文章分类
exports.get_cate_schema = {
    params: {
        id,
    }
}

// 验证规则对象 更新分类
exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias,
    }
}