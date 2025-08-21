import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const TrackingMap = ({ driverLocation }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!driverLocation || map.current) return;

    console.log("Driver location:", driverLocation);

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [driverLocation.lng, driverLocation.ltd],
      zoom:15,
      projection: "globe",
    });

    map.current.on("style.load", () => {
  map.setFog({
    "color": "white",
    "high-color": "#add8e6",
    "horizon-blend": 0.1,
    "space-color": "#000000",
    "star-intensity": 0.15
  });
});
map.current.addControl(new mapboxgl.NavigationControl());

map.current.scrollZoom.enable();
map.current.boxZoom.enable();
map.current.dragRotate.enable();
map.current.dragPan.enable();
map.current.keyboard.enable();
map.current.doubleClickZoom.enable();
map.current.touchZoomRotate.enable();
    map.current.on("load", () => {
      console.log("Map loaded ✅");

      // Add driver marker
      new mapboxgl.Marker({ color: "green" })
        .setLngLat([driverLocation.lng, driverLocation.ltd])
        .addTo(map.current);
    });
  }, [driverLocation]);

  return (
    <div ref={mapContainer}  style={{ width: "100%", height: "500px" }} />
  );
};

export default TrackingMap;