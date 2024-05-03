export default function Appointment({ Appointments }) {
    return (
      <>
        <div className="relative bg-slate-100 w-full h-fit overflow-hidden p-2 border-l-2 border-grey-400">
          <div className="sticky border-b-2 p-2">
            <h1 className="text-gray-600 text-3xl">Today Appointment</h1>
          </div>
          <ul className="flex flex-col overflow-y-auto h-[85vh] px-2 py-4 gap-2">
            {Appointments.map((Appointment, index) => (
              <button>
                <li
                  key={index}
                  className="flex flex-col items-start py-2 px-2 bg-blue-100 rounded-md"
                >
                  <h3 className="text-lg font-medium text-gray-800">
                   Patinet: {Appointment.patient}
                  </h3>
                  <p className="text-sm text-gray-600 text-left">
                    {Appointment.content}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    hour: {Appointment.hour}
                  </p>
                </li>
              </button>
            ))}
          </ul>
        </div>
      </>
    );
  }
  