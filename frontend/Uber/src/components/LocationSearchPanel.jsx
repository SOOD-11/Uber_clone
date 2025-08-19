import React, { useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import RIdeFormContext from '../contexts/RIdeFormContext';
import { useRideContext } from '../contexts/RIdeFormContext';

const LocationSearchPanel = ({suggestions,activeField,setrideselectionpanel,setpanelopen}) => {
  const {setDestination,setPickup}=useRideContext();


 
  // to get the dynamic sugggestions


    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'Pickup') {
            setPickup(suggestion)
        } else if (activeField === 'Destination') {
            setDestination(suggestion)
        }

    }


 
  // Replace this array with the actual suggestions from API/state
 
console.log("Suggestions"+ suggestions);
  return (
    <div>
      {Array.isArray(suggestions) && suggestions.map((address, index) => (
        <div key={index}  onClick={()=>{

handleSuggestionClick(address)}
        } className="mb-9 p-2 border-  !border-black">
          <h4 className="bg-gray-100 inline-block px-2 py-2 rounded-full border-2 ">
            <i className="ri-map-pin-line"></i>
          </h4>
          <h2 className="inline font-bold ml-2">{address}</h2>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;