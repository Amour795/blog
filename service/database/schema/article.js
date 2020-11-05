const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型
const articleSchema = new Schema({
    articleId: ObjectId,
    title: String,
    createTime: { type: Date, default: Date.now() },
    updateTime: { type: Date, default: Date.now() },
    content: String,
    tag: Array,
    mainImg: String,
    thumbnail: String,
    publish: { type: Boolean, default: false },
})
//发布模型
mongoose.model('Article', articleSchema)