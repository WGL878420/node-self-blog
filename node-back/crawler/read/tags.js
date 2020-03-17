const requestPromise = require('request-promise');//返回一个promise
const cheerio = require('cheerio');
const tags = async function (url) {
    let options = { url }
    let body = await requestPromise(options);
    let $ = cheerio.load(body);
    let tags = [];
    $('.item').each(function (item, item) {
        let $this = $(this);
        let image = $(this).find('div.thumb').first();
        let imageUrl = image.data('src');
        let indexOfSep = imageUrl.indexOf('?');
        if (indexOfSep != -1) {
            imageUrl = imageUrl.slice(0, indexOfSep);
        }
        let title = $this.find('.title').first();
        let name = title.text().trim();
        let subscribe = $this.find('.meta.subscribe').first();
        let article = $this.find('.article').first();
        tags.push({
            image: imageUrl,
            name,
            url: `https://juejin.im/tag/${encodeURIComponent(name)}`,
            subscribe: Number(subscribe.text().match(/(\d+)/)[1]),//订阅数
            article: Number(article.text().match(/(\d+)/)[1])//文章数
        });
    });
    // console.log(tags)
    return tags.slice(0, 5);
}
module.exports = tags;
// tags('https://juejin.im/subscribe/all');