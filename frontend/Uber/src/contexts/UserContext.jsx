// UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react'
import roleauth from '../hooks/roleauth';
import axiosInstance from '../utils/axiosInstance';
export const UserDataContext = createContext();


const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
// to provide userdetails to context  even after refreshing 
  useEffect(() => {

    const fetchUser= async()=>{
 // ensure roleauth is a sync hook
const response=await axiosInstance.get("api/v1/user/get-user",{
withCredentials: true


})
setUser(response.data);
    
  }
  fetchUser() ;
},[]);
  return (
    <UserDataContext.Provider value={{user, setUser}}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContextProvider;

// ✅ Hook to consume context
export const useUserContext = () => useContext(UserDataContext);