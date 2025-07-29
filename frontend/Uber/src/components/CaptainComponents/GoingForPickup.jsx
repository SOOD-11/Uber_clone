import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/images-removebg-preview.png";
import map from '../../assets/rendezvous.e688c83c (1).png';
import ConfirmRidePanel from '../../pages/ConfirmRidePanel';
import { useAcceptedRequest } from '../../contexts/AcceptedRequestContext';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

const GoingForPickup = () => {
  const [showDirections, setShowDirections] = useState(false);
  const [isAtPickupLocation, setIsAtPickupLocation] = useState(false);
  const confirmedpanelref = useRef(null);
  const containerRef = useRef(null);
  const Navigate=useNavigate();
  const { AcceptedRequest } = useAcceptedRequest();

  const handleGetDirections = () => {
    setShowDirections(true);
  };

  const handleReachPickup = () => {
Navigate('/confirm-pickup');
  };
  

  // GSAP animation for full page when pickup is reached


  return (
    <div ref={containerRef} className="h-screen flex flex-col relative bg-white overflow-hidden">
      {/* Top Logo */}
      <Link to="/Captain-home" className="fixed top-0 left-0 p-3 z-50 flex items-center justify-center">
        <img className="w-[60px] h-[60px]" src={logo} alt="logo" />
      </Link>

      {/* Map and directions */}
      <div className="flex-1 relative">
        <img src={map} alt="Map View" className="w-full h-full object-cover" />

        {showDirections && (
          <div className="absolute bottom-[22vh] left-0 right-0 px-4 z-40">
            <div className="bg-white rounded-xl shadow-lg p-4 space-y-2">
              <p className="text-lg font-semibold">Directions</p>
              <ul className="text-sm text-gray-800 space-y-1">
                <li>• Head straight for 200m</li>
                <li>• Turn left at the signal</li>
                <li>• In 100m, make a U-turn</li>
                <li>• Destination is on your right</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Bottom panel before reaching pickup */}
   {!isAtPickupLocation&&(
        <div className="h-[20vh] w-full bg-white border-t text-black flex flex-col items-center justify-center px-4 shadow-inner z-30">
          <p className="text-lg font-semibold">Pickup Location</p>
          <h5 className="text-sm mb-2">3.0 km away</h5>
          <button
            onClick={handleGetDirections}
            className="bg-black text-white px-4 py-2 rounded-xl mb-2"
          >
            {showDirections ? "Directions Enabled" : "Get Directions"}
          </button>
          <button

            onClick={handleReachPickup}
            className="text-blue-600 underline text-sm"
          >
            Simulate Reached Pickup
          </button>
        </div>
   )}


      
    </div>
  );
};

export default GoingForPickup;