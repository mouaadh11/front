"use client";
import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "@/context";
import DevicesList from "@/components/list/devices";
import RighAside from "@/components/rightAside";
import DeviceAside from "@/components/DeviceAside";

export default function Device() {
  const { devices, } = useContext(GlobalContext); // State to store fetched devices
  const { setButtonsList } = useContext(GlobalContext);
  const { asideOpenStatus, setAsideOpenStatus } = useContext(GlobalContext);
  const { setHeaderTitle } = useContext(GlobalContext);

  const deviceButtons = [
    {
      buttonTitle: "Configure Device",
      clickHandler: () => {
        const updatedAsideOpenStatus = Object.keys(asideOpenStatus).reduce(
          (acc, key) => {
            acc[key] = key === "configurationPanel";
            return acc;
          },
          {}
        );
        setAsideOpenStatus(updatedAsideOpenStatus);
      },
    },
  ];

  useEffect(() => {
    setButtonsList(deviceButtons);
    setHeaderTitle("Devices List");
  }, [asideOpenStatus["configurationPanel"]]);
  return (
    <>
      <div className="w-full h-full max-w-full flex flex-row ">
        <div className="w-full bg-blue-50 py-4 px-6">
          {devices === null ? (
            <div className="text-gray-600">Loading...</div>
          ) : devices.length > 0 ? (
            <DevicesList devices={devices} />
          ) : (
            <p className="mt-4 text-gray-600">No devices found.</p>
          )}
        </div>
        <RighAside hiddenElement={asideOpenStatus["deviceAside"]}>
          <DeviceAside />
        </RighAside>
      </div>
    </>
  );
}
