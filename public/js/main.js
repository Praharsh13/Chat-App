const chatForm= document.getElementById('chat-form')
const messageBar= document.querySelector(".chat-messages")
const leaveBTN=document.getElementById("leave-btn")
const roomName=document.getElementById("room-name")
const userList=document.getElementById("users")

//Get username and room from URL
const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
})

console.log(username,room)
const socket=io()

//Join room event and send to backend 
socket.emit("joinRoom",{username,room})

//Load old message
socket.on("oldMessage",(messHistory)=>(
    messHistory.forEach((mess)=>(
        ShowMessage(mess)
    ))
))

//Add room information
socket.on("roomInfo",({room,users})=>{
    addRoomName(room)
    userListToRoom(users)
})
//Message from server
socket.on("message",(message)=>{
    console.log(message)
    ShowMessage(message)
   
    

    //scroll to the bottom
    messageBar.scrollTop=messageBar.scrollHeight
})

//Get Message submit
chatForm.addEventListener('submit',e=>{
    e.preventDefault()

    //Get message text
    const msg=e.target.elements.msg.value

    //Emit message to serer
    socket.emit('chatMessage',msg)

    e.target.elements.msg.value=''
    e.target.elements.msg.focus()
})

function ShowMessage(message){
    const div=document.createElement('div')
    div.classList.add('message')
    div.innerHTML=`
    <p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">${message.text}</p>
    `
    messageBar.appendChild(div)
}

//add roomname function
function addRoomName(room){
    roomName.innerText=room
}

//add user to group function

function userListToRoom(users){
    const li=document.createElement("li")
    li.className="list"
    users.forEach((user)=>{
    li.innerText=user.username
    userList.appendChild(li)
    }
    )

}





//Leave room button
leaveBTN.addEventListener('click',()=>{
    const leaveRoom=confirm("Are you sure you want to leave room?")

    if(leaveRoom){
        window.location='../index.html'
    }
})