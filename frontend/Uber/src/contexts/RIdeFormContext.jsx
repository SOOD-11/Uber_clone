

import React from 'react'
import { useState,createContext,useContext } from 'react';
const RideContext=createContext();
export const useRideContext=() =>useContext(RideContext);
const RIdeFormContext = ({children}) => {

const [pickup,setPickup]=useState("");
const [pickupCoord,setPickupCoord]=useState({});
const [destination,setDestination]=useState("");
const[destinationCoord,setdestinationCoord]=useState({});
const [ridedetails,setRidedetails]=useState({});

  return (
<RideContext.Provider value={{pickup,
    setPickup,
    pickupCoord,
    setPickupCoord,
    destination,
    setDestination,
    destinationCoord,
    ridedetails,
    setRidedetails,
    setdestinationCoord}}>
    {children}
</RideContext.Provider>
    
  )

}



export default RIdeFormContext;