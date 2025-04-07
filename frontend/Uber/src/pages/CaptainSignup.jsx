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
      <img
              className="w-20"
              src="data:image/png;base64,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"
              alt="Uber Logo"
            />
        <h1 className="text-3xl font-bold text-center text-white  mt-15 mb-2">
          {step === 1 ? 'Join as a Captain' : 'Vehicle Info'}
        </h1>
        {stepper}
        
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