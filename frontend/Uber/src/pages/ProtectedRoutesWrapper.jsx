import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from "js-cookie";
import { UserDataContext } from '../contexts/UserContext';

const ProtectedRoutesWrapper = ({ children }) => {
  const [user, setUser] = useContext(UserDataContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // to avoid premature render

  useEffect(() => {
    const token = Cookie.get('Accesstoken'); // check if the key is exactly like this

    console.log("Access token from cookie:", token); // for debug

    if (!token) {
      navigate('/');
    } else {
      setUser({ isAuthenticated: true });
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoutesWrapper;