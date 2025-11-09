import mongoose from 'mongoose'

const messageSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    room:{
        type:String,
        required:true
    },
    isBot:{
        type:Boolean,
        default:false
    },
    text:{
        type:String,
        required:true
    },
    time:{
        type:String,
        
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("Message",messageSchema)