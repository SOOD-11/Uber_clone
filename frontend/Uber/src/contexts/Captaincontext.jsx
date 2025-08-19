import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import roleauth from '../hooks/roleauth';
import axiosInstance from '../utils/axiosInstance';
export const DriverDataContext=createContext();
export const useDriverContext=()=>{ return React.useContext(DriverDataContext)};

const Captaincontext=({children})=>{
    const [captain,setCaptain]=useState({
    })
   
   {  useEffect(()=>{
 
 
        

       const fetchDriver= async()=>{

try {
    const response=await axiosInstance.get("api/v1/driver/get-Driver",{
    withCredentials: true
    
    
    }
)
setCaptain(response.data);
} catch (error) {
    console.log(error);
}

    
  }
  fetchDriver() ;
},[]);}
    

    
    





    
return (

    <DriverDataContext.Provider value={{captain,setCaptain}}>
        {children}
    </DriverDataContext.Provider>


)
};



export default  Captaincontext;