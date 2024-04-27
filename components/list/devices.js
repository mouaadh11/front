import { GlobalContext } from "@/context";
import { useContext, useState } from "react";
import Button from "../button";
export default function ({ devices }) {
  const { selectedDevice, setSelectedDevice } = useContext(GlobalContext);
  const { asideOpenStatus, setAsideOpenStatus } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onChange && onChange(event.target.value); // Optional callback for parent handling
  };
  
  const handleOpen = (panel, device) => {
    console.log(selectedDevice);
    setSelectedDevice(device);
    setAsideOpenStatus(
      Object.keys(asideOpenStatus).reduce((acc, key) => {
        acc[key] = key === panel;
        return acc;
      }, {})
    );
  };
  return (
    <>
      <div className="w-full">
        <div className="sticky flex items-center w-full text-gray-700 my-4 ">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-1 focus:ring-[#fb7c32] focus:border-[#fb7c32]"
            placeholder="Serach using ID, Name,..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md bg-blue-200 hover:bg-[#fb7c32] focus:outline-none focus:ring-1 focus:ring-[#fb7c32] focus:border-[#fb7c32]"
          >
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div>
          <ul className="w-full border-t-2 overflow-y-scroll h-[80vh]">
            {devices.map((device) => (
              <li
                key={device.deviceId}
                className=" border-b border-blue-100 flex flex-row justify-between items-center  hover:bg-blue-300 rounded-s-sm"
              >
                <button
                  className="w-full py-4 px-4"
                  onClick={() => handleOpen("deviceAside", device)}
                >
                  <div className="flex flex-row items-center">
                    <div className="infromation">
                      <span className=" text-left block text-lg font-bold text-gray-800 mb-1">
                        Owner:
                        <span className="text-gray-600 font-semibold ml-2">
                          {device.username}
                        </span>
                      </span>
                      <span className="text-gray-600 font-semibold mr-6">
                        Device ID:
                        <span className="text-gray-600 font-normal ml-2">
                          {device.deviceId}
                        </span>
                      </span>
                      <span className="text-gray-600 font-semibold mr-6">
                        Activated Date:
                        <span className="text-gray-600 font-normal ml-2">
                          {device.activationDate}
                        </span>
                      </span>
                    </div>
                  </div>
                </button>
                <Button
                  handler={() => handleOpen("configurationPanel", device)}
                  imgSrc={"/configure.svg"}
                  styling={"bg-blue-200 text-white mr-4"}
                ></Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
