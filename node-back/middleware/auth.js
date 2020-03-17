const jwt = require('jsonwebtoken');
const AdminModel = require('../models/user')
class Auth { 
    async verifyToken(req, res, next) { 
        const token = String(req.headers.authorization || '').split(' ').pop();
        let secretOrPrivateKey = 'i2u34y12oi3u4y8';
        if (!token) {
            responseClient(res, 401, 10001, '请先登录', null);
            return false
        }
        const { id } = await jwt.verify(token, secretOrPrivateKey);
        if (!id) {
            responseClient(res, 401, 10001, '请先登录', null);
            return false
        }
        req.user = await AdminModel.findById(id)
        if (!req.user) {
            responseClient(res, 401, 10001, '请先登录', null);
            return false
        }
        await next()//中间件可以把相传的参数传到下一个需要函数req中
    }
}
module.exports = new Auth()