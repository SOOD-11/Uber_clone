import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from "js-cookie";
import { UserDataContext, useUserContext } from '../contexts/UserContext';
import {  useDriverContext } from '../contexts/Captaincontext';

const ProtectedRoutesWrapper = ({ children }) => {
  const {user,setUser}=useUserContext();
 const {driver,setDriver}=useDriverContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const token = Cookie.get("Accesstoken");

  useEffect(() => {
    console.log("Access token from cookie:", token);
    if (!token) {
      navigate('/');
    } else {
      setLoading(false); // move out of condition so it unblocks render
    }
  }, [navigate, token]);

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoutesWrapper;