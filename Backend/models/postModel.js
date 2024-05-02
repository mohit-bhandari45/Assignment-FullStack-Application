const mongoose =require("mongoose")

const postModel= new mongoose.Schema({
    title:String,
    tagline:String,
    body:String,
})

module.exports=mongoose.model("Post",postModel)