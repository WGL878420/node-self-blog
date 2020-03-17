const { body } = require('express-validator');
// 文章新增 字段验证
const validatorArticle = [
    body('title').isLength({min:1,max:20}),
    body('title_url').isLength({ min: 1 }),
    body('title_type').isLength({ min: 1 }),
    body('category').isLength({ min: 1 }),
    body('content').isLength({ min: 1 })
]
const validatorArticle2 = [
    body('title').not().isLength({ min: 6 })
]
module.exports = {
    validatorArticle,
    validatorArticle2
}