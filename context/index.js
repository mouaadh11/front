"use client";

import { createContext } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [devices, setDevices] = useState(null);
  const [patients, setPatients] = useState(null);
  const [headerTitle, setHeaderTitle] = useState(null);
  const [patientNumber, setPatientNumber] = useState(0);
  const [deviceNumber, setDeviceNumber] = useState(0);
  const [todayAppointment, setTodayAppointment] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [notes, setNotes] = useState([]);
  const [appointments, setAppointents] = useState([]);
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
  const router = useRouter();
  function calculateAge(dateOfBirth) {
    // Parse the date string into a Date object
    const dob = new Date(dateOfBirth);
    console.log("dob", dob);
    // Get the current date
    const today = new Date();
    console.log(today);
    // Calculate the difference in milliseconds
    const diffInMs = today.getTime() - dob.getTime();
    console.log("diffInMs", diffInMs);
    // Convert milliseconds to years (rounded down)
    const age = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));
    console.log("age", age);
    return age;
  }
  const fetchPatients = async () => {
    console.log("wating to fetch data");
    try {
      const response = await fetch("http://localhost:5000/user/patients", {
        method: "GET",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }); // Adjust API endpoint
      if (!response.ok) {
        if (response.status === 401) {
          router.push("/auth/login");
        }
        throw new Error("Failed to fetch patients");
      }
      const data = await response.json();
      console.log("response fetched", data);

      const patientList = [];
      const devicesList = [];
      let patientNum = 0;
      let deviceNum = 0;
      data.map((_, index) => {
        console.log(_);
        if (_.users.device !== null) {
          console.log("makach device");
          devicesList.push(_.users.device);
          patientList.push({
            ..._.users.user,
            hasDevice: true,
            deviceId: _.users.device.Sid,
            age: calculateAge(_.users.user.birthdate),
          });
          patientNum = patientNum + 1;
          deviceNum = deviceNum + 1;
        } else {
          patientList.push({
            ..._.users.user,
            age: calculateAge(_.users.user.birthdate),
          });
          patientNum = patientNum + 1;
          console.log("kayn device");
        }
      });
      console.log("patient feched", patientList);
      setPatients(patientList);
      setDevices(devicesList);
      setPatientNumber(patientNum);
      setDeviceNumber(deviceNum);
    } catch (err) {}
  };
  const handleStatusChange = async (appointmentId, newStatus, appDate) => {
    try {
      const response = await fetch(
        `http://localhost:5000/user/appointments/${appointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            AppState: newStatus,
            AppointmentDate: appDate,
          }),
        }
      );

      if (response.ok) {
        console.log("Appointment status updated successfully");
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

  function isAppointmentExpired(appointmentDate) {
    // Parse the appointment date string into a Date object
    const appointmentDateTime = new Date(appointmentDate);

    // Get the current date and time in milliseconds since epoch (1970-01-01T00:00:00Z)
    const now = new Date().getTime();

    // Check if the appointment date is in the past (less than current time)
    return appointmentDateTime.getTime() < now;
  }
  function filterAppointmentsByDate(appointments) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set today's date to midnight
    console.log("from filter", appointments, "todayDay");
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.AppointmentDate);
      appointmentDate.setHours(0, 0, 0, 0);
      return appointmentDate.getTime() === today.getTime();
    });
  }
  const fetchAppointments = async () => {
    console.log("fetching appoitments");
    try {
      const response = await fetch(`http://localhost:5000/user/appointments`, {
        method: "GET",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      if (!response.ok) {
        if (response.status === 401) {
          router.replace("auth/login");
        }
        throw new Error("Failed to fetch patients");
      }
      const data = await response.json();
      console.log("appointments", data);
      const appointmentList = [];
      data.map((app, index) => {
        // // Example usage in your code
        if (
          app.AppState === "due" &&
          isAppointmentExpired(app.AppointmentDate)
        ) {
          handleStatusChange(app.Aid, "cancelled", app.AppointmentDate);
        }
        if (!isAppointmentExpired(app.AppointmentDate)) {
          appointmentList.push(app);
        }
        // handleStatusChange(app.Aid, "due", app.AppointmentDate);
      });
      // const doneAppointments = data.filter((appointment) => appointment.state === "done" || appointment.state === "done");
      setAppointents(appointmentList);
      setTotalAppointments(appointmentList.length);
      console.log("today", appointmentList);
      setTodayAppointment(filterAppointmentsByDate(appointmentList).length);
    } catch (error) {}
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

  const fetchNotifications = async () => {
    const doctor = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch(
        `http://localhost:5000/user/notification/${doctor.id}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (!response.ok) {
        console.log("el gid rgad");
        throw new Error("Failed to fetch notifications");
      }
      console.log("notificaions");
      const data = await response.json();
      console.log("notifications -data:", data);
      const notificaionsList = [];
      data.map((not, index) => {
        if (!not.isRead) {
          notificaionsList.push(not);
        }
      });
      console.log("notificatons list", notificaionsList);
      setNotifications(notificaionsList);
    } catch (error) {
      console.log(error);
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
        appointments,
        setAppointents,
        fetchAppointments,
        deviceNumber,
        patientNumber,
        totalAppointments,
        todayAppointment,
        notifications,
        fetchNotifications,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
