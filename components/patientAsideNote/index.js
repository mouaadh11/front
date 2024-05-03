import Button from "../button";
import { GlobalContext } from "@/context";
import { useContext } from "react";
export default function ({ selectedPatient, formattedDate, handleNoteSubmit }) {
  const { asideOpenStatus, setAsideOpenStatus } = useContext(GlobalContext);
  const handleOpen = (panel) => {
    setAsideOpenStatus(
      Object.keys(asideOpenStatus).reduce((acc, key) => {
        acc[key] = key === panel;
        return acc;
      }, {})
    );
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
