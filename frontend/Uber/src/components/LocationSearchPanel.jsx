import React from 'react';

const LocationSearchPanel = (props ) => {
  console.log(props);
  // Replace this array with the actual suggestions from API/state
  const suggestions = [
    "24-c, New Kitchlu Nagar, Radha Swami Beas ludhiana",
    "Sector 18, Chandigarh, India",
    "Connaught Place, Delhi, India",
    "HSR Layout, Bangalore, India",
    "Park Street, Kolkata, India"
  ];

  return (
    <div>
      {suggestions.map((address, index) => (
        <div key={index}  onClick={()=>{
props.setrideselectionpanel(true)
        }} className="mb-9 p-2 border-  !border-black">
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