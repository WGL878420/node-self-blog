const ArticleModel = require('../models/article')
const url = require('url')//处理get请求参数
const responseClient = require('../until/send');
const { validationResult } = require('express-validator');
const moment = require('moment')
class Article {
    constructor() {
        // this.changePassword = this.changePassword.bind(this)
    }
    async articleAdd(req, res, next) { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            responseClient(res, 200, 10001, '字段名称不合法', errors.array())
            return false
        }
        let { title, title_url, category, title_type, content, type='add'} = req.body;
        let obj_id = {}
        req.body._id ? obj_id._id = req.body._id : '';
        let obj = ({
            title, title_url, category, title_type, content
        });
        try {
            if (!req.body._id) {
                let isThere = await ArticleModel.findOne({ title });
                if (isThere) {
                    responseClient(res, 200, 10001, '不能重复插入', null);
                    return false
                } else { 
                    await ArticleModel.create(obj);
                }
            } else { 
                await ArticleModel.updateOne(obj_id,obj);
            }
            
            responseClient(res, 200, 10000, '成功', null)
        } catch (error) {
            responseClient(res, 200, 10001, '失败', null)
        }
    }
    async articleList(req, res, next) { 
        let { query } = url.parse(req.url, true);
        let page = Number(query.page);
        let per_page = Number(query.per_page)
        try {
            let total = await ArticleModel.countDocuments();
            let article = await ArticleModel.find().populate('category').skip((page - 1) * per_page).limit(per_page) ;
            let obj = { data: article, total}
            responseClient(res, 200, 10000, '成功', obj)
        } catch (error) {
            responseClient(res, 200, 10001, error, null)
        }
    }
    async articleDelete(req, res, next) { 
        let { query } = url.parse(req.url, true);
        let id = query.id;
        console.log(id);
        try {
            // remove 已经废弃 请使用deleteOne、deleteMany或bulkWrite来代替。
            await ArticleModel.deleteOne({ _id: id}) 
            responseClient(res, 200, 10000, '成功', null)
        } catch (error) {
            responseClient(res, 200, 10001, error, null)
        }
    }
    async articleDetail(req, res, next) { 
        let { query } = url.parse(req.url, true);
        let id = query.id;
        try {
            let articleOne = await ArticleModel.findById({ _id: id });
            console.log(articleOne)
            responseClient(res, 200, 10000, '成功', articleOne)
        } catch (error) {
            responseClient(res, 200, 10001, error, null)
        }
    }
}

module.exports = new Article()