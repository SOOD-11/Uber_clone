import React, { useState } from "react";
import map from "../assets/rendezvous.e688c83c (1).png";
import logo from "../assets/images-removebg-preview.png";
import { Link } from "react-router-dom";
import { Socket } from "socket.io-client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CaptainDashboard from "../components/CaptainComponents/CaptainDashboard";
import RideRequestList from "../components/CaptainComponents/RideRequestList";
import ConfirmRidePanel from "./ConfirmRidePanel.jsx";
import GoingforPickup from "../components/CaptainComponents/GoingForPickup.jsx";
import { useEffect } from "react";
import { useDriverContext } from "../contexts/Captaincontext.jsx";
import { useSocketContext } from "../contexts/SocketContext.jsx";
import { useAcceptedRequest } from "../contexts/AcceptedRequestContext.jsx";

const Captain_home = () => {
  const [selectedrequest, setSelectedrequest] = React.useState({});
  const [dashboardview, setDashboardView] = useState(true);
  const [confirmedpanel, setconfirmedpanel] = useState(false);
  const [requests, setRequests] = useState([]);

  const [earning, setEarning] = useState(0);
  const { sendMessage, receiveMessage } = useSocketContext();
  const captainDashboardRef = React.useRef(null);
  const confirmedridepanelRef = React.useRef(null);
  const { captain } = useDriverContext();
  const { acceptedRequest } = useAcceptedRequest();

  useEffect(() => {
    console.log("captain response see its coming", captain);

    sendMessage("join", { userType: "Driver", userId: captain?.driver?._id });
    // so well making a function that will update the captain real time location after every 10 s   usoing port forwarding
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            sendMessage("update-captain-location", {
              userId: captain?.driver?._id,

              location: {
                ltd: position.coords.latitude,
                lng: position.coords.longitude,
              },
            });
          },
          (error) => {
            console.error("Error getting geolocation:", error);
          }
        );
      } else {
        console.error("Geolocation not supported by this browser.");
      }
    };

    updateLocation();
    {
      /*setInterval(() => {
  updateLocation();
}, 10000); */
    }
    // receiving message  from user about the ride request

    receiveMessage("new-ride", (newRequest) => {
      try {
        console.log("New ride notification to captain:", newRequest);

        setRequests((prevRequests) => {
          // Flatten User.fullname if it's an object/array
          const formattedRequest = {
            ...newRequest,
            User: {
              ...newRequest.User,
              fullname: Array.isArray(newRequest.User.fullname)
                ? newRequest.User.fullname.join(" ")
                : newRequest.User.fullname,
            },
          };

          // Check for duplicate
          const alreadyExists = prevRequests.some(
            (req) => req._id === formattedRequest._id
          );
          if (alreadyExists) return prevRequests;
          console.log(" the fromated requests", formattedRequest);
          // Append new request
          return [...prevRequests, formattedRequest];
        });
      } catch (error) {
        console.log(error);
      }
    });

    // handling ride accepted by captain status need to pass the staus to user and also stor in dbs  wait how its happening
    // creating restapi as well as using soockets to send real time update

    const AcceptRide = async ({ rideid }) => {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/ride/ride-accepted`,
        {
          rideId: { rideid },
          captainId: captain.driver._id,
        },
        {
          withCredentials: true,
        }
      );
      set;
    };
  }, [captain]);

  useGSAP(() => {
    if (dashboardview) {
      gsap.to(captainDashboardRef.current, {
        y: 0,
      });
    } else {
      gsap.to(captainDashboardRef.current, {
        y: 1000,
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
        y: 1000,
      });
    }
  }, [confirmedpanel]);
  return (
    <div className="w-screen h-screen flex flex-col justify-around overflow-hidden">
      {/* Fixed Top Logo */}
      <Link
        to="/captain-home"
        className="fixed top-0 left-0 p-3 z-50 flex items-center justify-center"
      >
        <img className="w-[60px] h-[60px] inline-block" src={logo} alt="logo" />
      </Link>

      {/* Map Section (Top Half) */}
      <div className="flex-1 relative">
        <img src={map} alt="Map" className="w-full h-full object-cover" />
      </div>

      {/* Info Section (Bottom Half) */}
      <div
        ref={captainDashboardRef}
        
        className=" fixed z-10 px-3 py-6 w-full bottom-0 translate-y-0 bg-white"
      >
        <CaptainDashboard 
        ></CaptainDashboard>
      </div>
      <div className=" ">
        <RideRequestList
          requests={requests}
          setRequests={setRequests}
          dashboardview={dashboardview}
          setDashboardView={setDashboardView}
          confirmedpanel={confirmedpanel}
          setconfirmedpanel={setconfirmedpanel}
        />
      </div>
      <div
        ref={confirmedridepanelRef}
        className="fixed z-10 px-3 py-6 w-full bottom-0  pointer-events-auto translate-y-full bg-white"
      >
        <ConfirmRidePanel confirmedRequest={selectedrequest}></ConfirmRidePanel>
      </div>
    </div>
  );
};

export default Captain_home;
