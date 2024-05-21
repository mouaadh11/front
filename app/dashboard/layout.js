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
  const { headerTitle, fetchPatients, fetchAppointments, fetchNotifications, seletedPatient } = useContext(GlobalContext);
  useEffect(() => {
    console.log("waiting for data");
    fetchPatients();
    fetchAppointments();
    fetchNotifications();
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
            {
              <RegisterNewPatient />

            }
          </RightAside>
          <RightAside hiddenElement={asideOpenStatus["configurationPanel"]}>
            <ConfigureDevice />
          </RightAside>
        </div>
      </div>
    </div>
  );
}
