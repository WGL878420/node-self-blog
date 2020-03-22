const superagent = require("superagent"); //发送网络请求获取DOM
const cheerio = require("cheerio"); //能够像Jquery一样方便获取DOM节点
const nodemailer = require("nodemailer"); //发送邮件的node插件
const ejs = require("ejs"); //ejs模版引擎
const fs = require("fs"); //文件读写
const path = require("path"); //路径配置
const schedule = require("node-schedule"); //定时器任务库
//配置项

//纪念日
let startDay = "2019/10/7";
//当地拼音,需要在下面的墨迹天气url确认
const local = "beijing/beijing";

//发送者邮箱厂家
let EmianService = "qq";
//发送者邮箱账户SMTP授权码
let EamilAuth = {
    user: "2351268139@qq.com",
    pass: "vcrlfqoiqnutecej"
};
//发送者昵称与邮箱地址
let EmailFrom = '"王桂林" <2351268139@qq.com>';

//接收者邮箱地
// let EmailTo = "wanggl@moveline.cn";
let EmailTo = "bella.zhang@mbac.cn";
//邮件主题
let EmailSubject = "发给我家小可爱的问候邮件";

// 爬取数据的url
const OneUrl = "http://wufazhuce.com/";
const WeatherUrl = "https://tianqi.moji.com/weather/china/" + local;

// 获取ONE内容
function getOneData() {
    return new Promise(function (resolve, reject) {
        superagent.get(OneUrl).end(function (err, res) {
            if (err) {
                reject(err);
            }
            let $ = cheerio.load(res.text);
            let selectItem = $("#carousel-one .carousel-inner .item");
            let todayOne = selectItem[0];
            let todayOneData = {
                imgUrl: $(todayOne).find(".fp-one-imagen").attr("src"),
                type: $(todayOne).find(".fp-one-imagen-footer").text().replace(/(^\s*)|(\s*$)/g, ""),
                text: $(todayOne).find(".fp-one-cita").text().replace(/(^\s*)|(\s*$)/g, "")
            };
            resolve(todayOneData)
        });
    })
}

// 获取天气提醒
function getWeatherTips() {
    return new Promise(function (resolve, reject) {
        superagent.get(WeatherUrl).end(function (err, res) {
            if (err) {
                reject(err);
            }
            let threeDaysData = [];
            let weatherTip = "";
            let $ = cheerio.load(res.text);
            $(".wea_tips").each(function (i, elem) {
                weatherTip = $(elem)
                    .find("em")
                    .text();
            });
            resolve(weatherTip)
        });
    })
}

// 获取天气预报
function getWeatherData() {
    return new Promise(function (resolve, reject) {
        superagent.get(WeatherUrl).end(function (err, res) {
            if (err) {
                reject(err);
            }
            let threeDaysData = [];
            let weatherTip = "";
            let $ = cheerio.load(res.text);
            $(".forecast .days").each(function (i, elem) {
                const SingleDay = $(elem).find("li");
                threeDaysData.push({
                    Day: $(SingleDay[0]).text().replace(/(^\s*)|(\s*$)/g, ""),
                    WeatherImgUrl: $(SingleDay[1]).find("img").attr("src"),
                    WeatherText: $(SingleDay[1]).text().replace(/(^\s*)|(\s*$)/g, ""),
                    Temperature: $(SingleDay[2]).text().replace(/(^\s*)|(\s*$)/g, ""),
                    WindDirection: $(SingleDay[3]).find("em").text().replace(/(^\s*)|(\s*$)/g, ""),
                    WindLevel: $(SingleDay[3]).find("b").text().replace(/(^\s*)|(\s*$)/g, ""),
                    Pollution: $(SingleDay[4]).text().replace(/(^\s*)|(\s*$)/g, ""),
                    PollutionLevel: $(SingleDay[4]).find("strong").attr("class")
                });
            });
            resolve(threeDaysData)
        });
    });
}

//发送邮件
function sendMail(HtmlData) {
    const template = ejs.compile(
        fs.readFileSync(path.resolve(__dirname, "./email.ejs"), "utf8")
    );
    const html = template(HtmlData);

    let transporter = nodemailer.createTransport({
        service: EmianService,
        port: 465,
        secureConnection: true,
        auth: EamilAuth
    });

    let mailOptions = {
        from: EmailFrom,
        to: EmailTo,
        subject: EmailSubject,
        html: html
    };
    transporter.sendMail(mailOptions, (error, info = {}) => {
        if (error) {
            sendMail(HtmlData); //再次发送
        }
        console.log("邮件发送成功");
        console.log("等待下一个执行任务时间");
    });
}

// 聚合
function getAllDataAndSendMail() {
    let HtmlData = {};
    // how long with
    let today = new Date();
    let initDay = new Date(startDay);
    let lastDay = Math.floor((today - initDay) / 1000 / 60 / 60 / 24);
    console.log(lastDay)
    let todaystr = today.getFullYear() + " / " + (today.getMonth() + 1) + " / " + today.getDate();
    HtmlData["lastDay"] = lastDay;
    HtmlData["todaystr"] = todaystr;
    Promise.all([getOneData(), getWeatherTips(), getWeatherData()]).then(
        function (data) {
            HtmlData["todayOneData"] = data[0];
            HtmlData["weatherTip"] = data[1];
            HtmlData["threeDaysData"] = data[2];
            sendMail(HtmlData)
        }
    ).catch(function (err) {
        getAllDataAndSendMail() //再次获取
    })
}
// getAllDataAndSendMail();
module.exports = getAllDataAndSendMail;
// let rule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [0, new schedule.Range(1, 6)];
// rule.hour = EmailHour;
// rule.minute = EmialMinminute;
// console.log('NodeMail: 开始等待目标时刻...')
// let j = schedule.scheduleJob('30 50 10 * * MON,TUE,WED,THU,FRI', function () {
//     console.log("执行任务");
//     getAllDataAndSendMail();
// });