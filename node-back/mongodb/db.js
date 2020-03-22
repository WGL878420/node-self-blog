// module.exports = app => {
//     const mongoose = require("mongoose")
//     mongoose.connect('mongodb://127.0.0.1:27017/blog', {
//         useNewUrlParser: true
//     })
//     require('require-all')(__dirname + '/../models')
// }
const mongoose = require('mongoose');
const chalk = require('chalk')
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://0.0.0.0:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open', () => {
    console.log(
        chalk.green('连接数据库成功')
    );
})

db.on('error', function (error) {
    console.error(
        chalk.red('数据库连接错误: ' + error)
    );
    mongoose.disconnect();
});

db.on('close', function () {
    console.log(
        chalk.red('数据库断开，重新连接数据库')
    );
    mongoose.connect('mongodb://127.0.0.1:27017/blog', { server: { auto_reconnect: true } });
});

module.exports = db