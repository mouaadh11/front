export default function DashboardNotifiction({ notifications }) {
  return (
    <>
      <div className="relative bg-slate-100 w-1/2 h-fit overflow-hidden p-2">
        <div className="sticky border-b-2 p-2">
          <h1 className="text-gray-600 text-3xl">Notifications</h1>
        </div>
        <ul className="flex flex-col overflow-y-scroll h-[85vh] px-2 py-4 gap-2">
          {notifications.map((notification, index) => (
            <button>
              <li
                key={index}
                className="flex flex-col items-start py-2 px-2 bg-blue-100 rounded-md"
              >
                <h3 className="text-lg font-medium text-gray-800">
                  {notification.title}
                </h3>
                <p className="text-sm text-gray-600 text-left">
                  {notification.content}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Patient: {notification.patientName}
                </p>
              </li>
            </button>
          ))}
        </ul>
      </div>
    </>
  );
}
