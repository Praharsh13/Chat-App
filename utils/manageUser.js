const users=[]

//join user to chat
function userJoin(userId,username,room){
    const user={
        userId,username,room
    }

    users.push(user)
    return user
}

//get current user

function getCurUser(Id){
    let user= users.find((u)=>u.userId===Id)
    return user
}

// user leave
function userLeave(id){
    let userIndex=users.findIndex((i)=>i===id)
    if(userIndex!==-1){
        //returning the user
        return users.splice(userIndex,1)[0]
    }
}
//find current users in the room
function roomUser(room){
   const userInRoom=users.filter((user)=>user.room===room)
}
export {
    userJoin,
    getCurUser,
    userLeave,
    roomUser
}