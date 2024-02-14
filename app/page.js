"use client"
import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import 'leaflet/dist/leaflet.css'

export default function Home() {

  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [ip, setIp] = useState(null);

  // using Abstract GeolocationAPI - 

  // const apiURL = 'https://ipgeolocation.abstractapi.com/v1/'
  // const apiKey = 'b753b0662a634ff8862c531dbfd14303';

  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const getUserLocationFromAPI = async () => {
  try {
    const response = await fetch(`${apiURL}?api_key=${apiKey}&ip_address=${ip}`);
    
    if (!response.ok) {
      throw new Error('Something went wrong getting Geolocation from API!');
    }
    const data = await response.json();
    console.log(data);
    setLat(data.latitude);
    setLong(data.longitude);
  } catch (error) {
    setError(error.message);
  }
};

  return (
    <div>
      <input type="text" onChange={(e) => setIp(e.target.value)} />
      <button onClick={getUserLocationFromAPI}>click</button>
      <p>Your coordinates are: {lat} and {long}</p>

      {lat && <MapContainer center={[lat, long]} zoom={13} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      <Marker position={[lat, long]} />
      </MapContainer>}
    </div>
  );
}
