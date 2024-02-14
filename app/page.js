"use client"
import { useEffect, useState } from "react";

export default function Home() {

  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  const geolocationAPI = navigator.geolocation;

  const getUserCoordinates = () => {
    if (!geolocationAPI) {
      setError('Geolocation API is not available in your browser!')
    } else {
      geolocationAPI.getCurrentPosition((position) => {
        const { coords } = position;
        setLat(coords.latitude);
        setLong(coords.longitude);
      }, (error) => {
        setError('Something went wrong getting your position!')
      })
    }
  }

  useEffect(() => {
    getUserCoordinates();
  }, [])

  return (
    <div>
      <p>Your coordinates are: {lat} and {long}</p>
    </div>
  );
}
