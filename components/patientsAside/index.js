import Button from "@/components/button";
import { GlobalContext } from "@/context";
import { useContext, useEffect } from "react";
import ChartLine from "@/components/chartLine";
import ProfileCard from "@/components/profileCard";
import ProfileNotes from "@/components/profileNotes";

export default function () {
  const { selectedPatient } = useContext(GlobalContext);
  const { asideOpenStatus, setAsideOpenStatus } = useContext(GlobalContext);
  useEffect(() => {
    const fetchNotes = async () => {
      const patientId = selectedPatient.id; // Assuming 'selectedPatient' has an 'id' property
      console.log(patientId)
      try {
        const response = await fetch(
          `http://localhost:5000/user/patients/:${patientId}/notes`,
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
        console.log("ya jamal a3tini el data");
        const data = await response.json();
        console.log(data);
        setNotes(data);
      } catch (err) {
        console.log(err);
      }
    };
    console.log("el data ya si mouhammed");
    fetchNotes();
  }, []);
  const handleClose = () => {
    setAsideOpenStatus(
      Object.keys(asideOpenStatus).reduce((acc, key) => {
        acc[key] = false; // Set all panels to be closed (false)
        return acc;
      }, {})
    );
  };
  const handleOpen = (panel) => {
    setAsideOpenStatus(
      Object.keys(asideOpenStatus).reduce((acc, key) => {
        acc[key] = key === panel;
        return acc;
      }, {})
    );
  };
  // Sample data representing BPM values at specific times
  const data = [
    { time: "00:00", bpm: 60 },
    { time: "01:00", bpm: 62 },
    { time: "02:00", bpm: 65 },
    { time: "03:00", bpm: 70 },
    { time: "04:00", bpm: 68 },
    { time: "05:00", bpm: 52 },
    { time: "06:00", bpm: 86 },
    { time: "07:00", bpm: 80 },
    { time: "08:00", bpm: 96 },
    { time: "09:00", bpm: 92 },
    { time: "10:00", bpm: 64 },
    { time: "11:00", bpm: 58 },
    { time: "12:00", bpm: 80 },
    { time: "13:00", bpm: 69 },
    { time: "14:00", bpm: 64 },
    { time: "15:00", bpm: 64 },
    { time: "16:00", bpm: 67 },
    { time: "17:00", bpm: 83 },
    { time: "18:00", bpm: 78 },
    { time: "19:00", bpm: 62 },
    { time: "20:00", bpm: 62 },
    { time: "21:00", bpm: 64 },
    { time: "22:00", bpm: 65 },
    { time: "23:00", bpm: 64 },
  ];

  return (
    <>
      <div className="flex flex-col px-6 py-4 h-[90vh] overflow-y-auto">
        <div className="flex flex-row justify-end mb-3 gap-4">
          <Button
            handler={() => {
              handleOpen("newAppointment");
            }}
            imgSrc={"/appointment.svg"}
            styling={"bg-blue-300"}
            title={"Appointment"}
          ></Button>
          <Button
            handler={() => {
              handleOpen("configurationPanel");
            }}
            imgSrc={"/configure.svg"}
            styling={"bg-blue-300"}
            title={"Configure Device"}
          ></Button>
          <Button
            handler={() => {
              handleOpen("noteForm");
            }}
            imgSrc={"/note.svg"}
            styling={"bg-blue-300"}
            title={"Add Note"}
          ></Button>

          <Button
            handler={() => {
              handleOpen("modifyProfile");
            }}
            imgSrc={"/modify.svg"}
            title={"Modify Info"}
            styling={"bg-blue-300"}
          ></Button>

          <Button
            handler={handleClose}
            imgSrc={"/close2.svg"}
            styling={"hover:bg-blue-300"}
          ></Button>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <ProfileCard />
            <div className="overflow-hidden w-full">
              <ChartLine data={data} />
            </div>
            {selectedPatient &&
            selectedPatient.notes &&
            selectedPatient.notes.length > 0 ? (
              <ProfileNotes />
            ) : (
              <p>No notes available for this patient.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
