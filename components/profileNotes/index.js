import { GlobalContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import Button from "../button";

export default function ProfileNotes() {
  const { notes, setNotes } = useContext(GlobalContext);
  const { selectedPatient, fetchNotes } = useContext(GlobalContext);
  console.log("from notes", selectedPatient);

  useEffect(() => {
    fetchNotes();
  }, [selectedPatient]);

  const handleDeleteNote = async (index) => {
    // const updatedNotes = [...notes]; // Create copy to avoid mutation
    // updatedNotes.splice(index, 1); // Remove the note at the specified index
    const response = await fetch(
      `http://localhost:5000/user/notes/${notes[index].Nid}`,
      {
        method: "Delete",
      }
    );
    if (!response.ok) {
      alert(`error: noteId:${notes[index].Nid}`);
    } else {
      alert("deleted successfully");
    }
    fetchNotes();
  };
  return (
    <>
      <div className="mt-4 px-4 py-2 bg-blue-50 rounded-md ">
        <h3 className="text-base font-medium mb-1 ml-2">Notes</h3>
        <hr />
        <ul className="mt-4 h-full">
          {/* {fetchNotes()} */}
          {console.log("notes", notes)}
          {notes &&
            notes.map((note, index) => (
              <li key={index} className="bg-blue-100 mb-4 px-3 py-4 rounded-md">
                <div className="flex flex-row justify-between">
                  <span>{note.NoteSub || "Note title"}</span>
                  <span className="text-gray-700 mb-1">{note.date}</span>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-gray-700 mb-1">{note.NoteMain}</span>

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
