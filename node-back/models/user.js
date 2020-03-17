let mongoose = require('mongoose')
const Schema = mongoose.Schema;
let counter = 1;
const adminSchema = new Schema({
    username: String,
    password: String,
    id: { type: Number, default: () => counter++},
    avator:String
})

adminSchema.index({ id: 0 });

const Admin = mongoose.model('Admin', adminSchema);

module.exports  = Admin