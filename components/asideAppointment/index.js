import React, { useState, useContext } from "react";
import { GlobalContext } from "@/context";
import Button from "../button";
export default function AsdieAppointment() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const { selectedPatient, fetchAppointments } = useContext(GlobalContext);

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   // Implement logic to submit appointment data (e.g., API call)

  //   // Clear form after submission
  //   setDate("");
  //   setTime("");
  //   setNote("");
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Extract form data

    const date = new Date(
      `${event.target.date.value},${event.target.time.value}`
    ).toISOString();
    console.log(date);
    // const note = event.target.note.value;

    // Prepare appointment data object
    // Combine date and time into a single value
    const docotor = JSON.parse(localStorage.getItem("user"));
    console.log("doctor", docotor);
    // Convert combined date and time to ISO format
    const appointmentData = {
      AppointmentDate: date,
      DoctorId: docotor.id,
      PatientId: selectedPatient.id,
      // note,
    };
    try {
      // Replace with your actual API call logic
      const response = await fetch(`http://localhost:5000/user/appointments`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error(
          `Appointment creation failed with status: ${response.status}`
        );
      }

      alert("Appointment created successfully!");
      fetchAppointments();
      // Clear form after successful submission
      setDate("");
      setTime("");
      setNote("");
    } catch (error) {
      console.error("Error creating appointment:", error);
      // Handle errors appropriately (e.g., display an error message to the user)
    }
  };

  const { asideOpenStatus, setAsideOpenStatus } = useContext(GlobalContext);
  const handleOpen = (panel) => {
    setAsideOpenStatus(
      Object.keys(asideOpenStatus).reduce((acc, key) => {
        acc[key] = key === panel;
        return acc;
      }, {})
    );
  };
  const handleClose = () => {
    setAsideOpenStatus(
      Object.keys(asideOpenStatus).reduce((acc, key) => {
        acc[key] = false; // Set all panels to be closed (false)
        return acc;
      }, {})
    );
  };

  return (
    <div className=" p-2 h-full flex flex-col ">
      <div className="mt-4 mr-6 flex flex-row-reverse">
        <Button
          handler={() => {
            handleOpen("sidebar");
          }}
          imgSrc={"/back.svg"}
          styling={"hover:bg-blue-300"}
        ></Button>
      </div>
      <div className="m-6">
        <h2 className="text-3xl font-semibold mb-5">New Medical Appointment</h2>
        <form onSubmit={handleSubmit} className="flex flex-col w-full h-[100%] justify-between">
          <div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium mb-1">
                Date:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="mt-2 w-full resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="time" className="block text-sm font-medium mb-1">
                Time:
              </label>
              <input
                type="time"
                id="time"
                name="time"
                className="mt-2 w-full resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          {/* <div className="mb-4">
            <label htmlFor="note" className="block text-sm font-medium mb-2">
              Note:
            </label>
            <textarea
              id="note"
              name="note"
              rows={4}
              className="mt-2 w-full resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div> */}
          <div>
            <Button
              buttontype={"submit"}
              styling={
                "w-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              }
              title={"Add Appointment"}
            ></Button>
            <Button
              handler={handleClose}
              styling={"w-full px-5 mt-3 bg-orange-400 hover:bg-red-600"}
              title={"Cancel"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
