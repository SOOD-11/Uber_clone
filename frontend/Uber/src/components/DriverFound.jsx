import React from "react";

import car from "../components/land-cruiser-exterior-right-front-three-quarter-2.avif"
import { useRideContext } from "../contexts/RIdeFormContext";

    





const DriverFound = () => {

  const {ridedetails}=useRideContext();
  return (
    <div className="w-full max-h-1/2  mx-auto bg-white p-4 space-y-1 rounded-2xl shadow-lg">
      <h3 className="text-lg font-semibold text-center">Coming at pickup point in</h3> <h5 className="bg-black text-white"> </h5>
      {/* Driver Info */}
      <div className="flex flex-col items-center space-y-2">
        <div className="w-24 h-24 rounded-full overflow-hidden border shadow">
          <img src=" " alt="driver" className="w-full h-full object-cover" />
        </div>
        <h3 className="text-lg font-semibold text-center">Driver Details</h3>
        <p className="border px-4 py-1 rounded-md font-medium text-gray-800">{ridedetails?.driver?.fullname?.firstname + " "+ridedetails?.driver?.fullname?.lastname}</p>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <i className="ri-phone-line text-xl" />
          <span>+91 98765 43210</span>
        </div>
        <p> share This Code To :{ridedetails?.driver?.fullname?.firstname + " "+ridedetails?.driver?.fullname?.lastname}</p>
        <div className="text-black font-extra bold p-3 bg-amber-100">{ridedetails.Otp}</div>
      </div>

      {/* Vehicle Info */}
      <div className="flex flex-col items-center border rounded-xl p-4 space-y-3">
        <img src={car} alt="vehicle" className="w-32 h-20 object-contain" />
        <h3 className="font-semibold">Vehicle Details</h3>
        <p className="border border-red-500 px-3 py-1 rounded text-sm font-medium">
          {ridedetails?.driver?.VehicleDetails?.vehiclename}
        </p>
        <p className="border border-red-500 px-3 py-1 rounded text-sm font-medium">
           {ridedetails?.driver?.VehicleDetails?.plate}
        </p>
      </div>

      {/* Route & Payment Info */}
      <div className="space-y-3">
        <div className="flex items-start gap-2 border p-3 rounded-lg">
          <i className="ri-focus-3-fill text-xl text-gray-700" />
          <div>
            <h4 className="font-semibold text-sm"></h4>
            <p className=" text-xs text-gray-600">{ridedetails?.pickup}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 border p-3 rounded-lg">
          <i className="ri-map-pin-fill text-xl text-red-600" />
          <p className="font-medium text-sm">{ridedetails?.destination}</p>
        </div>

        <div className="flex items-center gap-2 border p-3 rounded-lg">
          <i className="ri-cash-line text-xl text-green-600" />
          <p className="font-medium text-sm">{ridedetails?.fare}</p>
        </div>
      </div>
    </div>
  );
};

export default DriverFound;