import Image from "next/image";
import { GlobalContext } from "@/context";
import { useContext } from "react";
export default function ({ patients }) {
  const { isAsideOpen, setIsAsideOpen } = useContext(GlobalContext);
  const { isNoteFormOpen, setIsNoteFormOpen } = useContext(GlobalContext);
  const { selectedPatient, setSelectedPatient } = useContext(GlobalContext);
  const toggleAside = (patient) => {
    console.log(isAsideOpen);
    if (
      !isNoteFormOpen &&
      (!selectedPatient || selectedPatient.patientId === patient.patientId)
    ) {
      // Only toggle aside bar if isNoteFormOpen is false and clicking the same patient ID
      setIsAsideOpen(!isAsideOpen);
    } else if (!isNoteFormOpen) {
      // Open the aside bar for a new patient only if isNoteFormOpen is false
      setSelectedPatient(patient);
      setIsAsideOpen(true);
    }
  };

  const toggleAsideNote = (patient) => {
    if (
      !isAsideOpen &&
      (!selectedPatient || selectedPatient.patientId === patient.patientId)
    ) {
      setIsNoteFormOpen(!isNoteFormOpen);
    } else if (!isAsideOpen) {
      setSelectedPatient(patient);
      setIsNoteFormOpen(true); // Open the aside bar for the new patient
    }
  };
  return (
    <>
      <ul className="w-full rounded-lg h-auto">
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
              <Image src="/note.svg" alt="Note Icon" width={20} height={20} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
