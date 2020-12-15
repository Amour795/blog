const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型
const messageIdSchema = new Schema({
  messageId: ObjectId,
  articleId: ObjectId,
  userId: ObjectId,
  userName: String,
  createTime: { type: Date, default: Date.now() },
  content: String,
  
})
//发布模型
mongoose.model('Message', messageIdSchema)