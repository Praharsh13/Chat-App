import Message from "../model/message.modal.js"
import User from "../model/user.modal.js"






//join user to chat
async function userJoin(userId,username,room){


    const user=await User.create({
        username,
        room,
        socketId:userId

    })

   // users.push(user)
    return user
}

//get current user

async function getCurUser(Id){
   // let user= users.find((u)=>u.userId===Id)
   let user= await User.findOne({
    socketId:Id
   })
    return user
}

// user leave
async function userLeave(id){
    // let userIndex=users.findIndex((i)=>i.userId===id)
    // if(userIndex!==-1){
    //     //returning the user
    //     return users.splice(userIndex,1)[0]
    // }
    let user=await User.findOne({
        socketId:id
    })

    if(user){
        await User.deleteOne({socketId:id})
    }
    return user
}
//find current users in the room
async function roomUser(room){
   const userInRoom=await User.distinct('username',{room})
   
   return userInRoom
}
export {
    userJoin,
    getCurUser,
    userLeave,
    roomUser
}