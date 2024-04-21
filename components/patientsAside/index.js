import Button from "@/components/button";
import { GlobalContext } from "@/context";
import { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
import { Chart } from 'chart.js';


export default function () {
  const { isAsideOpen, setIsAsideOpen } = useContext(GlobalContext);
  const { isNoteFormOpen, setIsNoteFormOpen } = useContext(GlobalContext);
  const { selectedPatient, setSelectedPatient } = useContext(GlobalContext);
  const { isModifyProfileOpen, setIsModifyProfileOpen } =
    useContext(GlobalContext);
    Chart.register(CategoryScale);

  const bpmData = [
    // Sample BPM readings throughout the day (replace with your actual data)
    80, 75, 82, 90, 85, 92, 88, 83, 78, 84, 87, 80, 79, 81, 77, 86,
  ];

  const averageBpm =
    bpmData.reduce((acc, val) => acc + val, 0) / bpmData.length;
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

  const chartData = {
    labels: ["Average BPM"],
    datasets: [
      {
        label: "BPM",
        data: [averageBpm ? averageBpm : 0],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
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
            <Bar data={chartData} options={chartOptions} />
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
