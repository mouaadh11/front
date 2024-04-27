"use client";

import { createContext } from "react";
import { useState } from "react";
export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [devices, setDevices] = useState(null);
  const [patients, setPatients] = useState(null);
  const [headerTitle, setHeaderTitle] = useState("");
  const [selectedDevice, setSelectedDevice] = useState({});
  const [selectedPatient, setSelectedPatient] = useState({});
  const [buttonsList, setButtonsList] = useState([]);
  const [asideOpenStatus, setAsideOpenStatus] = useState({
    sidebar: false,
    noteForm: false,
    modifyProfile: false,
    deviceAside: false,
    registerPanel: false,
    configurationPanel: false,
  });

  return (
    <GlobalContext.Provider
      value={{
        buttonsList,
        setButtonsList,
        selectedDevice,
        setSelectedDevice,
        setSelectedPatient,
        selectedPatient,
        asideOpenStatus,
        setAsideOpenStatus,
        devices,
        setDevices,
        patients,
        setPatients,
        setHeaderTitle,
        headerTitle,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
