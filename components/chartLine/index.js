import { Line } from "react-chartjs-2";
import {
  Chart,
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
} from "chart.js";
import { useContext, useEffect } from "react";
import { GlobalContext } from "@/context";
import Button from "../button";
export default function () {
  const { notes, fetchAppointments, appointments } = useContext(GlobalContext);
  const { selectedPatient, fetchNotes } = useContext(GlobalContext);
  console.log("from notes", selectedPatient);

  useEffect(() => {
    fetchAppointments();
  }, [selectedPatient]);

  const handleDeleteNote = async (index) => {
    const response = await fetch(
      `http://localhost:5000/user/notes/${notes[index].Nid}`,
      {
        method: "Delete",
      }
    );
    if (!response.ok) {
      alert(`error: noteId:${notes[index].Nid}`);
    } else {
      alert("deleted successfully");
    }
    fetchNotes();
  };

  const dueAppointments =
    appointments &&
    appointments.filter((appointment) => appointment.AppState === "due");

  const appointmentData = appointments?.filter(
    (obj) => obj.AccountOwner === selectedPatient.id
  );

  console.log("appointments for a signle patient", appointmentData);
  // Chart.register(PointElement, CategoryScale, LineElement, LinearScale);
  // console.log(data);
  // const chartData = {
  //   labels: data.data.map((item) => item.time),
  //   datasets: [
  //     {
  //       label: "BPM",
  //       data: data.data.map((item) => item.bpm),
  //       fill: false,
  //       backgroundColor: "#0374db",
  //       borderColor: "#fb7c32",
  //     },
  //   ],
  // };
  // console.log(chartData);
  const handleStatusChange = async (appointmentId, newStatus, appDate) => {
    try {
      const response = await fetch(
        `http://localhost:5000/user/appointments/${appointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Set content type for JSON data
          },
          body: JSON.stringify({
            AppState: newStatus,
            AppointmentDate: appDate,
          }), // Send new AppState in body
        }
      );

      if (response.ok) {
        console.log("Appointment status updated successfully");

        fetchAppointments();
        (await appointments) && filterAppointmentsByDate(appointments);
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
      {/* <div className="header">
        <h1 className="title">BPM over 24h</h1>
      </div>
      {data && <Line data={chartData} />} */}
      <div className="mt-4 px-4 py-2 bg-blue-50 rounded-md ">
        <h3 className="text-base font-medium mb-1 ml-2">Appoitments</h3>
        <hr />
        <ul className="mt-4 h-full">
          {/* {fetchNotes()} */}
          {console.log("notes", notes)}
          {appointmentData &&
            appointmentData.map((appointment, index) => (
              <li key={index} className="bg-blue-100 mb-4 px-3 py-4 rounded-md">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col justify-between">
                    {/* <span>{appointment.AppState || "Note title"}</span>{" "} */}
                    <p className="text-sm text-gray-600">
                      {appointment.AppState === "due" ? (
                        <span className="text-black">
                          {" " + appointment.AppState + ": "}
                        </span>
                      ) : appointment.AppState === "done" ? (
                        <span className="text-green-500">
                          {" " + appointment.AppState}
                        </span>
                      ) : (
                        <span className="text-red-400">
                          {" " + appointment.AppState}
                        </span>
                      )}
                    </p>
                    {appointment.AppState === "cancelled" ? (
                      <span className="text-gray-700 mb-1 line-through">
                        {appointment.createdAt?.substring(0, 10)}
                      </span>
                    ) : (
                      <span className="text-gray-700 mb-1">
                        {appointment.createdAt?.substring(0, 10)}
                      </span>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    id={`appointment-${appointment.Aid}`}
                    checked={appointment.AppState === "done"} // Set checked based on initial state
                    disabled={appointment.AppState === "cancelled"}
                    onChange={(e) =>
                      handleStatusChange(
                        appointment.Aid,
                        e.target.checked ? "done" : "due",
                        appointment.AppointmentDate
                      )
                    }
                    className="mr-2 w-5 h-5 accent-blue-600"
                  />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
