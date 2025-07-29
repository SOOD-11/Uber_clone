import React from "react";

const RideRequestCard = ({ requests, onConfirm, onIgnore }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-4 border border-gray-200">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <img
          src={requests.userImage}
          alt="User"
          className="w-14 h-14 rounded-full object-cover border-2 border-gray-300"
        />
        <div>
          <p className="text-base font-semibold text-gray-800">{requests.username}</p>
          <p className="text-md
           p-2 border border-black rounded-md text-gray-600"> ₹{requests.price}</p>
         
        </div>
        <div className="div"><p className=" text-3xl  border border-black rounded-md text-gray-600"> {requests.distance}Km</p></div>
      </div>

      {/* Pickup Point */}
      <div className="flex items-center gap-2 bg-amber-100 p-2 rounded-md">
        <i className="ri-map-pin-line text-lg text-amber-700" />
        <h4 className="text-sm text-gray-700">{requests.pickupPoint}</h4>
      </div>

      {/* DropOff Point */}
      <div className="flex items-center gap-2 bg-amber-100 p-2 rounded-md">
        <i className="ri-map-pin-line text-lg text-amber-700" />
        <h4 className="text-sm text-gray-700">{requests.DropOffPoint}</h4>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <button
          className="px-4 py-1 border border-red-500 text-black p-3 rounded-md"
          onClick={() => onConfirm(requests.id)}
        >
          Confirm
        </button>
        <button
          className="px-4 py-1 border border-red-500 text-black rounded-md p-3 hover:bg-red-50"
          onClick={() => onIgnore(requests.id)}
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default RideRequestCard;