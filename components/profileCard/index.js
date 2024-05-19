import { GlobalContext } from "@/context";
import { useContext, useState, useEffect, useRef } from "react";
import Button from "../button";

export default function ProfileCard() {
  const { selectedPatient, patients, appointments, fetchAppointments } = useContext(GlobalContext);
  const [bpmData, setBpmData] = useState(""); // State to store BPM data
  const timeoutRef = useRef(null); // Create a ref to hold the timeout ID
  useEffect(() => {
    const fetchData = async () => {
      console.log("trying to fetch heart rate");
      try {
        const response = await fetch(
          `http://localhost:5000/user/patients/${selectedPatient.id}/heartrate/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        console.log("heart rate", data);

        data.message !== null && setBpmData(data.lastrecord.beat);
        data.message === null && setBpmData("--");
        // setBpmData(data); // Update BPM data in state
        console.log(bpmData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Schedule the next fetch after 5 minutes
        timeoutRef.current = setTimeout(fetchData, 1 * 60 * 1000); // 5 minutes in milliseconds
      }
    };

    fetchData(); // Initial fetch on component mount

    // Cleanup: Clear timeout on component unmount or before the next effect
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [selectedPatient]);
  const dueAppointments = appointments && appointments.filter(
    (appointment) => appointment.AppState === "due"
  );
  const appointmentData = dueAppointments && dueAppointments.find(
    (obj) => obj.AccountOwner === selectedPatient.id
  );
  console.log("appointment cards", appointmentData);
  const handleStatusChange = async (appointmentId, appDate) => {
    try {
      const response = await fetch(
        `http://localhost:5000/user/appointments/${appointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Set content type for JSON data
          },
          body: JSON.stringify({
            AppState: "cancelled",
            AppointmentDate: appDate,
          }), // Send new AppState in body
        }
      );

      if (response.ok) {
        console.log("Appointment status updated successfully");
        fetchAppointments();
      } else {
        throw new Error(
          `Error updating appointment status: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error updating appointment status:", error);
      // Handle errors appropriately, e.g., display an error message to the user
    }
  };
  return (
    <>
      <div className="w-full">
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row items-center  mb-4">
            <h2 className="text-xl font-bold">
              {selectedPatient.firstName} {selectedPatient.lastName}
            </h2>
            {selectedPatient.hasDevice ? (
              <div className="rounded-xl bg-green-300 w-3 h-3 ml-4"></div>
            ) : (
              <div className="rounded-xl bg-red-300 w-3 h-3 ml-4"></div>
            )}
          </div>
          <p>
            <span className="font-medium">Last Update:</span>{" "}
            {selectedPatient.updatedAt
              ? selectedPatient.updatedAt.substring(0, 10)
              : "---"}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center mb-4">
          <ul className="list-none space-y-2  text-gray-700">
            <div className="flex flex-row w-fit bg-blue-50 rounded-md p-2 gap-5">
              <div className="flex flex-col gap-2">
                <li className="px-2 py-1 bg-blue-100 rounded-3xl">
                  <span className="font-medium">Patient ID:</span>{" "}
                  {selectedPatient.id}
                </li>
                {selectedPatient.hasDevice && (
                  <li className="px-2 py-1 bg-blue-100 rounded-3xl">
                    <span className="font-medium">Device ID:</span>{" "}
                    {selectedPatient.deviceId}
                  </li>
                )}
              </div>

              <div className="flex flex-row bg-blue-100 gap-3 rounded-md px-4 py-2 text-gray-600">
                <div className="flex flex-col justify-between">
                  <li>
                    <span className="font-medium">Height:</span>{" "}
                    {selectedPatient.height} cm
                  </li>
                  <li>
                    <span className="font-medium">Weight:</span>{" "}
                    {selectedPatient.weight} kg
                  </li>
                  <li>
                    <span className="font-medium">Age:</span>{" "}
                    {selectedPatient.age}
                  </li>
                </div>
                <div className="flex flex-col justify-between items-start">
                  <li>
                    <span className="font-medium">First Visit:</span>{" "}
                    {selectedPatient.createdAt
                      ? selectedPatient.createdAt.substring(0, 10)
                      : "---"}
                  </li>
                  <li className="px-2 py-1 bg-blue-200 rounded-md w-full flex felx-row justify-between">
                    <div>
                      <span className="font-medium">Next Visit:</span>{" "}
                      {appointmentData &&
                      appointmentData.AppointmentDate &&
                      appointmentData.AppState === "due"
                        ? appointmentData.AppointmentDate.substring(0, 10)
                        : "---"}
                    </div>
                    {appointmentData &&
                      appointmentData.AppointmentDate &&
                      appointmentData.AppState === "due" && (
                        <button
                          className="rounded-md w-5 flex items-center justify-center ml-4"
                          onClick={() => {
                            handleStatusChange(
                              appointmentData.Aid,
                              appointmentData.AppointmentDate
                            );
                          }}
                        >
                          <img src="/close.svg" alt="cancel appointment" />
                        </button>
                      )}
                  </li>
                </div>
              </div>
            </div>
          </ul>
          <div className="relative z-0 flex flex-row items-center w-fit h-fit border-orange-100 border-4 rounded-lg p-2 gap-5 ">
            <h2 className="text-3xl font-extrabold text-gray-400 ">
              {bpmData || "Loading..."}
            </h2>
            <h1 className="text-3xl font-extrabold text-gray-400 ">BPM</h1>
          </div>
        </div>

        <hr />
      </div>
    </>
  );
}
