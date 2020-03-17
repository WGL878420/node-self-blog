const request = require('request-promise');//返回一个promise
const cheerio = require('cheerio');
let articles = async function (url, tagName) {
    console.log(`开始读取${tagName}标签下面的文章列表`)
    let options = { url };
    let body = await request(options);
    let $ = cheerio.load(body);
    let articles = [];
    let items = $('.item .title');
    for (let i = 0; i < items.length; i++) { 
        let item = items[i];
        let $this = $(item);
        let href = $this.attr('href').trim();
        if (!href.startsWith('/entry')) { 
            let title = $this.text().trim();
            let id = href.match(/\/(\w+)$/)[1];
            href = `https://juejin.im` + href
            // console.log(href, '爬取到的href');
            let { content, tagNames } = await article(id,href);
            articles.push({
                id,
                title,
                href,
                content,
                tagNames
            })
        }
    }
    return articles
}
let article = async function (id,url) { 
    let options = {
        url,
        transform: function (body) {
            return cheerio.load(body);//$
        }
    }
    let $ = await request(options);
    let article = $('.main-container');
    let title = article.find('h1.article-title').text().trim();//文章的标题
    let content = article.find('.article-content').html();//文章的内容
    let tags = article.find('.tag-title');
    let tagNames = [];
    tags.each(function (index, item) {
        let $this = $(item);
        let name = $this.text();
        tagNames.push(name)
    });
    return {
        id,
        title,
        content,
        tagNames
    }
}
// exports.articles = articles;
// exports.article = article;
// articles('https://juejin.im/tag/%E5%89%8D%E7%AB%AF')
module.exports = {
    articles,
    article
}