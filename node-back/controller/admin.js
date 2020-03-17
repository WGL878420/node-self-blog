const AdminModel = require('../models/user')
const url = require('url')//处理get请求参数
const assert = require('http-assert')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const responseClient = require('../until/send')
// import crypto from 'crypto'
// import formidable from 'formidable'
// import dtime from 'time-formater'

class Admin {
    constructor() {
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
        this.encryption = this.encryption.bind(this)
        this.changePassword = this.changePassword.bind(this)
    }
    async register(req, res, next) {
        let { query } = url.parse(req.url, true);
        let { username, password } = JSON.parse(query.data)  
        try {
            if (!username) {
                throw new Error('用户名不能为空')
            } else if (!password) {
                throw new Error('密码不能为空')
            }
        } catch (err) {
            res.send({
                success: false,
                type: 'GET_ERROR_PARAM',
                message: err.message,
            })
            return
        }
        try {
            const admin = await AdminModel.findOne({ username });
            if (admin) {
                responseClient(res, 200, 10001, '该用户已存在',null);
            } else {
                const newpassword = this.encryption(password);
                let user = ({ username, password: newpassword,avator:''});
                await AdminModel.create(user);
                responseClient(res, 200, 10000, '注册成功', null);
            }
        } catch (err) {
            responseClient(res, 200, 10001, '注册失败', null);
        }
    }
    async login(req,res,next) { 
        let { username, password } = req.body;
        try {
            const newpassword = this.encryption(password);
            const user = await AdminModel.findOne({ username }).select('+password');
            if (!user) { 
                responseClient(res, 200, 10001, '用户不存在');
                return false
            }
            if (newpassword.toString() != user.password) { 
                responseClient(res, 200, 10002, '密码错误');
                return false
            }
            let secretOrPrivateKey = 'i2u34y12oi3u4y8' // 这是加密的key（密钥） 
            try {
                const token = jwt.sign({ id: user._id }, secretOrPrivateKey, { expiresIn: 60 * 60 * 1 });// 1小时过期
                let data = {token}
                responseClient(res, 200, 10000, '登录成功', data);
            } catch (error) {
                console.log(error)
            }
        } catch (err) {
            res.send(err)
        }
    }
    async changePassword(req, res, next) { 
        let { password } = req.body;
        let id = (req.user._id)
        let user = await AdminModel.findById(id)
        if (!user) { 
            responseClient(res, 200, 10001, '用户不存在',null);
            return false
        }
        let newpassword = this.encryption(password);
        // AdminModel.findByIdAndUpdate(1212, { password: newpassword }, { multi: true }, function (err, docs) {
        //     if (err) console.log(err);
        //     console.log('更改成功：' + docs);
        // })
        try {
            await AdminModel.findByIdAndUpdate(id, { password: newpassword }, options);
            responseClient(res, 200, 10000, '修改成功', null);
        } catch (error) {
            responseClient(res, 200, 10003, error, null);
        }
    }
    encryption(password) {
        const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
        return newpassword
    }
    Md5(password) {
        const md5 = crypto.createHash('md5');
        return md5.update(password).digest('base64');
    }
    async userInfo(req, res, next) {
        let { username, avator, id } = req.user
        let obj = { username, avator,id} 
        responseClient(res, 200, 10000, '成功', obj);
    }
}

module.exports = new Admin()