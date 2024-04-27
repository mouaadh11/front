"use client";
import React, { useContext, useEffect, Suspense, useState } from "react";
import { GlobalContext } from "../../context";
import Sidbar from "@/components/sidbar"; // Correct import for Sidebar
import Header from "@/components/header";
import RightAside from "@/components/rightAside"; // Correct import for RightAside
import RegisterNewPatient from "@/components/registerPatient";
import ConfigureDevice from "@/components/configureDevice";

export default function DashboardLayout({ children }) {
  const { buttonsList } = useContext(GlobalContext);
  const { asideOpenStatus } = useContext(GlobalContext);
  const { devices, setDevices } = useContext(GlobalContext);
  const { patients, setPatients } = useContext(GlobalContext);
  const {headerTitle, setHeaderTitle} = useContext(GlobalContext);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDevices = async () => {
      setError(null);

      try {
        const response = await fetch("/api/devices"); // Adjust API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch devices");
        }
        const data = await response.json();
        setDevices(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchPatients = async () => {
      setError(null);

      try {
        const response = await fetch("/api/patients/"); // Adjust API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();
        setPatients(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPatients();
    fetchDevices();
  }, []);

  return (
    <div className="flex h-screen bg-gray-300 overflow-hidden">
      <Sidbar />
      <div className="w-full h-screen relative flex flex-col overflow-hidden">
        <Header title={headerTitle} buttons={buttonsList} />
        <div className="flex flex-row w-full h-full">
          <Suspense
            fallback={<div className="w-full bg-white">Loading...</div>}
          >
            {children}
          </Suspense>
          <RightAside hiddenElement={asideOpenStatus["registerPanel"]}>
            <RegisterNewPatient />
          </RightAside>
          <RightAside hiddenElement={asideOpenStatus["configurationPanel"]}>
            <ConfigureDevice />
          </RightAside>
        </div>
      </div>
    </div>
  );
}
