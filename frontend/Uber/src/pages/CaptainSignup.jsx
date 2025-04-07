import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CaptainSignup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    vehiclename: '',
    vehicletype: '',
    plate: '',
    capacity: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
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
      VehicleDetails: {
        vehiclename: formData.vehiclename,
        vehicletype: formData.vehicletype,
        plate: formData.plate,
        Capacity: parseInt(formData.capacity),
      },
    };

    console.log(payload);
    setFormData({
      email:'',
      firstname:'',
      lastname:'',
      password:'',
      vehiclename:'',
      vehicletype:'',
      plate:'',
      capacity:'',
      

    })

      
  };

  const stepper = (
    <div className="flex items-center justify-center mb-6">
      <div className={`w-3 h-3 rounded-full ${step === 1 ? 'bg-black' : 'bg-gray-300'} mr-2`}></div>
      <div className={`w-3 h-3 rounded-full ${step === 2 ? 'bg-black' : 'bg-gray-300'}`}></div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat mb-20 flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1646361700146-855e94bb6ce5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dWJlciUyMGRyaXZlcnMlMjBmbGVldHxlbnwwfHwwfHx8MA%3D%3D')",
      }}
    >
      <div className="w-full max-w-md bg-transparent bg-opacity-90  p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          {step === 1 ? 'Join as a Captain' : 'Vehicle Info'}
        </h1>
        {stepper}
        <img
              className="w-20"
              src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
              alt="Uber Logo"
            />
        <motion.form
        
          onSubmit={step === 1 ? handleNext : handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border text-amber-50 rounded-lg"
              />
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border text-amber-100 placeholder-amber-400 rounded-lg"
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border  placeholder-amber-500 rounded-lg"
              />
              <button
                type="submit"
                className="w-full bg-black text-white py-3 mt-2 rounded-xl hover:opacity-90"
              >
                Continue
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="text"
                name="vehiclename"
                placeholder="Vehicle Name (e.g. Toyota)"
                value={formData.vehiclename}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
              <input
                type="text"
                name="vehicletype"
                placeholder="Vehicle Type (e.g. Car, Bike)"
                value={formData.vehicletype}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
              <input
                type="text"
                name="plate"
                placeholder="Plate Number (e.g. AB12CD3456)"
                value={formData.plate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
              <input
                type="number"
                name="capacity"
                placeholder="Passenger Capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
              <div className="flex justify-between mt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm text-gray-600 hover:underline"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-2 rounded-xl hover:opacity-90"
                >
                  Submit
                </button>
                
              </div>
              <a href='/Driver-login' ><p>Already Registered ?Login</p></a>
            </>
          )}
        </motion.form>
      </div>
    </div>
  );
};

export default CaptainSignup;