import { GlobalContext } from "@/context";
import { useContext, useState } from "react";

export default function DashboardNotifiction({ notifications }) {
  const { patients, fetchNotifications } = useContext(GlobalContext);
  const [isUpdating, setIsUpdating] = useState(false); // Track update state

  const handleMarkAsRead = async (notificationId) => {
    setIsUpdating(true); // Set loading state to prevent multiple clicks
    const userId = JSON.parse(localStorage.getItem("user")).id; // Extract user ID);
    try {
      const response = await fetch(`http://localhost:5000/user/notification`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"), // Include authorization token
        },
        body: JSON.stringify({
          isRead: true,
          UserId: userId,
          NotfiId: notificationId,
        }), // Set isRead to true
      });

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }

      console.log("Notification marked as read successfully");
      fetchNotifications();
      // Update local state or refetch notifications if needed
    } catch (error) {
      console.error("Error marking notification as read:", error);
    } finally {
      setIsUpdating(false); // Reset loading state
    }
  };
  return (
    <>
      <div className="relative bg-slate-100 w-full h-fit overflow-hidden p-2">
        <div className="sticky border-b-2 p-2">
          <h1 className="text-gray-600 text-3xl">Notifications</h1>
        </div>
        <ul className="flex flex-col overflow-y-auto h-[85vh] px-2 py-4 gap-2">
          {notifications.map((notification, index) => (
            <button>
              <li
                key={index}
                className="flex flex-col items-start py-2 px-2 bg-blue-100 rounded-md"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={notification.isRead} // Pre-check if already read
                    onChange={() => handleMarkAsRead(notification.Notid)}
                    disabled={isUpdating} // Disable checkbox during update
                  />
                  <h3 className="text-lg font-medium text-gray-800 ml-2">
                    Patient:
                    {patients !== null &&
                      patients.length > 0 &&
                      " " +
                        patients.find(
                          (obj) => obj.id === notification.PatientAccid
                        )?.lastName +
                        " " +
                        patients.find(
                          (obj) => obj.id === notification.PatientAccid
                        )?.firstName}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 text-left">
                  {notification.context}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  time:{" "}
                  {notification.createdAt.substring(0, 10) +
                    ", " +
                    notification.createdAt.substring(11, 16)}
                </p>
              </li>
            </button>
          ))}
        </ul>
      </div>
    </>
  );
}
