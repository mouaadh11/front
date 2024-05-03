import { GlobalContext } from "@/context";
import { useContext } from "react";
import Button from "../button";

export default function ProfileNotes() {
  const { selectedPatient, setSelectedPatient } = useContext(GlobalContext);
  const handleDeleteNote = (index) => {
    const updatedNotes = [...notes]; // Create copy to avoid mutation
    updatedNotes.splice(index, 1); // Remove the note at the specified index
    setNotes(updatedNotes);
  };

  return (
    <>
      <div className="mt-4 px-4 py-2 bg-blue-50 rounded-md ">
        <h3 className="text-base font-medium mb-1 ml-2">Notes</h3>
        <hr />
        <ul className="mt-4 h-full">
          {selectedPatient.notes.map((note, index) => (
            <li key={index} className="bg-blue-100 mb-4 px-3 py-4 rounded-md">
              <div className="flex flex-row justify-between">
                <span>{note.title || "Note title"}</span>
                <span className="text-gray-700 mb-1">{note.date}</span>
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-gray-700 mb-1">{note.note}</span>
               
                <Button
                  imgSrc={"/delete.svg"}
                  handler={() => handleDeleteNote(index)}
                  styling={"bg-blue-200 hover:bg-red-400 "}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
