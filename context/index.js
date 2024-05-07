"use client";

import { createContext } from "react";
import { useState } from "react";
export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [devices, setDevices] = useState(null);
  const [patients, setPatients] = useState(null);
  const [headerTitle, setHeaderTitle] = useState("");
  const [notes, setNotes] = useState([]);

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
    newAppointment: false,
  });
  const fetchPatients = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/patients", {
        method: "GET",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }); // Adjust API endpoint
      if (!response.ok) {
        if (response.status === 401) {
          router.replace("auth/login");
        }
        throw new Error("Failed to fetch patients");
      }
      const data = await response.json();

      const patientList = [];
      const devicesList = [];
      data.map((_, index) => {
        if (_.user.device !== null) {
          devicesList.push(_.user.device);
          patientList.push({
            ..._.user.user,
            hasDevice: true,
            deviceId: _.user.device.Sid,
          });
        } else {
          patientList.push(_.user.user);
        }
      });
      setPatients(patientList);
      setDevices(devicesList);
    } catch (err) {}
  };
  const fetchNotes = async () => {
    const patientId = selectedPatient.id; // Assuming 'selectedPatient' has an 'id' property
    console.log("Patient id", patientId);
    try {
      const response = await fetch(
        `http://localhost:5000/user/patients/${patientId}/notes`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      ); // Adjust API endpoint
      if (!response.ok) {
        console.log("el gid rgad");
        throw new Error("Failed to fetch notes");
      }
      console.log("ya jamal a3tini notes");
      const data = await response.json();
      console.log(data);
      setNotes(data);
    } catch (err) {
      console.log(err);
    }
  };
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
        fetchPatients,
        fetchNotes,
        notes,
        setNotes,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
