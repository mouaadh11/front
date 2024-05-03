import { useContext, useState, useEffect } from "react";
import Button from "../button";
import { GlobalContext } from "@/context";
export default function ConfigureDevice() {
  const [devices, setDevices] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const { asideOpenStatus, setAsideOpenStatus } = useContext(GlobalContext);
  const { selectedDevice, selectedPatient } = useContext(GlobalContext);

  const handleDeviceChange = (event) => {
    setSelectedDeviceId(event.target.value);
  };

  const handlePatientChange = (event) => {
    setSelectedPatientId(event.target.value);
  };

  const handleConfigure = (event) => {
    event.preventDefault();
    console.log("Configure Device:", selectedDeviceId, selectedPatientId);
    // Implement logic to configure the device with selected patient
  };

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("/api/devices"); // Adjust API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch devices");
        }
        const data = await response.json();
        setDevices(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Set loading state to false after fetch (success or error)
      }
    };

    fetchDevices();
  }, []);
  useEffect(() => {
    const fetchPatients = async () => {
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
  }, []);
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
          { selectedPatient.patientId ? (
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
          <form onSubmit={handleConfigure}>
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold">Configure Device</h2>

              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="device">Select Device:</label>
                <select
                  name="device"
                  id="device"
                  value={selectedDeviceId}
                  onChange={handleDeviceChange}
                  className="mt-2 resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {selectedDevice.deviceId ? (
                    <option value={selectedDevice.deviceId}>
                      {selectedDevice.deviceId}
                    </option>
                  ) : (
                    <option value="">Select device</option>
                  )}
                  {devices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.deviceId}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2 mb-4 text-black">
                <label htmlFor="patient">Select Patient:</label>
                <select
                  name="patient"
                  id="patient"
                  value={selectedPatientId}
                  onChange={handlePatientChange}
                  className="mt-2 resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {selectedPatient.patientId ? (
                    <option value={selectedPatient.patientId}>
                      {selectedPatient.firstName} {selectedPatient.lastName}
                    </option>
                  ) : (
                    <option value="">Select Patient</option>
                  )}

                  {patients.map((patient) => (
                    <option key={patient.patientId} value={patient.patientId}>
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
                <Button buttontype={"submit"} title={"Configure Device"} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
