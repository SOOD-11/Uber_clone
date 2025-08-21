import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import polyline from "@mapbox/polyline";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = ({ driverLocation, targetLocation }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const driverMarker = useRef(null);
  const targetMarker = useRef(null);
  const [instructions, setInstructions] = useState([]);

const getTargetLocationCordinate = async (targetLocation) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/maps/getcordinates`,
        { address: targetLocation } 
    );

    let coords = res.data;

    // If backend returns { coordinates: [lng, lat] }
    if (coords && Array.isArray(coords.coordinates) && coords.coordinates.length === 2) {
      return coords.coordinates;
    }

    throw new Error("Unsupported coordinate format");
  } catch (err) {
    console.warn("Failed to fetch target coordinates, using fallback:", err);
    return [driverLocation.lng + 3, driverLocation.lat + 10];
  }
};

  useEffect(() => {
    if (!map.current && driverLocation) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [driverLocation.lng, driverLocation.lat],
        zoom: 14,
        projection:'globe'
      });
    }
  }, [driverLocation]);

  // ✅ Update route + instructions
  useEffect(() => {
    if (!map.current || !driverLocation) return;

    const updateMap = async () => {
      let routeCoords = [];
      let targetCoords = null;
      let navSteps = [];
    let coords=null;
      if (targetLocation) {
        targetCoords = await getTargetLocationCordinate(targetLocation);

        console.log("target cooords",targetCoords);

        try {
          const res = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${driverLocation.lng},${driverLocation.lat};${targetCoords[0]},${targetCoords[1]}?steps=true&geometries=polyline&access_token=${mapboxgl.accessToken}`
          );
          const data = await res.json();

          if (data.routes && data.routes[0]) {
            // ✅ Polyline geometry
            routeCoords = polyline
              .decode(data.routes[0].geometry)
              .map(([lat, lng]) => [lng, lat]);

            // ✅ Extract navigation steps
            navSteps = data.routes[0].legs[0].steps.map((step) => ({
              distance: (step.distance / 1000).toFixed(1), // km
              instruction: step.maneuver.instruction,
            }));
          }
        } catch (err) {
          console.warn("Failed to fetch route, fallback to straight line");
          routeCoords = [
            [driverLocation.lng, driverLocation.lat],
            [targetCoords[0],targetCoords[1]]
          ];
        }
      }

      setInstructions(navSteps);

      // ✅ Driver marker
      if (!driverMarker.current) {
        driverMarker.current = new mapboxgl.Marker({ color: "green" })
          .setLngLat([driverLocation.lng, driverLocation.lat])
          .addTo(map.current);
      } else {
        driverMarker.current.setLngLat([driverLocation.lng, driverLocation.lat]);
      }

      // ✅ Target marker
      if (targetCoords) {
        if (!targetMarker.current) {
          targetMarker.current = new mapboxgl.Marker({ color: "red" })
            .setLngLat(targetCoords)
            .addTo(map.current);
        } else {
          targetMarker.current.setLngLat(targetCoords);
        }
      }

      // ✅ Remove old route
      if (map.current.getLayer("route")) map.current.removeLayer("route");
      if (map.current.getSource("route")) map.current.removeSource("route");

      // ✅ Add new route
      if (routeCoords.length > 0) {
        map.current.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: { type: "LineString", coordinates: routeCoords },
          },
        });
        map.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#2563eb", "line-width": 5 },
        });
      }
    };

    updateMap();
  }, [driverLocation, targetLocation]);

  return (
    <div className="flex gap-4">
      <div
        ref={mapContainer}
        className="w-3/4 h-[80vh] rounded-xl shadow-lg"
      />
      <div className="w-1/4 h-[80vh] overflow-y-auto p-4 bg-white shadow-lg rounded-xl">
        <h2 className="font-bold text-lg mb-2">Navigation Instructions</h2>
        <ul className="space-y-2 text-sm">
          {instructions.map((step, i) => (
            <li key={i} className="p-2 border rounded">
              <strong>{step.distance} km</strong> – {step.instruction}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapComponent;