import { GlobalContext } from "@/context";
import { useContext } from "react";

export default function Deicecard() {
  const { selectedDevice, setSelectedDevice } = useContext(GlobalContext);
  return (
    <>
      {selectedDevice && (
        <div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center  mb-4">
              <h2 className="text-xl font-bold">{selectedDevice.Sid}</h2>
            </div>
            <p>
              <span className="font-medium">Active Since:</span> 11/12/2023
            </p>
          </div>
          <ul className="list-none space-y-2 mb-4 text-gray-700">
            <div className="flex flex-row gap-6 ">
              <div className="flex flex-row w-fit bg-blue-50 rounded-md p-2 gap-5">
                <div className="flex flex-col gap-2">
                  <li className="px-2 py-1 bg-blue-100 rounded-3xl">
                    <span className="font-medium">Device ID:</span>{" "}
                    {selectedDevice.deviceId}
                  </li>

                  <li className="px-2 py-1 bg-blue-100 rounded-3xl">
                    <span className="font-medium">Device ID:</span>{" "}
                    {selectedDevice.activationDate}
                  </li>
                </div>
              </div>
            </div>
          </ul>
          <hr />
        </div>
      )}
    </>
  );
}
