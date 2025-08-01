'use client';

import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

export default function RequestPage() {
  const containerStyle = {
    width: '400px',
    height: '400px',
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '', // safer way to handle API key
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null); // typed the map properly

  const onLoad = React.useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback((map: google.maps.Map) => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components like Markers or InfoWindows can be placed here */}
      <></>
    </GoogleMap>
  ) : (
    <div>Loading Map...</div>
  );
}
