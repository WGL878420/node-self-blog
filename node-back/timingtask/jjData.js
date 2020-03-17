let read = require('../crawler/read');
let write = require('../crawler/write');
let tagsUrl = 'http://juejin.im/subscribe/all';//所有的标签的列表
(async function () {
    try {
        let tags = await read.tags(tagsUrl);
        console.log('这是往数据库填充之前')
        await write.tags(tags);
        console.log('读完去填充到数据库')
        // let allArticles = {};
        //先获取 每个标签下面的文章的列表
        let articles = await read.articles(tags[0].url, tags[0].name);
        //因为不同标签下面的文章可能有重复，所以说要去重
        // articles.forEach(item => allArticles[item.id] = item);
        // //Object.keys  Object.values Object.entries K/V数组
        await write.articles(articles);
        console.log('全部读取成功')
        process.exit();//进程退出
    } catch (error) {
        console.log(error)
    }
})();