import express from "express";
import axios from "axios";
import ApiError from "../utilities/ApiError";
// this function is to get lattitude and longitude  for the  address 
const getAddressCordinate=async(address)=>{
    const apiKey=process.env.MAPBOX_ACCESS_TOKEN;
    // to esnsure it will consider any inout with trailing spaces 
    const encodedAddress=encodeURIComponent(address);
const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${apiKey}`;
try {
    
    const response= await axios.get(url);

    console.log("Full response of Api",response);
    
    // acording to mapbox api. .features is the correct form to destructure it 
    const location=response.data.features;
    if(location.length === 0){
        throw new ApiError(421," No results found");
      
    }
    const firstMatch=location[0];
    const coordinates=firstMatch.center;
    console.log('Longitude',coordinates[0]);
    console.log('Lattitude',coordinates[1]);
    return coordinates;
} catch (error) {
    throw new ApiError(424,"Not able to find  the cordinates");
    
}




}
