const {Schema,model}= require("mongoose")
const Userschema = new Schema({
    email:String,
    password:String,
    age:Number,
    role:{
        type:String,
        enum:["HR","Employe","Guests"]
    }
})

const UserModel = model("user",Userschema)
module.exports= UserModel