"use client";

import { navigatingRoutes } from "@/lib/placeholder-data";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface Location {
  lat: number;
  lng: number;
}

const Page = () => {
  const mapsApiUrl = process.env.NEXT_PUBLIC_MAPS_API_KEY as string;
  const params = useParams();
  const foundLocation = navigatingRoutes.find(
    (route) => route.id == params.locationId,
  );

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: mapsApiUrl,
  });
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_WS_API_URL as string);
    setSocket(socketInstance);

    socketInstance.on("bus_location", (data) => {
      console.log(data);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const [selectedLocation, setSelectedLocation] = useState<Location>({
    lat: foundLocation?.latitude!,
    lng: foundLocation?.longitude!,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="w-full h-screen grid place-items-center">
      <GoogleMap
        zoom={16}
        center={selectedLocation}
        mapContainerClassName="map-container"
        onClick={(e) => {
          const lat = e.latLng?.lat() || 0;
          const lng = e.latLng?.lng() || 0;

          setSelectedLocation({ lat, lng });
          socket?.emit("bus_status", {
            busId: params.locationId,
            location: { lat, lng },
          });
        }}
      >
        <Marker
          position={selectedLocation}
          icon={{
            url: "/selectedLocation.png",
            scaledSize: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(25, 25),
          }}
        />

        {/* Destination */}

        <Marker
          position={{
            lat: 37.785834,
            lng: -122.406417,
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default Page;
