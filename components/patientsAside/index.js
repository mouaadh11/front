import Button from "@/components/button";
import { GlobalContext } from "@/context";
import { useContext } from "react";
export default function ({ selectedPatient, closeFunction }) {
  const { isAsideOpen, setIsAsideOpen } = useContext(GlobalContext);
  const { isNoteFormOpen, setIsNoteFormOpen } = useContext(GlobalContext);
  const openNoteForm = () => {
    setIsAsideOpen(false);
    setIsNoteFormOpen(true)
  }
  return (
    <>
      <h2 className="text-xl font-bold mb-4">
        {selectedPatient.firstName} {selectedPatient.lastName}
      </h2>
      <ul className="list-none space-y-2">
        <li>
          <span className="font-medium">Patient ID:</span>{" "}
          {selectedPatient.patientId}
        </li>
        <li>
          <span className="font-medium">Age:</span> {selectedPatient.age}
        </li>
        <li>
          <span className="font-medium">Last Update:</span>{" "}
          {selectedPatient.lastUpdateDate}
        </li>
        <li>
          <span className="font-medium">Height:</span> {selectedPatient.height}{" "}
          cm
        </li>
        <li>
          <span className="font-medium">Weight:</span> {selectedPatient.weight}{" "}
          kg
        </li>
        <li>
          <span className="font-medium">First Visit:</span>{" "}
          {selectedPatient.firstVisitDate}
        </li>
      </ul>
      {selectedPatient &&
      selectedPatient.notes &&
      selectedPatient.notes.length > 0 ? (
        <div className="mt-4 border-t pt-2">
          <h3 className="text-base font-medium mb-2">Notes</h3>
          {selectedPatient.notes.map((note) => (
            <p className="text-gray-600 mb-1" key={note.date}>
              {note.date}: {note.note}
            </p>
          ))}
        </div>
      ) : (
        <p>No notes available for this patient.</p>
      )}
      <div className="absolute flex flex-row top-0 right-0 mt-4 mr-6">
        <div className="mr-4">
          <Button
            handler={() => {
              openNoteForm(false);
            }}
            imgSrc={"/note.svg"}
            styling={"bg-blue-300"}
            title={"Add Note"}
          ></Button>
        </div>
        <Button
          handler={() => {
            closeFunction(false);
          }}
          imgSrc={"/close2.svg"}
          styling={"hover:bg-blue-300"}
        ></Button>
      </div>
    </>
  );
}
