import Image from "next/image";
import { GlobalContext } from "@/context";
import { useContext, useState } from "react";
export default function ({ patients }) {
  const { isAsideOpen, setIsAsideOpen } = useContext(GlobalContext);
  const { isNoteFormOpen, setIsNoteFormOpen } = useContext(GlobalContext);
  const { selectedPatient, setSelectedPatient } = useContext(GlobalContext);
  const { isModifyProfileOpen, setIsModifyProfileOpen } =
    useContext(GlobalContext);
  const toggleAside = (patient) => {
    if (
      !(isNoteFormOpen || isModifyProfileOpen) &&
      (!selectedPatient || selectedPatient.patientId === patient.patientId)
    ) {
      // Only toggle aside bar if isNoteFormOpen is false and clicking the same patient ID
      setIsAsideOpen(!isAsideOpen);
      setIsNoteFormOpen(false);
    } else if (!(isNoteFormOpen || isModifyProfileOpen)) {
      setSelectedPatient({ ...patient, hasDevice: true });
      setIsAsideOpen(true);
    }
  };

  const toggleAsideNote = (patient) => {
    if (
      !(isAsideOpen || isModifyProfileOpen) &&
      (!selectedPatient || selectedPatient.patientId === patient.patientId)
    ) {
      setIsAsideOpen(false);
      setIsModifyProfileOpen(false);
      setIsNoteFormOpen(!isNoteFormOpen);
    } else if (!(isAsideOpen || isModifyProfileOpen)) {
      setSelectedPatient(patient);
      setIsNoteFormOpen(true); // Open the aside bar for the new patient
    }
  };
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onChange && onChange(event.target.value); // Optional callback for parent handling
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
            {patients.map((patient) => (
              <li
                key={patient.patientId}
                className=" border-b border-blue-100 flex flex-row justify-between items-center  hover:bg-blue-300 rounded-s-sm"
              >
                <button
                  className="w-full py-4 px-4"
                  onClick={() => toggleAside(patient)}
                >
                  <div className="flex flex-row items-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-200 rounded-full text-xl font-bold  uppercase mr-4 text-[#fb7c32]">
                      {patient.firstName.charAt(0)}
                    </div>
                    <div className="flex flex-col ">
                      <span className="text-left text-lg font-bold text-gray-800 mb-1">
                        {patient.firstName} {patient.lastName}
                      </span>
                      <div className="w-full flex flex-row justify-between">
                        <span className="text-gray-600 font-semibold mr-6 flex flex-initial">
                          ID:{" "}
                          <span className="text-gray-600 font-normal ml-1">
                            {patient.patientId}
                          </span>
                        </span>
                        <p className="text-gray-600 font-semibold mr-6 flex flex-initial ">
                          Age:{" "}
                          <span className="text-gray-600 font-normal ml-2">
                            {patient.age}
                          </span>
                        </p>
                        <span className="text-gray-600 font-semibold mr-6 flex flex-initial">
                          Last Update:{" "}
                          <span className="text-gray-600 font-normal ml-2">
                            {patient.lastUpdateDate}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => toggleAsideNote(patient)}
                  className="mr-4 w-fit h-fit flex items-center px-2 py-2 bg-blue-200 text-white rounded-md hover:bg-[#fb7c32] "
                >
                  <Image
                    src="/note.svg"
                    alt="Note Icon"
                    width={20}
                    height={20}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
