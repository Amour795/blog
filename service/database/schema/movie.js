const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema

const movieListSchema = new Schema({
  AlsoknownAs: [],
  typs: [],
  duration: [],
  showArea: [],
  id: String,
  imgSrc: String,
  name: String,
  year: String,
  grade: String
})

//发布模型
mongoose.model('Movie', movieListSchema)