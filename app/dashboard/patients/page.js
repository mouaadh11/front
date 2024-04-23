"use client";
import React, { useState, useEffect, useContext } from "react";
import Header from "@/components/header";
import RightAside from "@/components/righAside";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import PatientAside from "@/components/patientsAside";
import PatientAsideNote from "@/components/patientAsideNote";
import PatientList from "@/components/list/patients";
import PatientModifyProfile from "@/components/patientModifyProfile";

export default function Patients() {
  const [patients, setPatients] = useState([]); // State to store fetched patients
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State to handle errors
  const { isAsideOpen, setIsAsideOpen } = useContext(GlobalContext);
  const { isNoteFormOpen, setIsNoteFormOpen } = useContext(GlobalContext);
  const { selectedPatient, setSelectedPatient } = useContext(GlobalContext);
  const { isModifyProfileOpen, setIsModifyProfileOpen } =
    useContext(GlobalContext);
  const router = useRouter();
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US"); // Adjust locale as needed
  useEffect(() => {
    const fetchPatients = async () => {
      setIsLoading(true); // Set loading state to true
      setError(null); // Clear any previous errors

      try {
        const response = await fetch("/api/patients/"); // Adjust API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();
        setPatients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Set loading state to false after fetch (success or error)
      }
    };

    fetchPatients();
  }, []); // Empty dependency array to fetch patients only once on component mount
  const buttons = [
    {
      buttonTitle: "Register New Patient",
      clickHandler: () => {
        router.push("/Patient/add");
      },
    },
  ];

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted note:", event.target.note.value);
  };

  return (
    <>
      <Header title="Patients List" buttons={buttons} />
      <div className=" w-full  max-w-full flex flex-row justify-normal overflow-hidden">
        <div
          className={`py-4 px-6 bg-blue-50 w-full h-full${
            isAsideOpen || isNoteFormOpen || isModifyProfileOpen
              ? "hidden lg:block"
              : ""
          }`}
        >
          {isLoading && <p className="text-gray-500">Loading patients...</p>}{" "}
          {error && <p className="text-red-500">Error: {error}</p>}{" "}
          {patients.length > 0 ? (
            <PatientList patients={patients}></PatientList>
          ) : (
            <p className="text-gray-500">No patients found.</p>
          )}
        </div>

        <RightAside hiddenElement={isAsideOpen}>
          <PatientAside />
        </RightAside>

        <RightAside hiddenElement={isNoteFormOpen}>
          <PatientAsideNote
            selectedPatient={selectedPatient}
            formattedDate={formattedDate}
            handleNoteSubmit={handleNoteSubmit}
          />
        </RightAside>
        <RightAside hiddenElement={isModifyProfileOpen}>
          <PatientModifyProfile
            formattedDate={formattedDate}
            handleNoteSubmit={handleNoteSubmit}
          />
        </RightAside>
      </div>
    </>
  );
}
