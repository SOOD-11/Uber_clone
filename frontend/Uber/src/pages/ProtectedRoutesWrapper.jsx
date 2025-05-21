import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from "js-cookie";
import { UserDataContext } from '../contexts/UserContext';
import { CaptainDataContext } from '../contexts/Captaincontext';


const ProtectedRoutesWrapper = ({ children,allowedRoles=[]}) => {
  const [user, setUser] = useContext(UserDataContext);
  const [captain,setCaptain]=useContext(CaptainDataContext)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // to avoid premature render

  useEffect(() => {
    const token = Cookie.get('Accesstoken'); // check if the key is exactly like this
const role=Cookie.get('role');
 console.log("Access token from cookie:", token);

    if (!token) {
      navigate('/');
    } if(role === 'User'){
      if(!user.isAuthenticated){
        setUser({isAuthenticated:true, role: 'User'})
      }
    }if( role ==='Driver'){
      if(!captain.isAuthenticated){
        setCaptain({isAuthenticated:true, role:'Driver'})
      }
    }

    setLoading(false);
  }, [user,captain,setUser,setCaptain]);

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  return <>
  {children}
  </>;
};

export default ProtectedRoutesWrapper;