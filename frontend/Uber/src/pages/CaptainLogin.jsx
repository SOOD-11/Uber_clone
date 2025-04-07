import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleLogin = async (e) => {
    console.log('form submitted');

    e.preventDefault();
const data={
      email:email,
      password: password
    }
    console.log(data);

      setEmail('');
      setPassword('');
   

   
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
          </div>

        

          <button
            
            type="submit"
           
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200'
          >
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