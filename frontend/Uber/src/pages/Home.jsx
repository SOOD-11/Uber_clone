import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import i1 from "../assets/rendezvous.e688c83c (1).png";
import i2 from "../assets/uber.webp";
import car from "../assets/F1EA8E2E-8646-4214-BA91-9521988C3658_4_5005_c-removebg-preview.png";
import LocationSuggestion from "../components/LocationSearchPanel";
import RideSelectionPanel from "../components/RideSelectionPanel";
import ConfirmedRidePanel from "../components/confirmedridepanel";
import "remixicon/fonts/remixicon.css";
import WaitingForRider from "../components/WaitingForRider";
import DriverFound from "../components/Driverfound";

const Home = () => {
  const panel = useRef(null);
  const downarrow = useRef(null);
  const vehiclepanel=useRef(null);
  const confirmedpanel=useRef(null);
  const waitingdriver=useRef(null);
  const driverfoundref=useRef(null);
  const [pickup, setpickup] = useState("");
  const [dest, setdest] = useState("");
  const [panelOpen, setpanelOpen] = useState(false);
  const[rideselectionpanel,setrideselectionpanel]=useState(false);
  const [confirmedridepanel,setconfirmedridepanel]=useState(false);
  const [waitingfordriver,setwaitingfordriver]=useState(false);
  const [driverfound,setdriverfound]=useState(false);

  //well all tricks worked for



  
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panel.current, {
        height: "70%",
        opacity: "1",
      });
      gsap.to(downarrow.current, {
        opacity: "1",
      });
    } else {
      gsap.to(panel.current, {
        height: "0%",
      });
      gsap.to(downarrow.current, {
        opacity: "0",
      });
    }
  }, [panelOpen]);


  useGSAP(()=>{
    if(rideselectionpanel){
 gsap.to(vehiclepanel.current,{
y:0,

 })
 gsap.to(panel.current,{
height:'0%'
 })} else{
  gsap.to(vehiclepanel.current,{
  y:1000
  })
  

 }

  },[rideselectionpanel])

  useGSAP(() => {
    if (confirmedridepanel) {
      gsap.to(confirmedpanel.current, {
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(confirmedpanel.current, {
        y: '100%',
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  }, [confirmedridepanel]); 
  
  useGSAP(() => {
    if (waitingfordriver) {
      gsap.to(waitingdriver.current, {
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(waitingdriver.current, {
        y: '100%',
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  }, [waitingfordriver]);
  
  useGSAP(() => {
    if (driverfound) {
      gsap.to(driverfoundref.current, {
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(driverfoundref.current, {
        y: '100%',
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  }, [driverfound])// <-- make sure to include dependencies
  const submithandler = (e) => {
    e.preventDefault();
    setpickup("");
    setdest("");
    setpanelOpen(false);
  };

  return (
    <div className="h-screen overflow-hidden relative">
      <img src={i2} alt="logo" onClick={()=>{
        setrideselectionpanel(true);
 
      }} className="w-16 left-5 top-5 absolute" />
      <div onClick={()=>{
        setrideselectionpanel(false);
      }} className="h-screen w-screen ">
        <img src={i1} alt="map" className="h-full w-full object-cover" />
      </div> 
     
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-3 bg-white relative">
          <h5
            ref={downarrow}
            className="absolute right-2  opacity-0 top-2 "
            onClick={() => {
              setpanelOpen(false);
            }}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h2 className="text-4xl flex-item font-semibold mb-2">Find a Trip</h2>

          <form onSubmit={submithandler}>
            <div className="line absolute h-25 w-0.5 top-18 left-7 bg-black"></div>
            <div>
              <input
                type="text"
                onClick={() => setpanelOpen(true)}
                value={pickup}
                onChange={(e) => setpickup(e.target.value)}
                placeholder="Add a pick up location"
                className="bg-[#eeee] px-6 py-4 text-lg rounded-xl w-full mb-4 mt-3"
              />
            </div>
            <div>
              <input
                type="text"
                onClick={() => setpanelOpen(true)}
                value={dest}
                onChange={(e) => setdest(e.target.value)}
                placeholder="Add a Drop off location"
                className="bg-[#eeee] px-6 py-4 text-lg rounded-xl w-full mt-4"
              />
            </div>
          </form>
        </div>

        {/* Animated Panel */}
        <div ref={panel} className="bg-white h-0 ">
          <LocationSuggestion rideselectionpanel={rideselectionpanel} setrideselectionpanel={setrideselectionpanel}></LocationSuggestion>
        </div>
      </div>
      <div ref={vehiclepanel}>
        <RideSelectionPanel confirmedridepanel={confirmedridepanel} setconfirmedridepanel={setconfirmedridepanel} rideselectionpanel={rideselectionpanel} setrideselectionpanel={setrideselectionpanel}></RideSelectionPanel>
      </div>
      <div   ref={confirmedpanel}  className=" fixed z-10 px-3 py-6 w-full bottom-0 bg-white">
<ConfirmedRidePanel waitingfordriver={waitingfordriver}  setwaitingfordriver={setwaitingfordriver}   confirmedridepanel={confirmedridepanel} setconfirmedridepanel={setconfirmedridepanel}></ConfirmedRidePanel>

      </div>
      <div   ref={waitingdriver}  className=" fixed z-10 px-3 py-6 w-full bottom-0 bg-white">
<WaitingForRider></WaitingForRider>

      </div>
      <div ref={driverfoundref}  className=" fixed z-10 px-3 py-6 w-full bottom-0 bg-white">
<DriverFound  driverfound={driverfound} setdriverfound={setdriverfound}></DriverFound>

      </div>
      
      
    </div>
  );
};

export default Home;
