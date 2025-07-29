import React, { useRef, useState } from "react";
import RideRequestCard from "./RideRequestCard";
import gsap from "gsap";
import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import { useAcceptedRequest } from "../../contexts/AcceptedRequestContext";

const dummyRequests = [
  {
    id: 1,
    userImage: "https://randomuser.me/api/portraits/men/32.jpg",
    username: "Rahul",
    price: 250,
    distance:10,
    pickupPoint:"34-b surathkal enclave, jandu colony",
    DropOffPoint:"vaishali enclave 78-b",
  },
 {
    id: 2,
    userImage: "https://randomuser.me/api/portraits/women/45.jpg",
    username: "Anjali",
    price: 200,
    pickupPoint:"34-c surathkal enclave, jandu colony",
    DropOffPoint:"vaishali enclave 79-b",
     distance:10
  },
  {
    id: 3,
    userImage: "https://randomuser.me/api/portraits/men/12.jpg",
    username: "Siddharth",
    price: 300,
    pickupPoint:"34-b surathkal enclave, jandu colony",
    DropOffPoint:"vaishali enclave 78-b",
     distance:10
  },
   /*
  {
    id: 4,
    userImage: "https://randomuser.me/api/portraits/men/32.jpg",
    username: "Rahul",
    price: 250,
     distance:10,
    pickupPoint:"34-b surathkal enclave, jandu colony",
    DropOffPoint:"vaishali enclave 78-b",
  },
  {
    id: 5,
    userImage: "https://randomuser.me/api/portraits/women/45.jpg",
    username: "Anjali",
    price: 200,
     distance:10,
    pickupPoint:"34-b surathkal enclave, jandu colony",
    DropOffPoint:"vaishali enclave 78-b",
  },
  {
    id: 6,
    userImage: "https://randomuser.me/api/portraits/men/12.jpg",
    username: "Siddharth",
    price: 300,
     distance:10,
    pickupPoint:"34-b surathkal enclave, jandu colony",
    DropOffPoint:"vaishali enclave 78-b",
  },
  {
    id: 7,
    userImage: "https://randomuser.me/api/portraits/men/32.jpg",
    username: "Rahul",
    price: 250,
     distance:10,
    pickupPoint:"34-b surathkal enclave, jandu colony",
    DropOffPoint:"vaishali enclave 78-b",
  },
  {
    id:8,
    userImage: "https://randomuser.me/api/portraits/women/45.jpg",
    username: "Anjali",
    price: 200,
     distance:10,
    pickupPoint:"34-b surathkal enclave, jandu colony",
    DropOffPoint:"vaishali enclave 78-b",
  },
  {
    id: 9,
    userImage: "https://randomuser.me/api/portraits/men/12.jpg",
    username: "Siddharth",
    price: 300,
     distance:10,
    pickupPoint:"34-b surathkal enclave, jandu colony",
    DropOffPoint:"vaishali enclave 78-b",
  }, */
];

const RideRequestList = () => {
  const navigate=useNavigate();
  const [requests, setRequests] = useState(dummyRequests);
  const RideRequestRef=useRef(null);
 const {setAcceptedRequest}=useAcceptedRequest();
// to handle confirm


  const handleConfirm = (id) => {


    console.log("Confirmed ride request:", id);


    const confirmedRequest= requests.find((req)=>req.id === id);
    setRequests((prev) => prev.filter((req) => req.id !== id));


    setAcceptedRequest(confirmedRequest);
    // to store in localstorage so that on refreshing or low internet ride request data does get lost
    localStorage.setItem('AcceptedRequests',JSON.stringify(confirmedRequest));
    navigate('/pickup');
    // to clear all pending requests after confirming one requests

      setRequests([]);
//

 
  };
  // to handle the  div behaviour on incoming and outgoing of requests
useEffect(() => {
    if (!RideRequestRef.current) return;

    if (requests.length === 0) {
      gsap.to(RideRequestRef.current, {
        backdropFilter: "blur(0px)",
        backgroundColor: "rgba(0,0,0,0)",
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(RideRequestRef.current, {
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(0,0,0,0.3)",
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [requests.length]);
  const handleIgnore = (id) => {
    console.log("Ignored ride request:", id);

    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
<div ref={RideRequestRef} className="fixed inset-0 z-50 flex items-start justify-center bg-black/30   overflow-x-hidden">
      <div className="w-screen flex flex-col space-y-4">
    {requests.map((request, index) => (
      <div
        key={request.id}
        className="absolute w-full transition-all duration-300"
        style={{
          top: `${index * 20}px`,
          zIndex: requests.length +index,
        }}
      >
        <RideRequestCard
          requests={request}
          onConfirm={handleConfirm}
          onIgnore={handleIgnore}
        />
      </div>
    ))}
  </div>
</div>
  );
};

export default RideRequestList;