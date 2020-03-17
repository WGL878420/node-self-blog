/* eslint-disable no-undef,space-infix-ops */
const express = require('express');
const multer = require('multer');
const router = express.Router({
    mergeParams: true
});
const Auth = require('../middleware/auth')
const Admin = require('../controller/admin')
const Article = require('../controller/article')
const Category = require('../controller/category')
const Upload = require('../controller/upload')

const { validatorArticle } = require('../middleware/validator')
// 用户
router.get('/register', Admin.register)//注册
router.post('/login', Admin.login)//登录
router.post('/changePassword', Auth.verifyToken, Admin.changePassword)//登录
router.get('/userInfo', Auth.verifyToken, Admin.userInfo)//登录

// 文章
router.post('/article/add', Auth.verifyToken, validatorArticle, Article.articleAdd)
router.get('/article/delete', Auth.verifyToken, Article.articleDelete)
router.get('/article/detail', Auth.verifyToken, Article.articleDetail)
router.get('/article/list', Auth.verifyToken, Article.articleList)
// 分类
router.get('/category/list', Auth.verifyToken, Category.categoryList)
router.post('/category/add', Auth.verifyToken, Category.categoryAdd)

// 上传文件
let upload = multer({ dest: __dirname + '/../images' })
router.post('/upload', Auth.verifyToken, upload.single('file'),Upload.multer)
// 测试页面
router.get('/', async (ctx) => {
    ctx.response.type = 'text/html'
    ctx.response.body = '<h1>Hello World!</h1>'
})

module.exports = router