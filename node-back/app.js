let express = require('express');
// 调用 express 实例，它是一个函数，不带参数调用时，会返回一个 express 实例，将这个变量赋予 app 变量。
var app = express()
 app.get('/api/user', function (req, res) {
     res.send('Hello World');
 });
app.listen(8080, function () {
    console.log('app is listening at port 8080');
});
