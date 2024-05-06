
import { GlobalContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import Button from "../button";

export default function ProfileNotes() {
  const [ notes, setNotes ] = useState([]);
  const { selectedPatient, setSelectedPatient } = useContext(GlobalContext);
  console.log("from notes", selectedPatient);
  const fetchNotes = async () => {
    const patientId = selectedPatient.id; // Assuming 'selectedPatient' has an 'id' property
    console.log("Patient id", patientId)
    try {
      const response = await fetch(
        `http://localhost:5000/user/patients/${patientId}/notes`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      ); // Adjust API endpoint
      if (!response.ok) {
        console.log("el gid rgad");
        throw new Error("Failed to fetch notes");
      }
      console.log("ya jamal a3tini notes");
      const data = await response.json();
      console.log(data);
      setNotes(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, [selectedPatient]);

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
          {/* {fetchNotes()} */}
          {console.log("notes", notes)}
          {notes && notes.map((note, index) => (
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
