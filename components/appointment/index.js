import { GlobalContext } from "@/context";
import { useContext, useState, useEffect } from "react";

export default function Appointment({ appointments }) {
  const [filteredAppointments, setFilteredAppointments] =
    useState(appointments);
  const [filter, setFilter] = useState(true);
  const { patients, fetchAppointments } = useContext(GlobalContext);
  const [filterActive, setFilterActive] = useState(true); // Assuming filter is on/off
  useEffect(() => {
    const fetchData = async () => {
      // Update filteredAppointments with matching Aid and new data
      const filtered = filteredAppointments.map((filteredApp) => {
        const matchingUpdatedApp = appointments.find(
          (updatedApp) => updatedApp.Aid === filteredApp.Aid
        );
        return matchingUpdatedApp || filteredApp;
      });
      setFilteredAppointments(filtered); // Update state within effect
    };

    fetchData(); // Call the function on component mount or dependency change
  }, [appointments]);
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

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0"); // Add leading zero if needed
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const yyyy = today.getFullYear();
  const formattedDate = yyyy + "-" + mm + "-" + dd;
  function filterAppointmentsByDate(appointments) {
    console.log("filter", filterActive); // For debugging

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set today's date to midnight

    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.AppointmentDate);
      appointmentDate.setHours(0, 0, 0, 0); // Set appointment date to midnight
      return appointmentDate.getTime() === today.getTime();
    });
  }
  return (
    <>
      <div className="relative bg-slate-100 w-full overflow-hidden p-2 border-l-2 border-grey-400">
        <div className="sticky border-b-2 p-2 flex flex-row justify-between items-center">
          <h1 className="text-gray-600 text-3xl">Appointments</h1>
          <button
            className="text-gray-700 hover:bg-gray-400 p-1 rounded-md"
            onClick={async () => {
              setFilterActive(!filterActive);
              if (filterActive) {
                const filtered = filterAppointmentsByDate(appointments);
                                setFilteredAppointments(filtered);
              } else {
                setFilteredAppointments(appointments);
              }
            }}
          >
            <img className="w-6" src="/filter.svg" alt="filter" />
          </button>
        </div>
        <ul className="flex flex-col overflow-auto h-[60vh] px-2 py-4 gap-2">
          {console.log("appointments from comp:", appointments)}
          {filteredAppointments &&
            filteredAppointments.map((appointment, index) => (
              <button>
                <li
                  key={index}
                  className="flex flex-col items-start py-2 px-2 bg-blue-100 rounded-md"
                >
                  <div className="flex flex-row justify-between items-center w-full">
                    <h3 className="text-lg font-medium text-gray-800">
                      {
                        patients.find(
                          (obj) => obj.id === appointment.AccountOwner
                        ).firstName
                      }{" "}
                      {
                        patients.find(
                          (obj) => obj.id === appointment.AccountOwner
                        ).lastName
                      }
                    </h3>
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
                  <div className="flex flex-row items-center ">
                    <p className="text-sm text-gray-600">
                      {appointment.AppState === "due" ? (
                        <span className="text-black">
                          {" " + appointment.AppState + ": "}
                        </span>
                      ) : appointment.AppState === "done" ? (
                        <span className="text-green-500">
                          {" " + appointment.AppState + ": "}
                        </span>
                      ) : (
                        <span className="text-red-400">
                          {" " + appointment.AppState + ": "}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {console.log("date now", formattedDate)}
                      {appointment.AppointmentDate
                        ? appointment.AppointmentDate.substring(0, 10) ===
                          formattedDate
                          ? " Today"
                          : " " + appointment.AppointmentDate.substring(0, 10)
                        : ""}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      ,
                      {appointment.AppointmentDate
                        ? " " + appointment.AppointmentDate.substring(11, 16)
                        : ""}
                    </p>
                  </div>
                </li>
              </button>
            ))}
        </ul>
      </div>
    </>
  );
}
