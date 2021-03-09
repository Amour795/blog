const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema

const movieDetailsSchema = new Schema({
    title: String,
    info: String,
    id: String,
    magnetic: [],
    doubanScore: String,
    AlsoknownAs: [],
    year: [],
    typs: [],
    duration:  [],
    showArea: [],
    toStar:  [],
    updateTime:  { type: Date, default: Date.now() },
})

//发布模型
mongoose.model('MovieDetails', movieDetailsSchema)