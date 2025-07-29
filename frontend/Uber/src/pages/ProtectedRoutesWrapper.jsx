import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from "js-cookie";
import { UserDataContext } from '../contexts/UserContext';
import { CaptainDataContext } from '../contexts/Captaincontext';

const ProtectedRoutesWrapper = ({ children }) => {
  const [user, setUser] = useContext(UserDataContext);
  const [captain, setCaptain] = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const token = Cookie.get('Accesstoken');

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