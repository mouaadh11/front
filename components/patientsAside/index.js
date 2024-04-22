import Button from "@/components/button";
import { GlobalContext } from "@/context";
import { useContext } from "react";
import { Line } from "react-chartjs-2";
import { PointElement } from 'chart.js';
import { Chart, LinearScale, CategoryScale, LineElement } from 'chart.js';


export default function () {
  const { isAsideOpen, setIsAsideOpen } = useContext(GlobalContext);
  const { isNoteFormOpen, setIsNoteFormOpen } = useContext(GlobalContext);
  const { selectedPatient, setSelectedPatient } = useContext(GlobalContext);
  const { isModifyProfileOpen, setIsModifyProfileOpen } =
  useContext(GlobalContext);
  
  const openNoteForm = () => {
    setIsAsideOpen(false);
    setIsNoteFormOpen(true);
    setIsModifyProfileOpen(false);
  };
  const OpenModifyProfile = () => {
    setIsAsideOpen(false);
    setIsNoteFormOpen(false);
    setIsModifyProfileOpen(true);
  };
    Chart.register(LinearScale);
    Chart.register(PointElement, CategoryScale, LineElement);
  

  // Sample data representing BPM values at specific times
  const data = [
    { time: '00:00', bpm: 60 },
    { time: '01:00', bpm: 62 },
    { time: '06:00', bpm: 65 },
    { time: '12:00', bpm: 70 },
    { time: '18:00', bpm: 68 },
    { time: '23:00', bpm: 64 }
  ];

  // Function to interpolate BPM value between two data points
  function interpolateBPM(startTime, startBPM, endTime, endBPM, currentTime) {
    const startTimeMinutes = convertTimeToMinutes(startTime);
    const endTimeMinutes = convertTimeToMinutes(endTime);
    const currentTimeMinutes = convertTimeToMinutes(currentTime);

    const percent = (currentTimeMinutes - startTimeMinutes) / (endTimeMinutes - startTimeMinutes);
    const interpolatedBPM = startBPM + percent * (endBPM - startBPM);
    return interpolatedBPM;
  }

  // Function to convert time string to total minutes since midnight
  function convertTimeToMinutes(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // Function to generate 24-hour BPM records for Chart.js testing
  function generate24hBPMRecords(data) {
    const records = [];
    const hoursInDay = 24;

    for (let i = 0; i < hoursInDay; i++) {
      const currentTime = `${String(i).padStart(2, '0')}:00`; // Format time as "HH:00"
      let bpmValue = null;

      // Find the relevant data points (previous and next) for interpolation
      for (let j = 0; j < data.length - 1; j++) {
        const currentData = data[j];
        const nextData = data[j + 1];

        if (currentTime >= currentData.time && currentTime < nextData.time) {
          // Interpolate BPM value between currentData and nextData
          bpmValue = interpolateBPM(
            currentData.time,
            currentData.bpm,
            nextData.time,
            nextData.bpm,
            currentTime
          );
          break;
        }
      }

      if (bpmValue === null) {
        // If no interpolation was performed, use the last known BPM value
        bpmValue = data[data.length - 1].bpm;
      }

      records.push({ time: currentTime, bpm: bpmValue });
    }

    return records;
  }

  // Generate 24-hour BPM records for Chart.js testing
  const generatedRecords = generate24hBPMRecords(data);
  console.log(generatedRecords);

  const chartData = {
    labels: data.map((item) => item.time),
    datasets: [
      {
        label: 'BPM',
        data: generatedRecords.map((item) => item.bpm),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-row justify-end mb-3">
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
          <div className="mr-4">
            <Button
              handler={() => {
                OpenModifyProfile();
              }}
              imgSrc={"/modify.svg"}
              title={"Modify Info"}
              styling={"bg-blue-300"}
            ></Button>
          </div>
          <Button
            handler={() => {
              setIsAsideOpen(false);
            }}
            imgSrc={"/close2.svg"}
            styling={"hover:bg-blue-300"}
          ></Button>
        </div>
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center  mb-4">
                <h2 className="text-xl font-bold">
                  {selectedPatient.firstName} {selectedPatient.lastName}
                </h2>
                {selectedPatient.hasDevice ? (
                  <div className="rounded-xl bg-green-300 w-3 h-3 ml-4"></div>
                ) : (
                  <div className="rounded-xl bg-red-300 w-3 h-3 ml-4"></div>
                )}
              </div>
              <p>
                <span className="font-medium">Last Update:</span>{" "}
                {selectedPatient.lastUpdateDate}
              </p>
            </div>
            <ul className="list-none space-y-2 mb-4 text-gray-700">
              <div className="flex flex-row gap-2">
                <li className="px-2 py-1 bg-blue-100 rounded-3xl">
                  <span className="font-medium">Patient ID:</span>{" "}
                  {selectedPatient.patientId}
                </li>
                {selectedPatient.hasDevice && (
                  <li className="px-2 py-1 bg-blue-100 rounded-3xl">
                    <span className="font-medium">Device ID:</span>{" "}
                    {selectedPatient.deviceId}
                  </li>
                )}
              </div>
              <div className="flex flex-row gap-6 ">
                <div className="flex flex-row w-fit bg-blue-50 rounded-md p-2 gap-5">
                  <div>
                    <li>
                      <span className="font-medium">Age:</span>{" "}
                      {selectedPatient.age}
                    </li>

                    <li>
                      <span className="font-medium">First Visit:</span>{" "}
                      {selectedPatient.firstVisitDate}
                    </li>
                  </div>
                  <div>
                    <li>
                      <span className="font-medium">Height:</span>{" "}
                      {selectedPatient.height} cm
                    </li>
                    <li>
                      <span className="font-medium">Weight:</span>{" "}
                      {selectedPatient.weight} kg
                    </li>
                  </div>
                </div>
                <div className="flex flex-row items-center w-fit bg-orange-100 rounded-md p-2 gap-5">
                  <h2 className="">Heart Beat</h2>
                  <p>86</p>
                  <h3>BPM</h3>
                </div>
              </div>
            </ul>
            <hr />
          </div>
          <div className="h-full">
            <div className='header'>
              <h1 className='title'>Bar Chart</h1>
            </div>
            <Line data={chartData} options={options} />
          </div>
          {selectedPatient &&
            selectedPatient.notes &&
            selectedPatient.notes.length > 0 ? (
            <div>
              <hr />
              <div className="mt-4 px-4 py-2 bg-blue-50 rounded-md">
                <h3 className="text-base font-medium mb-1 ml-2">Notes</h3>
                <hr />
                <ul className="mt-4">
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
            </div>
          ) : (
            <p>No notes available for this patient.</p>
          )}
        </div>
      </div>
    </>
  );
}
