const express = require('express');
const app = express();
// const cors = require("cors");
const bodyParser = require('body-parser');
const router = require('./router/index');
const path = require('path');
const db = require('./mongodb/db');
app.set('secret', 'i2u34y12oi3u4y8')//这是token加密的key（密钥）
// app.use(cors());//解决跨域
app.all('*', (req, res, next) => {
    const { origin, Origin, referer, Referer } = req.headers;
    const allowOrigin = origin || Origin || referer || Referer || '*';
    res.header("Access-Control-Allow-Origin", allowOrigin);
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); //可以带cookies
    res.header("X-Powered-By", 'Express');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(bodyParser.json());

app.use('/api', router);

app.use('/', express.static(__dirname + '/admin'))
app.use('/images', express.static(__dirname + '/images')) //可以通过路由 /images来访问静态文件夹的内容

// let process = require('process')

// let port = (function () {
//     if (typeof (process.argv[2]) !== 'undefined') { // 如果输入了端口号，则提取出来
//         if (isNaN(process.argv[2])) { // 如果端口号不为数字，提示格式错误
//             throw 'Please write a correct port number.'
//         } else { // 如果端口号输入正确，将其应用到端口
//             return process.argv[2]
//         }
//     } else { // 如果未输入端口号，则使用下面定义的默认端口
//         return 8080
//     }
// })()

 
// 定时任务
const schedule = require('node-schedule');
// let { spawn } = require('child_process');
// // //spawn是用来实现子进程的
// const scheduleCronstyle = () => {
//     // 每分钟的第30秒触发： '30 * * * * *'
//     // 每小时的1分30秒触发 ：'30 1 * * * *'
//     // 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
//     // 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
//     // 2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'
//     // 每周1的1点1分30秒触发 ：'30 1 1 * * 1'
//     schedule.scheduleJob('30 1 1 * * *', () => {
//         let child = spawn(process.execPath, [path.resolve(__dirname, './timingtask/jjData.js')]);
//         child.stdout.pipe(process.stdout);//把子进程里的正常输出重定向到父进程里
//         child.stderr.pipe(process.stderr);//把子进程里的错误输出重定向到父进程里
//         child.on('close', function () {
//             console.log('更新任务完毕');
//         });
//     });
// }
// scheduleCronstyle();
// let jjData = require('./timingtask/jjData')
let sendEmail = require('./sendEmail/sendEmailToGirlFriend');
schedule.scheduleJob('30 25 8 * * MON,TUE,WED,THU,FRI', function () {
    console.log("执行任务");
    sendEmail();
});
app.listen(8080,() => { 
    console.log(`监听8080端口`)
})