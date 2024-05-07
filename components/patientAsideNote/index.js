import Button from "../button";
import { GlobalContext } from "@/context";
import { useContext } from "react";
export default function ({ formattedDate }) {
  const { asideOpenStatus, setAsideOpenStatus, fetchPatients, fetchNotes } =
    useContext(GlobalContext);
  const { selectedPatient } = useContext(GlobalContext);
  const handleOpen = (panel) => {
    setAsideOpenStatus(
      Object.keys(asideOpenStatus).reduce((acc, key) => {
        acc[key] = key === panel;
        return acc;
      }, {})
    );
  };
  console.log("Selected Patient", selectedPatient);
  const handleNoteSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Extract form data
    const noteTitle = event.target.elements.noteTitle.value;
    const noteContent = event.target.elements.note.value;
    const patientId = selectedPatient.id; // Assuming 'selectedPatient' has an 'id' property
    const doctor = JSON.parse(localStorage.getItem("user"));
    console.log(doctor);
    // Construct request body
    const formData = JSON.stringify({
      AuthorId: doctor.id,
      NoteTitle: noteTitle,
      NoteContent: noteContent,
    });

    try {
      // Send POST request
      const response = await fetch(
        `http://localhost:5000/user/patients/${patientId}/notes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorizatoin: "Bearer " + localStorage.getItem("token"),
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error creating note: ${response.status}`);
      }

      // Handle success (e.g., display success message, clear form, close panel)
      console.log("Note created successfully!");
      alert("Note successfully created!");
      // You might want to clear the form fields here
      // handleClose(); // Call this to close the panel if desired
    } catch (error) {
      console.error("Error creating note:", error);
      // Handle errors (e.g., display error message to user)
    }
    fetchNotes();
  };
  const handleClose = () => {
    setAsideOpenStatus(
      Object.keys(asideOpenStatus).reduce((acc, key) => {
        acc[key] = false; // Set all panels to be closed (false)
        return acc;
      }, {})
    );
  };
  return (
    <div className="2xl:p-10 px-6 py-4 flex flex-col justify-center">
      <div className="px-4 py-1">
        <center>
          <h2 className=" text-3xl font-semibold mb-3">Add New Note</h2>
        </center>
        <h4 className="font-normal">Patient: </h4>
        <h2 className=" text-3xl font-medium">
          {selectedPatient.firstName} {selectedPatient.lastName}
        </h2>
        <h3 className="py-1 font-extralight">Date: {formattedDate}</h3>
      </div>
      <form onSubmit={handleNoteSubmit} className="p-4 flex flex-col space-y-4">
        <div className="flex flex-col">
          <label htmlFor="noteTitle">Note Title</label>
          <input
            type="text"
            name="noteTitle"
            placeholder="Note Title"
            className="mt-2 resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col justify-normal">
          <label htmlFor="note">Medical Note</label>
          <textarea
            name="note"
            // onChange={(event) => setNote(event.target.value)}
            placeholder="Enter your note here..."
            className="mt-2 mb-5 resize-none rounded-md p-2 border h-40 border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          />
        </div>
        <Button
          buttontype={"submit"}
          styling={
            "w-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          }
          title={"Add Note"}
        ></Button>
        <Button
          styling={"w-full bg-orange-400 hover:bg-red-600"}
          title={"Cancel"}
          handler={handleClose}
        ></Button>
      </form>
      <div className="absolute top-0 right-0 mt-4 mr-6">
        <Button
          handler={() => {
            handleOpen("sidebar");
          }}
          imgSrc={"/back.svg"}
          styling={"hover:bg-blue-300"}
        ></Button>
      </div>
    </div>
  );
}
