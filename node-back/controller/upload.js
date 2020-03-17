const responseClient = require('../until/send');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
class Upload {
    constructor() {
         
    }
    async multer(req, res, next) {
        if (req.file.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
            responseClient(res, 200, 10001, '上传文件不能为空', null)
            return
        } else {
            let file = req.file;
            let fileInfo = {};
            fs.renameSync('./images/' + file.filename, './images/' + file.originalname);//这里修改文件名字，比较随意。
            // 获取文件信息
            fileInfo.mimetype = file.mimetype;
            fileInfo.originalname = file.originalname;
            fileInfo.size = file.size;
            fileInfo.path = file.path;

            // 设置响应类型及编码
            res.set({
                'content-type': 'application/json; charset=utf-8'
            });
            console.log(fileInfo)
            fileInfo.url = `http://localhost:8080/images/${fileInfo.originalname}`
            responseClient(res, 200, 10000, '上传成功', fileInfo)
        }
    }
}
module.exports = new Upload()