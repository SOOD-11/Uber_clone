import asynchandler from "../utilities/asynchandler.js";
import { validationResult } from "express-validator";
import axios from "axios";
import ApiError from "../utilities/ApiError.js";
import { Driver } from "../models/Driver.model.js";

const getAddressCordinate = async (address) => {
    const apiKey = process.env.MAPBOX_ACCESS_TOKEN;
    // to esnsure it will consider any inout with trailing spaces
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${apiKey}`;
    try {
        const response = await axios.get(url);

        // acording to mapbox api. .features is the correct form to destructure it
        const location = response.data.features;
        if (location.length === 0) {
            throw new ApiError(421, " No results found");
        }
        const firstMatch = location[0];
        const coordinates = firstMatch.center;
        console.log("Longitude", coordinates[0]);
        console.log("Lattitude", coordinates[1]);
        return coordinates;
    } catch (error) {
        throw new ApiError(424, "Not able to find  the cordinates");
    }
};
const getSuggestions = async (address) => {
    const apiKey = process.env.MAPBOX_ACCESS_TOKEN;
    // to esnsure it will consider any inout with trailing spaces
    const encodedAddress =  encodeURIComponent(address);
    const start=await getAddressCordinate(address);
const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json` +
  `?access_token=${apiKey}` +
  `&proximity=${start[0]},${start[1]}` +
  `&types=place,neighborhood,address,poi` +
  `&limit=10`;
    try {
        const response = await axios.get(url);

        // acording to mapbox api. .features is the correct form to destructure it
        const location = response.data.features.map(feature => ({
    id: feature.id,
    name: feature.text,
    fullName: feature.place_name,
    coordinates: {
      lat: feature.center[1],
      lng: feature.center[0]
    },
    type: feature.place_type?.[0] || 'unknown'
  }));
;
        if (location.length === 0) {
            throw new ApiError(421, " No results found");
        }
       


        return location;
    } catch (error) {
     
        throw new ApiError(424, error);
    }
};
const getDistanceandTime = async (pickupaddress, dropaddress) => {
    if (!pickupaddress || !dropaddress) {
        throw new ApiError(432, "Not able to get addresses");
    }
    const start = await getAddressCordinate(pickupaddress);
    const end = await getAddressCordinate(dropaddress);
    const accesstoken = process.env.MAPBOX_ACCESS_TOKEN;
    try {
        const response = await axios.get(
            // well we can foind based on different  mode like in case of driving it is there
            // if u want for walking juat get walking instead of driving

            `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?access_token=${accesstoken}&overview=simplified&geometries=geojson`
        );

        const route = response.data.routes[0];
        const distanceInkm = (route.distance / 1000).toFixed(2);
        const durationInMin = (route.duration / 60).toFixed(2);
        if (!distanceInkm) {
            throw new ApiError(434, " distance not found");
        }
        if (!durationInMin) {
            throw new ApiError(435, "duration not able to calculate");
        }
        console.log(response.data);

        console.log("distance", distanceInkm);
        console.log("time", durationInMin);

        return { distanceInkm, durationInMin };
    } catch (error) {
        throw new ApiError(431, error);
    }
};


const getCaptainsIntheRadius=async(ltd,lng,radius)=>{
// fetch those captains which are around the radius  to give them ride request notification
const captains= await  Driver.find({
location:{
$geoWithin:{


    $centreSphere:[[ltd,lng],radius/3963.2]
}



}



});

console.log(captains);
return captains;

}
const mapcontrols = asynchandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address } = req.body;
    const coordinates = await getAddressCordinate(address);
    return res.status(200).json({ coordinates });
});
const suggestions = asynchandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }// it will read from get requst naa  tyhats why queruy
    const { address } = req.query;
    const destinationsuggestions = await getSuggestions(address);

    return res.status(200).json({ destinationsuggestions });
});
const distancetime = asynchandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickupaddress, dropaddress } = req.body;
    const DistanceTime = await getDistanceandTime(pickupaddress, dropaddress);
    return res.status(200).json({ DistanceTime });
});
export { mapcontrols, getAddressCordinate, getDistanceandTime, distancetime,getSuggestions,suggestions,getCaptainsIntheRadius };
