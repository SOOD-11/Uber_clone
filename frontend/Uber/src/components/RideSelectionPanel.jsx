import React, { useRef } from "react";
import car from "../assets/removeBackground-sample.png"; // replace with your actual image path
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRideContext } from "../contexts/RIdeFormContext";


const RideSelectionPanel = (props) => {
  const doubledownarrow = useRef(null);

// safe key to make if props are undefined 
  const fareArray = props.fare ? Object.entries(props.fare).map(([key, value]) => ({
  name: key,
  fare: value
})):[];

  console.log(props);
  console.log(fareArray);

  return (
    <div className="fixed z-10 px-3 py-6 w-full translate-y-full  bg-white bottom-0">
      <h5
        ref={doubledownarrow}
        onClick={() => {
          props.setrideselectionpanel(false);
        }}
        className=" h-10 w-10 right-2"
      >
        <i className="ri-arrow-down-double-line"></i>
      </h5>
      <h1 className="text-2xl font-bold text-center mb-2">Choose your ride</h1>
      {fareArray.map((ride, index) => (
        <div
          key={index}
          onClick={() => {
        props.setVehicletype(ride.name);
          props.setconfirmedridepanel(true);
            props.setrideselectionpanel(false); 
          }}
          className="flex items-center p-3 mb-2 border-2 hover:border-black active:border-black justify-between w-full rounded-xl transition"
        >
          <img
            className="h-20 w-15 rounded-full"
            src={car}
            alt={ride.name}
          />
          <div className="w-1/2 px-2">
            <h4 className="text-2xl font-bold flex items-center gap-2">
              {ride.name}
              <i className="ri-user-line"></i>
            </h4>
            <h5 className="text-sm font-bold">2 mins</h5>
            <p className="text-sm font-sans"></p>
          </div>
          <h2 className="text-3xl font-extrabold px-3">{ride.fare}</h2>
        </div>
      ))}
    </div>
  );
};

export default RideSelectionPanel;
