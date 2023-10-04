'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface GeocoderControlProps {
  onLocationSelect: (
    location: { lat: number; lng: number },
    name: string,
  ) => void;
}

const GeocoderControl = ({ onLocationSelect }: GeocoderControlProps) => {
  const map = useMap();

  useEffect(() => {
    const geocoder = (L.Control as any).Geocoder.nominatim();
    const control = (L.Control as any)
      .geocoder({
        geocoder: geocoder,
        showResultIcons: true,
        collapsed: true,
        position: 'topright',
        placeholder: 'Search...',
      })
      .addTo(map);

    control.on('markgeocode', (e: any) => {
      const { center, name } = e.geocode;
      onLocationSelect(center, name);
    });

    return () => {
      control.remove();
    };
  }, [map, onLocationSelect]);

  return null;
};

const MyMap = () => {
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleLocationSelect = (
    location: { lat: number; lng: number },
    name: string,
  ) => {
    setSelectedLocation(location);
    setSelectedName(name);
  };

  return (
    <>
      <MapContainer
        center={[52.2319581, 21.0067249]}
        zoom={13}
        className='h-[35vh] w-10/12 lg:w-1/2 rounded-lg'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <GeocoderControl onLocationSelect={handleLocationSelect} />
      </MapContainer>
      <div className='text-center'>
        {selectedLocation ? (
          <p>
            Selected location: {selectedName}
            <br />
            Coordinates: {selectedLocation.lat}, {selectedLocation.lng}
          </p>
        ) : (
          <p>No location selected.</p>
        )}
      </div>
    </>
  );
};

export default MyMap;
