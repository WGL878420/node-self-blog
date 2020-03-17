const CategoryModel = require('../models/category')
const url = require('url')//处理get请求参数
const responseClient = require('../until/send')
const moment = require('moment')
class Admin {
    constructor() {
        this.categoryList = this.categoryList.bind(this)
        this.categoryAdd = this.categoryAdd.bind(this)
    }
    async categoryList(req, res, next) {
        let { query } = url.parse(req.url, true);
        let category_name = query.title;
        let desc = query.desc;
        let page = Number(query.page);
        let per_page = Number(query.per_page);
        let obj = {};
        let categoryList = null;
        let orList = [];
        category_name ? obj.category_name = { category_name: { $regex: new RegExp(category_name, 'i') } } : '';
        desc ? obj.desc = { desc: { $regex: new RegExp(desc, 'i')} } : '';
        if (Object.keys(obj)) { 
            for (let key in obj) {
                orList.push(obj[key])
            }
        }
        let searchObj = {}
        orList.length >0 ? searchObj = { $or: orList } : searchObj = {};
        try {
            categoryList = await CategoryModel.find(searchObj).skip((page - 1) * per_page).limit(per_page).lean();
            let total = await CategoryModel.countDocuments(searchObj);
            categoryList.forEach(el => {
                let time = el.created_time;
                el.created = moment(time).format('YYYY-MM-DD HH:mm:ss');
            });
            let data = { data: categoryList, page, per_page, total }
            responseClient(res, 200, 10000, '成功', data)
        } catch (err) {
            responseClient(res, 200, 10001, err, null)
        }
    }
    async categoryAdd(req, res, next) {
        let { category_name, desc } = req.body;
        let created_time = new Date().getTime();
        let category = ({ category_name, desc, created_time: created_time });
        try {
            let isThere = await CategoryModel.findOne({ category_name });
            if (isThere) { 
                responseClient(res, 200, 10001, '不能重复插入', null);
                return false
            }
            await CategoryModel.create(category);
            responseClient(res, 200, 10000, '成功', null)
        } catch (err) { 
            responseClient(res, 200, 10001, err, null)
        }
        
    }
}
module.exports = new Admin()