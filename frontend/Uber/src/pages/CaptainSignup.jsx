import React, { useContext, useState } from 'react';
import {  useDriverContext } from '../contexts/Captaincontext';
import useFieldErrors from '../hooks/useFieldErrors';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainSignup = () => {
const {captain,setCaptain}=useDriverContext();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    vehiclename: '',
    vehicletype: '',
    plate: '',
    Capacity: '',
  });

  const navigate = useNavigate();
  const {
    errors,
    clearFieldError,
    handleErrorResponse,
    resetErrors,
  } = useFieldErrors();

  const getErrorMessage = (field) => {
    const err = errors.find((e) => e.field === field);
    return err ? err.message : null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearFieldError(name);
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
        Capacity: parseInt(formData.Capacity),
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/driver/register`,
        payload
      );

      if (response.status === 201) {
        setCaptain(response.data);
        resetErrors();
        setFormData({
          email: '',
          firstname: '',
          lastname: '',
          password: '',
          vehiclename: '',
          vehicletype: '',
          plate: '',
          Capacity: '',
        });
        navigate('/Driver-login');
      }
    } catch (error) {
      console.log('Signup error:', error.response?.data || error.message);
      handleErrorResponse(error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1646361700146-855e94bb6ce5?w=900&auto=format&fit=crop&q=60')",
      }}
    >
      <div className="w-full max-w-md bg-black/50  text-yellow-4 p-8 rounded-2xl shadow-2xl">
      <img 
          className="w-16 mb-6" 
          src="data:image/png;base64,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"
          alt="Logo"
        />
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`w-3 h-3 rounded-full border border-amber-400 ${step === s ? 'bg-amber-200' : 'bg-gray-300'}`}
            />
          ))}
        </div>

        {step === 1 ? (
          <form onSubmit={handleNext} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input  text-black bg-white"
                value={formData.email}
                onChange={handleChange}
              />
              {getErrorMessage('email') && (
                <p className="text-red-500 text-sm mt-1">{getErrorMessage('email')}</p>
              )}
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <input
                  name="firstname"
                  placeholder="First Name"
                  className="input  text-black bg-white"
                  value={formData.firstname}
                  onChange={handleChange}
                />
                {getErrorMessage('fullname.firstname') && (
                  <p className="text-red-500 text-sm mt-1">{getErrorMessage('fullname.firstname')}</p>
                )}
              </div>
              <div className="w-1/2">
                <input
                  name="lastname"
                  placeholder="Last Name"
                  className="input  text-black bg-white"
                  value={formData.lastname}
                  onChange={handleChange}
                />
                {getErrorMessage('fullname.lastname') && (
                  <p className="text-red-500 text-sm mt-1">{getErrorMessage('fullname.lastname')}</p>
                )}
              </div>
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input  text-black bg-white "
                value={formData.password}
                onChange={handleChange}
              />
              {getErrorMessage('password') && (
                <p className="text-red-500 text-sm mt-1">{getErrorMessage('password')}</p>
              )}
            </div>

            <button type="submit" className="btn w-full mt-4  text-black bg-white">
              Next
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="vehiclename"
              placeholder="Vehicle Name"
              className="input  text-black bg-white max-w-full"
              value={formData.vehiclename}
              onChange={handleChange}
            />
            {getErrorMessage('VehicleDetails.vehiclename') && (
              <p className="text-red-500 text-sm mt-1">{getErrorMessage('VehicleDetails.vehiclename')}</p>
            )}

<select
  name="vehicletype"
  className="input  text-black bg-white"
  value={formData.vehicletype}
  onChange={handleChange}
>
  <option value="" disabled>Select Vehicle Type</option>
  <option value="Car">Car</option>
  <option value="Bike">Bike</option>
  <option value="Auto">Auto</option>
</select>
            {getErrorMessage('VehicleDetails.vehicletype') && (
              <p className="text-red-500 text-sm mt-1">{getErrorMessage('VehicleDetails.vehicletype')}</p>
            )}

            <input
              name="plate"
              placeholder="License Plate"
              className="input  text-black bg-white"
              value={formData.plate}
              onChange={handleChange}
            />
            {getErrorMessage('VehicleDetails.plate') && (
              <p className="text-red-500 text-sm mt-1">{getErrorMessage('VehicleDetails.plate')}</p>
            )}

            <input
              name="Capacity"
              type="number"
              placeholder="Capacity"
              className="input  text-black bg-white"
              value={formData.Capacity}
              onChange={handleChange}
            />
            {getErrorMessage('VehicleDetails.Capacity') && (
              <p className="text-red-500 text-sm mt-1">{getErrorMessage('VehicleDetails.Capacity')}</p>
            )}

            <button type="button" onClick={handleSubmit} className="z-10 w-full mt-4  text-white  p-3">
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CaptainSignup;