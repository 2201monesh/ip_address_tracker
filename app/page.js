"use client"
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {

  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [ip, setIp] = useState(null);

  // using Abstract GeolocationAPI - 

  const apiURL = 'https://ipgeolocation.abstractapi.com/v1/'
  const apiKey = 'b753b0662a634ff8862c531dbfd14303';

  const getUserLocationFromAPI = async () => {
  try {
    const response = await fetch(`${apiURL}?api_key=${apiKey}&ip_address=${ip}`);
    
    if (!response.ok) {
      throw new Error('Something went wrong getting Geolocation from API!');
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    setError(error.message);
  }
};

  useEffect(() => {
    // getUserLocationFromAPI();
  }, [])

  return (
    <div>
      <p>Your coordinates are: {lat} and {long}</p>
    </div>
  );
}
