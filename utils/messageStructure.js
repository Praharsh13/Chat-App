import moment from "moment";


export default function messageStr(username,text){
    return{
        username,
        text,
        time:moment().format('h:mm a')
    }
}