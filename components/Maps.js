"use client"
import React, { useMemo } from 'react'

// import { MapContainer, TileLayer, Marker } from "react-leaflet";
// import 'leaflet/dist/leaflet.css'
// import { Icon } from "leaflet";


import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";


function Maps({lat, long}) {

    // const customIcon = new Icon({
    //   iconUrl: "https://cdn-icons-png.flaticon.com/128/484/484167.png",
    //   iconSize: [38, 38]
    // })

    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    });

    const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);


  return (
    // <div className="w-screen">
    //     {lat ? (
    //       <MapContainer center={[lat, long]} zoom={13}>
    //         <TileLayer
    //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //         />
    //         <Marker position={[lat, long]} icon={customIcon} />
    //       </MapContainer>
    //     ) : (
    //       <p className="flex justify-center">Map will be shown here</p>
    //     )}
    //   </div>

    <div className='h-96 w-screen'>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
          <Marker position={{ lat: lat, lng: long }} />
        </GoogleMap>
      )}
    </div>
  )
}

export default Maps;


