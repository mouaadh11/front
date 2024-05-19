import { useContext, useState, useEffect } from "react";
import Button from "../button";
import { GlobalContext } from "@/context";
export default function ConfigureDevice() {
  const { patients, fetchPatients } = useContext(GlobalContext);
  const { asideOpenStatus, setAsideOpenStatus } = useContext(GlobalContext);
  const { selectedDevice, selectedPatient } = useContext(GlobalContext);
  const [selectedPatientId, setSelectedPatientId] = useState(
    selectedPatient.id
  );
  const [selectedSid, setSelectedSid] = useState("");
  const [selectedSecretKey, setSelectedSecretKey] = useState("");
  useEffect(() => {
    setSelectedPatientId(selectedPatient.id);
  }, [selectedPatient]);
  const handleSidChange = (event) => {
    setSelectedSid(event.target.value);
  };

  const handleSecretKeyChange = (event) => {
    setSelectedSecretKey(event.target.value);
  };
  const handlePatientChange = (event) => {
    setSelectedPatientId(event.target.value);
  };

  const handleActivate = async (e) => {
    e.preventDefault();

    const doctor = JSON.parse(localStorage.getItem("user"));
    const data = {
      DeviceSID: parseInt(selectedSid),
      ActivationCode: parseInt(selectedSecretKey),
      ActivatorId: doctor.id,
      Userid: parseInt(selectedPatientId),
    };
    console.log("data", selectedPatientId);
    try {
      const response = await fetch("http://localhost:5000/user/devices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error configuring device: ${response.statusText}`);
      }

      const responseData = await response.json(); // Parse the response as JSON
      console.log("Device configured successfully:", responseData);
      alert("Device configured successfully");
      // Handle successful configuration (e.g., display a success message, clear form)
    } catch (error) {
      console.error("Error configuring device:", error);
      // Handle errors appropriately (e.g., display an error message to the user)
    }
    fetchPatients();
  };
  const handleDeactivate = async (e) => {
    e.preventDefault();

    const doctor = JSON.parse(localStorage.getItem("user"));
    const data = {
      UserId: doctor.id,
    };
    console.log("data", selectedPatientId);
    try {
      const response = await fetch(
        `http://localhost:5000/user/devices/${selectedDevice.Sid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Error configuring device: ${response.statusText}`);
      }

      const responseData = await response.json(); // Parse the response as JSON
      console.log("Device configured successfully:", responseData);
      alert("Device configured successfully");
      // Handle successful configuration (e.g., display a success message, clear form)
    } catch (error) {
      console.error("Error configuring device:", error);
      // Handle errors appropriately (e.g., display an error message to the user)
    }
    fetchPatients();
  };
  const handleClose = () => {
    setAsideOpenStatus(
      Object.keys(asideOpenStatus).reduce((acc, key) => {
        acc[key] = false; // Set all panels to be closed (false)
        return acc;
      }, {})
    );
  };
  const handleOpen = (panel) => {
    setAsideOpenStatus(
      Object.keys(asideOpenStatus).reduce((acc, key) => {
        acc[key] = key === panel;
        return acc;
      }, {})
    );
  };
  return (
    <>
      <div className="flex flex-col px-6 py-4">
        <div className="flex flex-row justify-end mb-3 gap-4">
          {selectedPatient.patientId ? (
            <Button
              handler={() => {
                handleOpen("sidebar");
              }}
              imgSrc={"/back.svg"}
              styling={"hover:bg-blue-300"}
            ></Button>
          ) : (
            <Button
              handler={handleClose}
              imgSrc={"/close2.svg"}
              styling={"hover:bg-blue-300"}
            ></Button>
          )}
        </div>
        <div>
          <form
            onSubmit={
              selectedDevice && selectedDevice.Sid
                ? handleDeactivate
                : handleActivate
            }
          >
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold">Configure Device</h2>
              {console.log("device owner", selectedDevice)}
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="sid">SID:</label>
                <input
                  type="text"
                  name="sid"
                  id="sid"
                  placeholder="e.g: 12345678"
                  defaultValue={
                    selectedDevice && selectedDevice.Sid && selectedDevice.Sid
                  } // Assuming you have a selectedSid state variable
                  onChange={handleSidChange} // Assuming you have a handleSidChange function
                  className="mt-2 resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-2 mb-4 text-black">
                <label htmlFor="secretKey">Secret Key:</label>
                <input
                  type="text"
                  name="secretKey"
                  id="secretKey"
                  disabled={selectedDevice && selectedDevice.Sid}
                  placeholder={"xxx"} // Assuming you have a selectedSecretKey state variable
                  onChange={handleSecretKeyChange} // Assuming you have a handleSecretKeyChange function
                  className="mt-2 resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col gap-2 mb-4 text-black">
                <label htmlFor="patient">Select Patient:</label>
                <select
                  name="patient"
                  id="patient"
                  defaultValue={selectedPatient.id && selectedPatient.id}
                  onChange={handlePatientChange}
                  className="mt-2 resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {selectedPatient.id ? (
                    <option value={selectedPatient.id}>
                      {selectedPatient.firstName} {selectedPatient.lastName}
                    </option>
                  ) : (
                    <option value="">Select Patient</option>
                  )}

                  {patients &&
                    patients.map((patient) => (
                      !patient.hasDevice &&
                      <option key={patient.patientId} value={patient.id}>
                        {patient.firstName} {patient.lastName}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex justify-between mt-4">
                <Button
                  title={"Cancel"}
                  handler={handleClose}
                  styling={"bg-red-400"}
                />
                <Button
                  buttontype={"submit"}
                  title={
                    selectedDevice && selectedDevice.Sid
                      ? "Deactivate"
                      : "Activate"
                  }
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
