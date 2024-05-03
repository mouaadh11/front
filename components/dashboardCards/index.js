export default function DashboardCards() {
  return (
    <>
      <div className="flex flex-col">
        <div className=" flex flex-row justify-center items-center gap-6 py-2 px-6">
          <div className="bg-white rounded-lg shadow-md p-4 w-full">
            <h3 className="text-lg font-semibold text-gray-800">
              Total Patients
            </h3>
            <p className="text-3xl font-bold text-blue-300">158</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 w-full">
            <h3 className="text-lg font-semibold text-gray-800">
              Active Medical Devices
            </h3>
            <p className="text-3xl font-bold text-orange-300">25</p>
          </div>
        </div>
        <div className=" flex flex-row justify-center items-center gap-6 py-2 px-6">
          <div className="bg-white rounded-lg shadow-md p-4 w-full">
            <h3 className="text-lg font-semibold text-gray-800">
              Today Appointment
            </h3>
            <p className="text-3xl font-bold text-orange-500">23</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 w-full">
            <h3 className="text-lg font-semibold text-gray-800">
              Active Medical Devices
            </h3>
            <p className="text-3xl font-bold text-blue-500">25</p>
          </div>
        </div>
      </div>
    </>
  );
}
