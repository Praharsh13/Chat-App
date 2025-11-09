import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    room:{
        type:String,
        required:true
    },
    socketId:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

export default mongoose.model("User",userSchema)