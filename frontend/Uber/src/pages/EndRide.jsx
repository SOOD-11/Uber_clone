import React from 'react';
import OtpInput from '../components/Otpinput';
import { useAcceptedRequest } from '../contexts/AcceptedRequestContext';
import logo from "../assets/images-removebg-preview.png";
import { Link } from 'react-router-dom';
import OTPInput from '../components/Otpinput';
import { useNavigate } from 'react-router-dom';

const ConfirmRidePanel = () => {
const navigate=useNavigate();
const {acceptedRequest,setAcceptedRequest}= useAcceptedRequest();

  const handleEndRide = (e) => {
      // remove acceptedrequest from localstorage as well as from the context
      // route towards the captain dashboard
      localStorage.removeItem('AcceptedRequest');
      setAcceptedRequest("");
      

    e.preventDefault();
    console.log("Ride Ended:" );
    navigate('/Captain-home');
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
      <h5 className="text-lg font-semibold mb-4">{acceptedRequest.username}</h5>

      <div className="w-full space-y-2">
        <div className="flex justify-between p-2 border !border-black rounded">
          <i className="ri-focus-3-fill" />
          <span className="">{acceptedRequest.pickupPoint}</span>
        </div>

        <div className="flex justify-between p-2 border !border-black rounded">
          <i className="ri-map-pin-fill" />
          <span>{acceptedRequest.DropOffPoint}</span>
        </div>

        <div className="flex justify-between p-2 border !border-black rounded">
          <i className="ri-cash-line" />
          <span>{acceptedRequest.price}</span>
        </div>



  
        {/* Buttons */}
     
          <button
            onClick={handleEndRide}
            className="bg-black hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            End Ride
          </button>
        </div>
      </div>
    </div>
 
  );
};

export default ConfirmRidePanel;