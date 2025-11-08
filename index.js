import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import http from 'http'
import {Server} from 'socket.io'
import messageStr  from './utils/messageStructure.js'
import { userJoin,getCurUser } from './utils/manageUser.js'

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


    })

    
   

    //Listen for message from the client
    socket.on("chatMessage",(msg)=>{

        const user=getCurUser(socket.id)

        io.to(user.room).emit("message",messageStr(user.username,msg))

    })

     //Disconnect
     socket.on("disconnect",()=>{
        //this emit to all the user
        io.emit("message", messageStr(BOT,"User left the chat"))
    })
})


server.listen(PORT,()=>console.log(`Running on ${PORT}`))