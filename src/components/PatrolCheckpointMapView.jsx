import React, { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css"; // Import the MapLibre CSS
import maplibregl from "maplibre-gl"; // Import MapLibre



const PatrolCheckpointMapComponent = ({ longlat, zoom }) => { //latlong = [[123, 123],[123, 124]]
  const mapContainerRef = useRef(null); // Create a ref for the map container

  useEffect(() => {
    console.log("longlat =", longlat);
    // Initialize the map
    const map = new maplibregl.Map({
      container: mapContainerRef.current, // Reference to the map container
      style:
        "https://maps.powermap.live/api/v2/map/vtile/styles?name=thailand_th&access_token=b378c575291af30a29f59919fd7e7e4c012d45c4", // Map style URL
      center: longlat[0],//[longitude, latitude], // Initial map center [lng, lat]
      zoom: zoom, // Initial zoom level
    });

    // Create a marker and add it to the map
    const marker = new maplibregl.Marker() // Create a new marker
    map.on('load', () => {
        longlat?.forEach(coord => {
          new maplibregl.Marker()
            .setLngLat(coord)
            .addTo(map);
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
