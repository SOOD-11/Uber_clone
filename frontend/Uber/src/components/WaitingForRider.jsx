import React from 'react'
import car from '../assets/F1EA8E2E-8646-4214-BA91-9521988C3658_4_5005_c-removebg-preview.png';
const WaitingForRider = (props) => {
  return (
      <div className='flex justify-between items-center flex-col '
      onClick={()=>{
        props.setdriverfound(true);
      }}>
          <h1 className='align-centre font-bold text-black '>Looking for Nearby Drivers</h1>
          <div className="w-28 h-20 mb-10 align-middle left-5"> 
  <img src={car} alt="cars"/>
          </div>
          <div className='flex-col w-full'>
              <div className='flex justify-around p-2 m-1 border-2 '>
              <h5><i className="ri-focus-3-fill"></i></h5>
              <div className="div">
              <h3 className='font-bold'>24-A kitchlu nagar</h3>
              <p className='font-light'>rishi nagar punjab ludhiana</p>
              </div>
              </div>
              <div className='flex justify-around p-4  m-1 border-2 '>
              <h5><i className="ri-map-pin-fill"></i></h5>
            ending location
              </div>
  
              <div className='flex justify-around p-4  border-2 '>
              <h5><i class="ri-cash-line"></i></h5>
         amount to be paid 
              </div>
             
   
          </div>
  
 
      </div>
  )
}

export default WaitingForRider