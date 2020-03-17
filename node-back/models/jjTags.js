let mongoose = require('mongoose')
const Schema = mongoose.Schema;
const jjTagsSchema = new Schema({
    // 类目名称
    image: String,
    name:String,
    url: String,
    subscribe: Number,//订阅数
    article: Number//文章数
})

const jjtags = mongoose.model('jjtags', jjTagsSchema);

module.exports = jjtags