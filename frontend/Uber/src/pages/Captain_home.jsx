import React, { useState } from 'react'
import map from '../assets/rendezvous.e688c83c (1).png';
import  logo from "../assets/images-removebg-preview.png"
import { Link } from 'react-router-dom';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CaptainDasboard from '../components/CaptainComponents/CaptainDasboard';
import RideRequestList from '../components/CaptainComponents/RideRequestList';
import ConfirmRidePanel from './ConfirmRidePanel.jsx';
import GoingforPickup from '../components/CaptainComponents/GoingForPickup.jsx';
const Captain_home = () => {
  const [selectedrequest,setSelectedrequest]=React.useState({});
  const [dashboardview,setDashboardView]=useState(true);
  const [confirmedpanel,setconfirmedpanel]=useState(false);
  const captainDashboardRef=React.useRef(null);
  const confirmedridepanelRef=React.useRef(null);



    useGSAP(() => {
    if (dashboardview) {
      gsap.to(captainDashboardRef.current, {
        y: 0,
      });
      
    } else {
      gsap.to(captainDashboardRef.current, {
        y: 1000
      });
    }
  }, [dashboardview]);

    useGSAP(() => {
    if (confirmedpanel) {
      gsap.to(confirmedridepanelRef.current, {
        y: 0,
      });
      
    } else {
      gsap.to(confirmedridepanelRef.current, {
        y: 1000
      });
    }
  }, [confirmedpanel]);
  return (
    <div className="w-screen h-screen flex flex-col justify-around overflow-hidden" >
    {/* Fixed Top Logo */}
    <Link to="/home" className="fixed top-0 left-0 p-3 z-50 flex items-center justify-center">
      <img className="w-[60px] h-[60px] inline-block" src={logo} alt="logo" />
    </Link>

    {/* Map Section (Top Half) */}
    <div className="flex-1 relative">
      <img src={map} alt="Map" className="w-full h-full object-cover" />
    </div>

    {/* Info Section (Bottom Half) */}
    <div  ref={captainDashboardRef} className=' fixed z-10 px-3 py-6 w-full bottom-0 translate-y-0 bg-white'>
   <CaptainDasboard></CaptainDasboard>
   </div>
<div  className=" ">
  <RideRequestList   dashboardview={dashboardview} setDashboardView={setDashboardView} confirmedpanel={confirmedpanel} setconfirmedpanel={setconfirmedpanel}/>
</div>
<div  ref={confirmedridepanelRef} className='fixed z-10 px-3 py-6 w-full bottom-0  pointer-events-auto translate-y-full bg-white'>
  <ConfirmRidePanel confirmedRequest={selectedrequest}  ></ConfirmRidePanel>
</div>


   
  </div>
  )
}

export default Captain_home;