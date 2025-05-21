import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import roleauth from '../hooks/roleauth';
export const UserDataContext= createContext();
const UserContext = ({children}) => {
const [user,setUser]=useState({
  isAuthenticated:false,
   email:'',
fullname:{firstname:'',
          lastname:''
},

})
useEffect(()=>{
const {isAuthenticated,role}=roleauth();
if(isAuthenticated && role === 'User'){

  setUser((prev)=>({
    ...prev,
    isAuthenticated:true,
    role:'User'
  }))
}



},[]);
  return (
   
<UserDataContext.Provider value={[user,setUser]}>
       {children}
</UserDataContext.Provider>

  )
}

export default UserContext