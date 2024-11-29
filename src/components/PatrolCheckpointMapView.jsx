import React, { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css"; // Import the MapLibre CSS
import maplibregl from "maplibre-gl"; // Import MapLibre
import { Kanit } from "next/font/google";
const kanit = Kanit({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});
import {styles} from "../app/styles.module.css"

const PatrolCheckpointMapComponent = ({ longlat, zoom }) => {
  //latlong = [[123, 123],[123, 124]]
  const mapContainerRef = useRef(null); // Create a ref for the map container

  useEffect(() => {
    console.log("longlat in Map =", longlat);
    // Initialize the map
    const map = new maplibregl.Map({
      container: mapContainerRef.current, // Reference to the map container
      style:
        "https://maps.powermap.live/api/v2/map/vtile/styles?name=thailand_th&access_token=b378c575291af30a29f59919fd7e7e4c012d45c4", // Map style URL
      center: longlat[0]?.center, //[longitude, latitude], // Initial map center [lng, lat]
      zoom: zoom, // Initial zoom level
    });

    // Create a marker and add it to the map
    const marker = new maplibregl.Marker(); // Create a new marker
    map.on("load", () => {
      longlat?.forEach((coord, index) => {
        console.log("coord =", coord);
         // Create a popup but do not attach it yet
         const popup = new maplibregl.Popup({ offset: 25, closeButton: false, closeOnClick: false })
         .setHTML(`
            <p style="color: #2C5079; font-family:${kanit.style.fontFamily};">
              <strong>
                Checkpoint:
              </strong>${coord.checkpoint}
            </p>
            <p style="color: #2C5079; font-family:${kanit.style.fontFamily};">
              <strong>
                Patroller: 
              </strong> ${coord.patroller}
            </p>
            <p style="color: #2C5079; font-family:${kanit.style.fontFamily};">
              <strong>
                Status: 
              </strong> ${coord.status}
            </p>
            <p style="color: #2C5079; font-family:${kanit.style.fontFamily};">
              <strong>
                Time: 
              </strong> ${coord.time}
            </p>
          `);

     // Create the marker
     const marker = new maplibregl.Marker()
         .setLngLat(coord.longlat)
         .addTo(map);

     // Show popup on mouse enter
     marker.getElement().addEventListener('mouseenter', () => {
         popup.setLngLat(coord.longlat).addTo(map);
     });

     // Hide popup on mouse leave
     marker.getElement().addEventListener('mouseleave', () => {
         popup.remove();
     });
      });
    });

    // Cleanup function to remove the map and marker on component unmount
    return () => {
      marker.remove(); // Remove the marker
      map.remove(); // Remove the map
    };
  }, [longlat, zoom]); // Re-run effect if props change

  return (
    <div
      ref={mapContainerRef} // Assign the ref to the div
      style={{ width: "100%", height: "100%" }} // Set the map container size
    />
  );
};

export default PatrolCheckpointMapComponent;
