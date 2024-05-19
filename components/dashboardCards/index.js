import { GlobalContext } from "@/context";
import { useContext } from "react";

export default function DashboardCards() {
 const { patientNumber, deviceNumber, totalAppointments, todayAppointment } = useContext(GlobalContext);
  return (
    <>
      <div className="flex flex-col">
        <div className=" flex flex-row justify-center items-center gap-6 py-2 px-6">
          <div className="bg-white rounded-lg shadow-md p-4 w-full">
            <h3 className="text-lg font-semibold text-gray-800">
              Total Patients
            </h3>
            <p className="text-3xl font-bold text-blue-300">{patientNumber}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 w-full">
            <h3 className="text-lg font-semibold text-gray-800">
              Active Medical Devices
            </h3>
            <p className="text-3xl font-bold text-orange-300">{deviceNumber}</p>
          </div>
        </div>
        <div className=" flex flex-row justify-center items-center gap-6 py-2 px-6">
          <div className="bg-white rounded-lg shadow-md p-4 w-full">
            <h3 className="text-lg font-semibold text-gray-800">
              Today Appointment
            </h3>
            <p className="text-3xl font-bold text-orange-500">{todayAppointment}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 w-full">
            <h3 className="text-lg font-semibold text-gray-800">
              Total Appointments
            </h3>
            <p className="text-3xl font-bold text-blue-500">{totalAppointments}</p>
          </div>
        </div>
      </div>
    </>
  );
}
