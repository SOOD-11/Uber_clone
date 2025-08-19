import React from 'react'
import car from "../components/land-cruiser-exterior-right-front-three-quarter-2.avif";
import map from "../assets/rendezvous.e688c83c (1).png";
import { useRideContext } from '../contexts/RIdeFormContext';
const Riding = () => {
  const {ridedetails}=useRideContext();
  return (
    <div className="w-full max-h-1/2  mx-auto bg-white p-1 space-y-1 rounded-2xl shadow-lg">
       <img className='w-full h-auto rounded-xl object-cover' src={map} alt="" />
          {/* Driver Info */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-15 h-15 rounded-full overflow-hidden border shadow">
              <img src=" " alt="driver" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-semibold text-center">Driver Details</h3>
            <p className="border px-4 py-1 rounded-md font-medium text-gray-800">{ridedetails.driver?.fullname?.firstname+"  "+ridedetails.driver?.fullname.lastname}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <i className="ri-phone-line text-xl" />
              <span>+91 98765 43210</span>
            </div>
          </div>
    
          {/* Vehicle Info */}
          <div className="flex flex-col items-center border rounded-xl  space-y-3">
            <img src={car} alt="vehicle" className="w-16 h-10 object-contain" />
            <h3 className="font-semibold">Vehicle Details</h3>
            <p className="border border-red-500 px-2 py-1 rounded text-sm font-medium">
              {ridedetails.driver.VehicleDetails.vehiclename}
            </p>
            <p className="border border-red-500 px-3 py-1 rounded text-sm font-medium">
      {ridedetails.driver?.VehicleDetails?.plate}
            </p>
          </div>
    
          {/* Route & Payment Info */}
          <div className="space-y-3">
           
    
            <div className="flex items-center gap-2 border p-3 rounded-lg">
              <i className="ri-map-pin-fill text-xl text-red-600" />
              <p className="font-medium text-sm">{ridedetails.destination}</p>
            </div>
    
            <div className="flex items-center gap-2 border p-3 rounded-lg">
              <i className="ri-cash-line text-xl text-green-600" />
              <p className="font-medium text-sm">{ridedetails.fare}</p>
            </div>
           
          </div>
          <button className='!bg-green-600 w-full p-3'>Make a payment</button>
        </div>
  )
}

export default Riding