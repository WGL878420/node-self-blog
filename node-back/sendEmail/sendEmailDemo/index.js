const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // SSL安全链接
    auth: {
        user: '2351268139@qq.com',
        pass: 'vcrlfqoiqnutecej',// 这里密码不是qq密码，是你设置的smtp授权码
    }
});

let mailOptions = {
    from: '"王桂林" <2351268139@qq.com>', // 写信人邮箱
    to: 'xieyunan66@163.com', // 收件人邮箱账号
    subject: 'Hello', // 主题
    // 发送text或者html格式
    html: '<b>Hello world?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('邮件发送成功', info.messageId);
});