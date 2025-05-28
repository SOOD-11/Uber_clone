import React from "react";
import drivercar from "../assets/177604B0-1213-40AD-B60B-F1EBA609FCE5_1_105_c.jpeg"
import car from "../components/land-cruiser-exterior-right-front-three-quarter-2.avif"

    





const DriverFound = () => {
  return (
    <div className="w-full max-h-1/2  mx-auto bg-white p-4 space-y-1 rounded-2xl shadow-lg">
      <h3 className="text-lg font-semibold text-center">Coming at pickup point in <h5 className="bg-black text-white"> </h5></h3>
      {/* Driver Info */}
      <div className="flex flex-col items-center space-y-2">
        <div className="w-24 h-24 rounded-full overflow-hidden border shadow">
          <img src=" " alt="driver" className="w-full h-full object-cover" />
        </div>
        <h3 className="text-lg font-semibold text-center">Driver Details</h3>
        <p className="border px-4 py-1 rounded-md font-medium text-gray-800">Mr. Chaman</p>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <i className="ri-phone-line text-xl" />
          <span>+91 98765 43210</span>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="flex flex-col items-center border rounded-xl p-4 space-y-3">
        <img src={car} alt="vehicle" className="w-32 h-20 object-contain" />
        <h3 className="font-semibold">Vehicle Details</h3>
        <p className="border border-red-500 px-3 py-1 rounded text-sm font-medium">
          White - LandCruiser
        </p>
        <p className="border border-red-500 px-3 py-1 rounded text-sm font-medium">
          PB 10 GG 0001
        </p>
      </div>

      {/* Route & Payment Info */}
      <div className="space-y-3">
        <div className="flex items-start gap-2 border p-3 rounded-lg">
          <i className="ri-focus-3-fill text-xl text-gray-700" />
          <div>
            <h4 className="font-semibold text-sm">24-A Kitchlu Nagar</h4>
            <p className="text-xs text-gray-600">Rishi Nagar, Punjab, Ludhiana</p>
          </div>
        </div>

        <div className="flex items-center gap-2 border p-3 rounded-lg">
          <i className="ri-map-pin-fill text-xl text-red-600" />
          <p className="font-medium text-sm">Ending Location</p>
        </div>

        <div className="flex items-center gap-2 border p-3 rounded-lg">
          <i className="ri-cash-line text-xl text-green-600" />
          <p className="font-medium text-sm">Amount to be paid</p>
        </div>
      </div>
    </div>
  );
};

export default DriverFound;