import React from 'react'
import { Link } from 'react-router-dom'
import UserSignup from './UserSignup'

const Start = () => {
  return (
<div className="relative h-screen w-full">
  {/* Background Image */}
  <div className="absolute inset-0 bg-cover bg-center md:bg-left bg-[url('https://images.unsplash.com/photo-1584809394311-364392a5011b?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZlaGljbGV8ZW58MHx8MHx8fDA%3D')]"></div>

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black opacity-50"></div>

  {/* Main Content */}
  <div className="relative z-10 h-full flex flex-col justify-between px-6 pt-8 pb-10 sm:px-10 md:px-20 lg:px-32">
    
    {/* Logo */}
    <img
      className="w-24 sm:w-28 md:w-32"
      src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
      alt="Uber Logo"
    />

    {/* Bottom Card */}
    <div className="bg-white  shadow-lg py-8 px-6 rounded-30%  w-full">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6">
        Get Started with Uber
      </h2>
      <Link
        to="/login"
        className="block w-full bg-black text-white text-center py-3 rounded-md font-semibold text-base sm:text-lg hover:bg-gray-800 transition duration-300"
      >
        Continue
      </Link>
    </div>
  </div>
</div>

  )
}

export default Start