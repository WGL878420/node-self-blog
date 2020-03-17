const jjArticles = require('../../models/jjArticles');
let articles = async function (articles) {
    try {
        for (let i = 0; i < articles.length; i++) {
            let oldArticle = await jjArticles.findOne({ id: articles[i].id });
            // 这里可以每一条查tagName 的id修改
            if (oldArticle) {
                await jjArticles.updateOne({ id: articles[i].id }, articles[i]);
            } else {
                await jjArticles.create(articles[i])
            }
        }
    } catch (error) {
        console.log(error);
    }
    
}
module.exports = {
    articles
}