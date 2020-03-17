let mongoose = require('mongoose')
const Schema = mongoose.Schema;
const jjArticlesSchema = new Schema({
    id:String,
    title:String,
    href:String,
    content:String,
    // tagNames: [{ type: mongoose.Schema.Types.ObjectId, ref: 'jjTags', required: true }],
})
const jjarticle = mongoose.model('jjarticles', jjArticlesSchema);

module.exports = jjarticle