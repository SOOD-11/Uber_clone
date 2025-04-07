import React, { useState } from 'react';

const UserSignup = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const payload = {
      email: formData.email,
      fullname: {
        firstname: formData.firstname,
        lastname: formData.lastname,
      },
      password: formData.password,
    };
console.log(payload);
setFormData({
  email:'',
  firstname:'', 
  lastname:'',
  password:''

  })
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1593950315186-76a92975b60c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FycyUyMHViZXJ8ZW58MHx8MHx8fDA%3D')",
      }}
    >
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white bg-opacity-90 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6 tracking-tight">
          Create your account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstname"
                placeholder="John"
                value={formData.firstname}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastname"
                placeholder="Doe"
                value={formData.lastname}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:opacity-90 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-5">
          Already have an account?{' '}
          <a href="/login" className="text-black font-medium hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;