import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../utils/axiosInstance';
import { CaptainDataContext } from '../contexts/Captaincontext';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const [captain,setCaptain]=useContext(CaptainDataContext);
const [feilderrors,setFielderrors]=useState({});
const [generalerror,setGeneralError]=useState('');
const navigate=useNavigate();

  const handleLogin = async (e) => {
    console.log('form submitted');

    e.preventDefault();
const data={
      email:email,
      password: password
    }
    console.log(data);

try {
  
      const response=await axiosInstance.post('/api/v1/driver/login',data,
        {
          withCredentials:true,
          headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
  
          },
        }
        
      );
   
      setCaptain({isAuthenticated:true})
 
        setEmail('');
        setPassword('');
        navigate('/captain-home');
  
     
} catch (error) {
  if(error.response){
    const {status,data}=error.response;
    if(status===400 && Array.isArray(data.errors)){
      const newFieldErrors={};
      data.errors.forEach((err)=>{
if(err.path && err.msg){
  newFieldErrors[err.path]=err.msg;
}


      })
      setFielderrors(newFieldErrors);
    }else if([422,424,425].includes(status)){
setGeneralError(data.message || 'Something went wrong');
 }else{
  setGeneralError("ANunexpected error occured");

 }

  }
  else{
    setGeneralError('Server Down');
  }
  
}
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Captain Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="captain@example.com"
             
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
           
             className={`px-4 py-3 border rounded text-lg focus:outline-none ${
                feilderrors.email
                  ? 'border-red-600 focus:ring-red-600'
                  : 'border-black focus:ring-black'
              }`}
              />
            {feilderrors.email && (
              <span className="text-red-600 text-sm">{feilderrors.email}</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter ur password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {feilderrors.password && (
              <span className="text-red-600 text-sm">{feilderrors.password}</span>
            )}

            {generalerror && (
              <div className="text-center text-red-600 text-sm">{generalerror}</div>
            )}

          </div>

        

      
          <button  type='submit' className="bg-black w-full text-white py-3 rounded font-semibold text-lg hover:bg-gray-800 transition">
              Login
            </button>
           
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Don’t have a captain account?{' '}
          <Link to="/Driver-Signup" className='text-blue-600 hover:underline cursor-pointer'>
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default CaptainLogin;