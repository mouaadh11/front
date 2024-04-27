import { GlobalContext } from "@/context";
import { useContext } from "react";

export default function ProfileCard() {
    const {selectedPatient, setSelectedPatient} = useContext(GlobalContext);
  return (
    <>
      <div>
        <div className="flex flex-row justify-between">
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
            {selectedPatient.lastUpdateDate}
          </p>
        </div>
        <ul className="list-none space-y-2 mb-4 text-gray-700">
          <div className="flex flex-row gap-6 ">
            <div className="flex flex-row w-fit bg-blue-50 rounded-md p-2 gap-5">
              <div className="flex flex-col gap-2">
                <li className="px-2 py-1 bg-blue-100 rounded-3xl">
                  <span className="font-medium">Patient ID:</span>{" "}
                  {selectedPatient.patientId}
                </li>
                {selectedPatient.hasDevice && (
                  <li className="px-2 py-1 bg-blue-100 rounded-3xl">
                    <span className="font-medium">Device ID:</span>{" "}
                    {selectedPatient.deviceId}
                  </li>
                )}
              </div>
              <div className="flex flex-row bg-blue-100 gap-3 rounded-md px-4 py-1 text-gray-600">
                <div className="flex flex-col justify-between">
                  <li>
                    <span className="font-medium">Height:</span>{" "}
                    {selectedPatient.height} cm
                  </li>
                  <li>
                    <span className="font-medium">Weight:</span>{" "}
                    {selectedPatient.weight} kg
                  </li>
                </div>
                <div className="flex flex-col justify-between items-start">
                  <li>
                    <span className="font-medium">Age:</span>{" "}
                    {selectedPatient.age}
                  </li>

                  <li>
                    <span className="font-medium">First Visit:</span>{" "}
                    {selectedPatient.firstVisitDate}
                  </li>
                </div>
              </div>
            </div>
            <div className="relative z-0 flex flex-row items-center w-fit border-orange-100 border-4 rounded-lg p-2 gap-5 ">
              <h2 className="text-3xl font-extrabold text-gray-400 ">- -</h2>
              <h1 className="text-3xl font-extrabold text-gray-400 ">BPM</h1>
            </div>
          </div>
        </ul>
        <hr />
      </div>
    </>
  );
}
