"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import Sidbar from "@/components/sidbar";

export default function Patients() {
  const [patients, setPatients] = useState([]); // State to store fetched patients
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State to handle errors
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({});

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
      function: () => {
        router.push("/Patient/add");
      },
    },
  ];

  const toggleAside = (patient) => {
    if (!selectedPatient || selectedPatient.patientId === patient.patientId) {
      // Toggle aside bar if clicking the same patient ID
      setIsAsideOpen(!isAsideOpen);
    } else {
      setSelectedPatient(patient);
      setIsAsideOpen(true); // Open the aside bar for the new patient
    }
  };
  return (
    <>
      <Header title="Patients List" buttons={buttons} />
      <div className=" w-full h-full max-w-full flex flex-row justify-normal overflow-hidden">
        <div
          className={`py-4 px-6 bg-slate-50 w-full ${
            isAsideOpen ? "hidden lg:block" : ""
          }`}
          style={{ maxHeight: "calc(100vh - 80px)", overflowY: "auto" }}
        >
          {isLoading && <p className="text-gray-500">Loading patients...</p>}{" "}
          {error && <p className="text-red-500">Error: {error}</p>}{" "}
          {patients.length > 0 ? (
            <ul className="w-full rounded-lg h-auto">
              {patients.map((patient) => (
                <button
                  key={patient.patientId}
                  className="w-full"
                  onClick={() => toggleAside(patient)}
                >
                  <li className="py-4 px-4 border-b border-blue-100 flex flex-row justify-between hover:bg-gray-100 rounded-s-sm">
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full text-xl font-bold  uppercase mr-4 text-[#fb7c32]">
                        {patient.firstName.charAt(0)}
                      </div>
                      <div className="flex flex-col ">
                        <span className="text-left text-lg font-bold text-gray-800 mb-1">
                          {patient.firstName} {patient.lastName}
                        </span>
                        <div className="w-full flex flex-row justify-between">
                          <span className="text-gray-600 font-semibold mr-6 flex flex-initial">
                            ID:{" "}
                            <span className="text-gray-600 font-normal ml-1">
                              {patient.patientId}
                            </span>
                          </span>
                          <p className="text-gray-600 font-semibold mr-6 flex flex-initial ">
                            Age:{" "}
                            <span className="text-gray-600 font-normal ml-2">
                              {patient.age}
                            </span>
                          </p>
                          <span className="text-gray-600 font-semibold mr-6 flex flex-initial">
                            Last Update:{" "}
                            <span className="text-gray-600 font-normal ml-2">
                              {patient.lastUpdateDate}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                </button>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No patients found.</p>
          )}
        </div>

        <div
          className={`relative w-full h-full  px-6 py-4 bg-white text-black ${
            !isAsideOpen ? "hidden" : ""
          }`}
        >
          <h2 className="text-xl font-bold mb-4">
            {selectedPatient.firstName} {selectedPatient.lastName}
          </h2>
          <ul className="list-none space-y-2">
            <li>
              <span className="font-medium">Patient ID:</span>{" "}
              {selectedPatient.patientId}
            </li>
            <li>
              <span className="font-medium">Age:</span> {selectedPatient.age}
            </li>
            <li>
              <span className="font-medium">Last Update:</span>{" "}
              {selectedPatient.lastUpdateDate}
            </li>
            <li>
              <span className="font-medium">Height:</span>{" "}
              {selectedPatient.height} cm
            </li>
            <li>
              <span className="font-medium">Weight:</span>{" "}
              {selectedPatient.weight} kg
            </li>
            <li>
              <span className="font-medium">First Visit:</span>{" "}
              {selectedPatient.firstVisitDate}
            </li>
          </ul>
          {selectedPatient &&
          selectedPatient.notes &&
          selectedPatient.notes.length > 0 ? (
            <div className="mt-4 border-t pt-2">
              <h3 className="text-base font-medium mb-2">Notes</h3>
              {selectedPatient.notes.map((note) => (
                <p className="text-gray-600 mb-1" key={note.date}>
                  {note.date}: {note.note}
                </p>
              ))}
            </div>
          ) : (
            <p>No notes available for this patient.</p>
          )}
          <button
            className="close-btn absolute top-0 right-0 mr-6 bg-[#0374db] hover:bg-[#fb7c32] px-4 py-2 rounded text-white font-semibold mt-4"
            onClick={() => setIsAsideOpen(false)}
          >
            X
          </button>
        </div>
      </div>
    </>
  );
}
