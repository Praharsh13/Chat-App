import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import http from 'http'
import {Server} from 'socket.io'
import messageStr  from './utils/messageStructure.js'
import { userJoin,getCurUser,userLeave,roomUser } from './utils/manageUser.js'

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
const BOT="chatCord"

//Run when client connects
io.on("connection",socket=>{
    console.log("New Connection... ")

    //Join room response
    socket.on("joinRoom",({username,room})=>{

        const user=userJoin(socket.id,username,room)
//this connect the socket to that room
        socket.join(user.room)

        // only to the single user (himself)
    socket.emit("message",messageStr(BOT,`Welcome to chatCord ${user.username}`))

    //Broadcast when user connects to all user except that
    socket.broadcast.to(user.room).emit("message",messageStr(BOT,`${user.username} connect to chat`))

    //send all user and room info
    io.to(user.room).emit("roomInfo",{
        room:user.room,
        users:roomUser(user.room)
    })


    })

    
   

    //Listen for message from the client
    socket.on("chatMessage",(msg)=>{

        const user=getCurUser(socket.id)

        io.to(user.room).emit("message",messageStr(user.username,msg))

    })

     //Disconnect
     socket.on("disconnect",()=>{
        let user=userLeave(socket.id)
        console.log(user)

        if(user)
        {
            console.log(user)
            //this emit to all the user
            io.to(user.room).emit("message", messageStr(BOT,`${user.username} left the chat`))

                  //send all user and room info
        io.to(user.room).emit("roomInfo",{
            room:user.room,
            users:roomUser(user.room)
        })
        }

  
        
    })
})


server.listen(PORT,()=>console.log(`Running on ${PORT}`))