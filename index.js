import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import http from 'http'
import {Server} from 'socket.io'
import { createClient } from "redis";
import messageStr  from './utils/messageStructure.js'
import { createAdapter } from "@socket.io/redis-adapter";
import { userJoin,getCurUser,userLeave,roomUser } from './utils/manageUser.js'
import connectDB from './database.js'
import Message from './model/message.modal.js'
import moment from 'moment'

dotenv.config()
//Set up __dirname in ES module
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)



const app= express()

//create server and passing express
const server=http.createServer(app)

//create wrapper io
const io=new Server(server)

//Setting up static folder
app.use(express.static(path.join(__dirname,'public')))

const PORT=process.env.PORT
const BOT="chatCord";

let pubClient;
let subClient;

(async () => {
    pubClient = createClient({ url: "redis://127.0.0.1:6379" });
    await pubClient.connect();
    subClient = pubClient.duplicate();
    io.adapter(createAdapter(pubClient, subClient));
  })();

//Run when client connects
io.on("connection",socket=>{
    console.log("New Connection... ")

    //Join room response
    socket.on("joinRoom",async({username,room})=>{

        const user= await userJoin(socket.id,username,room)
       //this connect the socket to that room
        socket.join(user.room)


        //Fetch old chat history
        const messHistory=await Message.find({room:user.room}).sort({createdAt:1})

       socket.emit("oldMessage",messHistory)

    // only to the single user (himself)
    socket.emit("message",messageStr(BOT,`Welcome to chatCord ${user.username}`))
    //Save message to database

    await Message.create({
        username:BOT,
        room:user.room,
        text:`Welcome to chatCord ${user.username}`,
        isBot:true,
        time:moment().format('h:mm a')
    })



    //Broadcast when user connects to all user except that
    socket.broadcast.to(user.room).emit("message",messageStr(BOT,`${user.username} connect to chat`))

    //Save to database

    await Message.create({
        username:BOT,
        room:user.room,
        text:`${user.username} connect to chat`,
        isBot:true,
        time:moment().format('h:mm a')
    })


    //send all user and room info
    io.to(user.room).emit("roomInfo",{
        room:user.room,
        users:await roomUser(user.room)
    })


    })

    
   

    //Listen for message from the client
    socket.on("chatMessage",async (msg)=>{

        const user=await getCurUser(socket.id)

        io.to(user.room).emit("message",messageStr(user.username,msg))

        //Save to database

        await Message.create({
            username:user.username,
            room:user.room,
            text:msg,
            isBot:false,
            time:moment().format('h:mm a')
        })
    

    })

     //Disconnect
     socket.on("disconnect",async ()=>{
        let user=await userLeave(socket.id)
        console.log(user)

        if(user)
        {
            console.log(user)
            //this emit to all the user
            io.to(user.room).emit("message", messageStr(BOT,`${user.username} left the chat`))


            //Save to the database

            await Message.create({
                username:BOT,
                room:user.room,
                text:`${user.username} left the chat`,
                isBot:true,
                time:moment().format('h:mm a')
            })
        

                  //send all user and room info
        io.to(user.room).emit("roomInfo",{
            room:user.room,
            users:await roomUser(user.room)
        })
        }

  
        
    })
})


server.listen(PORT,()=>{
connectDB()
console.log(`Running on ${PORT}`)
}
)