"use client";
import React, { useEffect, useContext } from "react";
import RightAside from "@/components/rightAside";
import { GlobalContext } from "@/context";
import PatientAside from "@/components/patientsAside";
import PatientAsideNote from "@/components/patientAsideNote";
import PatientList from "@/components/list/patients";
import PatientModifyProfile from "@/components/patientModifyProfile";
import AsdieAppointment from "@/components/asideAppointment";

export default function Patients() {
  const { patients } = useContext(GlobalContext); // State to store fetched patients
  const { selectedPatient } = useContext(GlobalContext);
  const { setButtonsList } = useContext(GlobalContext);
  const { asideOpenStatus, setAsideOpenStatus } = useContext(GlobalContext);
  const { setHeaderTitle } = useContext(GlobalContext);

  const patientButtons = [
    {
      buttonTitle: "Register New Patient",
      clickHandler: () => {
        const updatedAsideOpenStatus = Object.keys(asideOpenStatus).reduce(
          (acc, key) => {
            acc[key] = key === "registerPanel";
            return acc;
          },
          {}
        );
        setAsideOpenStatus(updatedAsideOpenStatus);
      },
    },
  ];

  const formattedDate = new Date().toLocaleDateString("en-US"); // Adjust locale as needed
  useEffect(() => {}, [patients]); // Empty dependency array to fetch patients only once on component mount

  useEffect(() => {
    setButtonsList(patientButtons);
    setHeaderTitle("Patient List");
  }, [asideOpenStatus["registerPanel"]]);

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted note:", event.target.note.value);
  };

  return (
    <>
      <div className=" w-full h-full  max-w-full flex flex-row justify-normal overflow-hidden">
        <div
          className={`py-4 px-6 bg-blue-50 w-full overflow-y-hidden${
            Object.values(asideOpenStatus).some((status) => status)
              ? "lg:hidden"
              : ""
          }`}
        >
          {patients === null ? (
            <div className="text-gray-600">Loading...</div>
          ) : patients.length > 0 ? (
            <PatientList patients={patients}></PatientList>
          ) : (
            <p className="text-gray-500">No patients found.</p>
          )}
        </div>
        <RightAside hiddenElement={asideOpenStatus["sidebar"]}>
          <PatientAside />
        </RightAside>
        <RightAside hiddenElement={asideOpenStatus["newAppointment"]}>
          <AsdieAppointment />
        </RightAside>

        <RightAside hiddenElement={asideOpenStatus["noteForm"]}>
          <PatientAsideNote
            formattedDate={formattedDate}
          />
        </RightAside>

        <RightAside hiddenElement={asideOpenStatus["modifyProfile"]}>
          <PatientModifyProfile
            formattedDate={formattedDate}
            handleNoteSubmit={handleNoteSubmit}
          />
        </RightAside>
      </div>
    </>
  );
}
