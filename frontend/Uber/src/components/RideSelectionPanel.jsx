import React, { useRef } from "react";
import car from "../assets/removeBackground-sample.png"; // replace with your actual image path
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const rides = [
  {
    name: "Uber Go",
    eta: "2 mins away",
    description: "Affordable, compact rides",
    price: "₹202",
    image: car,
  },
  {
    name: "Uber XL",
    eta: "5 mins away",
    description: "Spacious rides for groups",
    price: "₹350",
    image: car,
  },
  {
    name: "Uber Premium",
    eta: "6 mins away",
    description: "Luxury rides with extra comfort",
    price: "₹500",
    image: car,
  },
];

const RideSelectionPanel = (props) => {
  const doubledownarrow = useRef(null);
  console.log(props);

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
      {rides.map((ride, index) => (
        <div
          key={index}
          onClick={() => {
            props.setconfirmedridepanel(true);
            props.setrideselectionpanel(false);
          }}
          className="flex items-center p-3 mb-2 border-2 hover:border-black active:border-black justify-between w-full rounded-xl transition"
        >
          <img
            className="h-20 w-15 rounded-full"
            src={ride.image}
            alt={ride.name}
          />
          <div className="w-1/2 px-2">
            <h4 className="text-2xl font-bold flex items-center gap-2">
              {ride.name}
              <i className="ri-user-line"></i>
            </h4>
            <h5 className="text-sm font-bold">{ride.eta}</h5>
            <p className="text-sm font-sans">{ride.description}</p>
          </div>
          <h2 className="text-3xl font-extrabold px-3">{ride.price}</h2>
        </div>
      ))}
    </div>
  );
};

export default RideSelectionPanel;
