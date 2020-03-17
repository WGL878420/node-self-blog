let mongoose = require('mongoose')
const Schema = mongoose.Schema;
let counter = 1;
const categorySchema = new Schema({
    // 类目名称
    category_name: String,
    desc: String,
    created_time: Date,
    id: { type: Number, index: true }
})

categorySchema.index({ id: 1 });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category