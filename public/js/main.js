const chatForm= document.getElementById('chat-form')
const messageBar= document.querySelector(".chat-messages")

//Get username and room from URL
const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
})

console.log(username,room)
const socket=io()

//Join room event and send to backend 
socket.emit("joinRoom",{username,room})
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
    <p class="meta">${message.username}<span>9:12pm</span></p>
    <p class="text">${message.text}</p>
    `
    messageBar.appendChild(div)
}