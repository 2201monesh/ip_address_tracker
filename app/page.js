"use client"
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

export default function Home() {

  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [ip, setIp] = useState(null);
  const [ipAddress, setIpAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const [isp, setIsp] = useState(null);

  // using Abstract GeolocationAPI - 

  // const apiURL = process.env.NEXT_PUBLIC_API_URL;
  // const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });

  const getUserLocationFromAPI = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&ip_address=${ip}`);
    
    if (!response.ok) {
      throw new Error('Something went wrong getting Geolocation from API!');
    }
    const data = await response.json();
    console.log(data);
    setLat(data.latitude);
    setLong(data.longitude);
    setIpAddress(data.ip_address);
    setCity(data.city);
    setTimezone(data.timezone.name);
    setIsp(data.connection.isp_name);

  } catch (error) {
    console.log(error.message);
  }
};


  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="w-screen border flex flex-col items-center pt-8 bg-cover bg-center bg-gradient-to-r from-purple-600 to-blue-600">
        <p className="text-2xl mb-3">IP Address Tracker</p>
        <div className="flex justify-center items-center mb-5">
          <input className="w-80 p-3 outline-none rounded-s-md bg-white text-gray-500" type="text" placeholder="Search for any IP address" onChange={(e) => setIp(e.target.value)} />
          <div className="bg-black text-white rounded-e-md p-2 cursor-pointer" onClick={getUserLocationFromAPI}><MdKeyboardArrowRight size={32} /></div>
        </div>
        <div className="w-4/5 h-32 px-28 py-2 border bg-white rounded-md flex justify-between items-center">
          <div>
            <p className="mb-2 font-semibold">IP ADDRESS</p>
            <p>{ipAddress}</p>
          </div>
          <div>
            <p className="mb-2 font-semibold">LOCATION</p>
            <p>{city}</p>
          </div>
          <div>
            <p className="mb-2 font-semibold">TIMEZONE</p>
            <p>{timezone}</p>
          </div>
          <div>
            <p className="mb-2 font-semibold">ISP</p>
            <p>{isp}</p>
          </div>
        </div>
      </div>

      <div className="h-96 w-screen">
        {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={{lat: lat, lng: long}}
          zoom={10}
        >
          <Marker position={{ lat: lat, lng: long }} />
        </GoogleMap>
      )}
      </div>

    </div>
  );
}