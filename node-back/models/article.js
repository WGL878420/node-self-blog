let mongoose = require('mongoose')
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    // 文章标题
    title: String,
    // 封面图
    title_url: String,
    desc:String,
    content: String,
    // 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍
    title_type: { type: Number, default: 1 },
    // 文章分类
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }],
    // 其他元信息
    meta: {
        views: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
        comments: { type: Number, default: 0 },
    },
    // 创建日期
    create_time: String,
    // 最后修改日期
    update_time: { type: Date, default: Date.now },
})
adminSchema.index({ id: 1 });
const Admin = mongoose.model('Article', adminSchema);

module.exports = Admin