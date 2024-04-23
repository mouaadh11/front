"use client";
import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "@/context";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import DevicesList from "@/components/list/devices";
import RighAside from "@/components/righAside";
import DeviceAside from '@/components/DeviceAside';

export default function Device() {
  const [devices, setDevices] = useState([]); // State to store fetched devices
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State to handle errors
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const { selectedDevice, setselectedDevice } = useContext(GlobalContext);
  const router = useRouter();
  const { isDeviceAsideOpen, setDeviceAsideOpen } = useContext(GlobalContext);

  useEffect(() => {
    const fetchDevices = async () => {
      setIsLoading(true); // Set loading state to true
      setError(null); // Clear any previous errors

      try {
        const response = await fetch("/api/devices"); // Adjust API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch devices");
        }
        const data = await response.json();
        setDevices(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Set loading state to false after fetch (success or error)
      }
    };

    fetchDevices();
  }, []);
  const buttons = [
    {
      buttonTitle: "Configure a New Device",
      clickHandler: () => {
        // router.push('/device/information');
        console.log("worked");
      },
    },
  ];

  return (
    <>
      
        <Header title="Activated Devices" buttons={buttons} />

        <div className="w-full h-full max-w-full flex flex-row ">
          <div className="w-full bg-white py-4 px-6">
            {isLoading && <p className="text-gray-600">Loading devices...</p>}
            {error && <p className="text-red-600">Error: {error}</p>}
            {devices.length > 0 ? (
              <DevicesList devices={devices} />
            ) : (
              <p className="mt-4 text-gray-600">No devices found.</p>
            )}
          </div>
          <RighAside hiddenElement={isDeviceAsideOpen}>
            <DeviceAside />
          </RighAside>
        </div>
            </>
  );
}
