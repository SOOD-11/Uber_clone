import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Changed from "aa" to null

  const SubmitHandler=(e)=>{
    e.preventDefault();
const data={
  email:email,password:password
}
console.log(data);
    setEmail('');
    setPassword('');
  };

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-bottom"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1554672408-730436b60dde?w=1400&auto=format&fit=crop&q=60')",
        backgroundPositionY: '40%',
      }}
    >
      <div className="absolute top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%]   max-w-sm px-4 sm:px-0">
        <div className="bg-transparent bg-opacity-90 rounded-lg shadow-xl p-2 sm:p-8">
          <form className="flex flex-col gap-5"onSubmit={SubmitHandler} >
            <img
              className="w-20"
              src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
              alt="Uber Logo"
            />

            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 border border-black rounded text-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 border border-black rounded text-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            <button
              className="bg-black text-white py-3 rounded font-semibold text-lg hover:bg-gray-800 transition"
            >
              Login
            </button>

            <div className="flex justify-center text-xs text-black">
              <span>New here?&nbsp;</span>
              <Link to="/Signup" className="text-blue-800 underline">
                Create Account
              </Link>
            </div>

            <Link to="/Driver-login"><button
              type="button"
              className="bg-transparent inline-block text-white py-3 w-full rounded font-semibold text-lg hover:bg-gray-800 transition"
           
            >
              Sign in as Driver
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;