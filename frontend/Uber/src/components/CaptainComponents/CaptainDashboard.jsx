import React from 'react'
import { useDriverContext } from '../../contexts/Captaincontext'

const CaptainDashboard = (props) => {

  const {captain}=useDriverContext();
  return (
    <div className=' bg-white'>
<div >
      <div className="text-center">
        <div className="w-16 h-16 rounded-full mx-auto bg-gray-300 overflow-hidden">
          <img src= " " alt="profile" className="w-full h-full object-cover" />
        </div>
        <p className="font-semibold mt-2 text-lg">{captain?.driver?.fullname.firstname}</p>
        <h4 className="text-2xl font-bold text-green-600">{props.earning}</h4>
        <p className="text-sm text-gray-600">Earned</p>
      </div>

      <div className="flex justify-around mt-10   text-3xl text-gray-700  bg-amber-50 p-4">
       <div className="div"><i className="ri-speed-up-line" />
       <h5>80Km/h</h5></div> 
        <div className="div">
            <i className="ri-timer-line" /><h5>
          8 hours</h5>
         
          </div>
          <div className="div"><i className="ri-timer-line" /><h5>
          8 hours 
          </h5>
         </div>
      </div>
    </div>
    </div>
  )
}

export default CaptainDashboard;