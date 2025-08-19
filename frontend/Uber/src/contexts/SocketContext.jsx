import { useRef } from "react";
import { createContext, useContext, useEffect } from "react";
import io from 'socket.io-client';

export const socketContext=createContext();




export const useSocketContext=()=>useContext(socketContext);
const Socketprovider=({children})=>{

     const  socketRef=useRef(null);
useEffect(()=>{
// basic connection logic
 socketRef.current=io(import.meta.env.VITE_BASE_URL,{

    withCredentials: true
 });
socketRef.current.on('connect',()=>{

console.log('connected to server');



})

socketRef.current.on('disconnect',()=>{

console.log("disconnect from server");


});





},[]);

const sendMessage=(eventName,message)=>{

    console.log("sending message ",message ,"event",eventName);

socketRef.current.emit(eventName,message);



}
const receiveMessage=(eventName,callback)=>{




   socketRef.current.on(eventName,callback);
};


 


return (
<socketContext.Provider value={{sendMessage,receiveMessage}}>
   { children}
   </socketContext.Provider>
);

}
export default Socketprovider;


