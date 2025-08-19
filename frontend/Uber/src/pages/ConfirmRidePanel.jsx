import React from 'react';
import OtpInput from '../components/Otpinput';
import { useAcceptedRequest } from '../contexts/AcceptedRequestContext';
import logo from "../assets/images-removebg-preview.png";
import { Link } from 'react-router-dom';
import OTPInput from '../components/Otpinput';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const ConfirmRidePanel = () => {
const navigate=useNavigate();
const {acceptedRequest,setAcceptedRequest}= useAcceptedRequest();

  const [enteredOTP, setEnteredOTP] = React.useState("");
  const [error,setError]=React.useState("");
 const handleConfirmRide = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/ride/ride-start`,
      {
        rideId: acceptedRequest._id,
        otp: enteredOTP
      },{

        withCredentials:true
      }
    );

    if (response.status === 201) {
      setAcceptedRequest(response.data);
      navigate('/GoingtoDrop');
    }
  } catch (error) {
    if (error.response && error.response.status === 431) {
      setError(error.response.data?.message);
    } 
  }
};



  const handleCancelRide = (e) => {
    e.preventDefault();
    console.log("Ride cancelled");
  };

  if (!acceptedRequest) return null;


  return (
<div className="h-screen w-screen">
<Link to="/home" className="fixed top-0 left-0 p-3 z-50 flex items-center justify-center">
      <img className="w-[60px] h-[60px] inline-block" src={logo} alt="logo" />
    </Link>

   <div className="flex flex-col items-center  justify-center w-full h-full bg-white shadow-lg rounded-lg p-4 border-t border-gray-300">   
    <img
        src={acceptedRequest.userImage}
        alt="User"
        className="w-14 h-14 rounded-full object-cover border-2 !border-black mb-2"
      />
      <h5 className="text-lg font-semibold mb-4">{acceptedRequest.User.fullname.firstname}</h5>

      <div className="w-full space-y-2">
        <div className="flex justify-between p-2 border !border-black rounded">
          <i className="ri-focus-3-fill" />
          <span className="">{acceptedRequest.pickup}</span>
        </div>

        <div className="flex justify-between p-2 border !border-black rounded">
          <i className="ri-map-pin-fill" />
          <span>{acceptedRequest.destination}</span>
        </div>

        <div className="flex justify-between p-2 border !border-black rounded">
          <i className="ri-cash-line" />
          <span>{acceptedRequest.fare}</span>
        </div>


        {/* OTP Section */}
        {/* OTP Section */}
<h3 className="text-md flex flex-col items-center">Enter the OTP</h3>
<form onSubmit={handleConfirmRide} className="mt-2 mb-1 flex flex-col items-center">
  <OTPInput length={4} onChange={setEnteredOTP} />
  {error && <p className="text-red-500 mt-2">{error}</p>}
  <div className=" flex flex-col justify-centre  items-centre mt-6  space-y-10">
          <button
          type="submit"
   
          className="!bg-green-500  hover:!bg-red-600 text-white px-4 py-2 mb-2 rounded  overflow-x-hidden"
          >
            Confirm Ride
          </button>
          <button
            onClick={handleCancelRide}
            className="bg-black hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
                  </div>
</form>
        {/* Buttons */}
       

      </div>
    </div>
    </div>
  );
};

export default ConfirmRidePanel;