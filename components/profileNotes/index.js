import { GlobalContext } from "@/context";
import { useContext } from "react";

export default function ProfileNotes() {
  const { selectedPatient, setSelectedPatient } = useContext(GlobalContext);
  return (
    <>
      <div className="mt-4 px-4 py-2 bg-blue-50 rounded-md ">
        <h3 className="text-base font-medium mb-1 ml-2">Notes</h3>
        <hr />
        <ul className="mt-4 h-full">
          {selectedPatient.notes.map((note) => (
            <li className="bg-blue-100 mb-4 px-3 py-4 rounded-md">
              <div className="flex flex-row justify-between">
                <span>Note title</span>
                <span className="text-gray-700 mb-1">{note.date}</span>
              </div>
              <span className="text-gray-700 mb-1" key={note.date}>
                {note.note}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
