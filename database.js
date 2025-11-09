import mongoose from "mongoose"


//Connecting databases

const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true

        })

        console.log("MongoDB connected successfully")
    }catch(e){
        console.error("Mongo connectuon fail",e.message)
        process.exit(1)
    }

}

export default connectDB