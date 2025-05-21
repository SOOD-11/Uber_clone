import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import roleauth from '../hooks/roleauth';
export const CaptainDataContext=createContext();
const Captaincontext=({children})=>{
    const [captain,setCaptain]=useState({
isAuthenticated:false,
email:'',
fullname:{
    firstname:'',
    lastname:''
},
VehicleDetails: {
    vehiclename:'',
    vehicletype:'',
    plate:' ',
    Capacity:'',
  },


    })
   
    useEffect(()=>{
        const {isAuthenticated,role}=roleauth();
        if(isAuthenticated && role ==='Driver'){
        useEffect(()=>{
        setCaptain((prev)=>({

            ...prev,
            isAuthenticated:true,
            role:'Driver',
        }))},[])
    }

    
    
})




    
return (

    <CaptainDataContext.Provider value={[captain,setCaptain]}>
        {children}
    </CaptainDataContext.Provider>


)
}



export default Captaincontext;