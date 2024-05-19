"use client";
import Cookies from "js-cookie";
import { Line } from "react-chartjs-2";
import { useRouter } from "next/navigation";
import DashboardNotifiction from "@/components/dashboardNotification";
import Appointment from "@/components/appointment";
import DashboardCards from "@/components/dashboardCards";
import {
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { useContext, useEffect } from "react";
import { GlobalContext } from "@/context";

export default function Dashboard() {
  const router = useRouter();
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Legend,
    Tooltip
  );
  const { asideOpenStatus, setAsideOpenStatus } = useContext(GlobalContext);
  const { setHeaderTitle } = useContext(GlobalContext);
  const { setSelectedDevice, setSelectedPatient, patients, notifications } =
    useContext(GlobalContext);

  const dashboardButtons = [
    {
      buttonTitle: "Add New Device",
      clickHandler: () => {
        const updatedAsideOpenStatus = Object.keys(asideOpenStatus).reduce(
          (acc, key) => {
            acc[key] = key === "configurationPanel";
            return acc;
          },
          {}
        );
        setAsideOpenStatus(updatedAsideOpenStatus);

        router.push("dashboard/devices");
      },
    },
    {
      buttonTitle: "Register New Patient",
      clickHandler: () => {
        const updatedAsideOpenStatus = Object.keys(asideOpenStatus).reduce(
          (acc, key) => {
            acc[key] = key === "registerPanel";
            return acc;
          },
          {}
        );
        setAsideOpenStatus(updatedAsideOpenStatus);
        router.push("dashboard/patients");
      },
    },
  ];
  const { setButtonsList } = useContext(GlobalContext);

  useEffect(() => {
    setButtonsList(dashboardButtons);
    setHeaderTitle("Dashboard");
    setAsideOpenStatus(
      Object.keys(asideOpenStatus).reduce((acc, key) => {
        acc[key] = false; // Set all panels to be closed (false)
        return acc;
      }, {})
    );
    setSelectedPatient({});
    setSelectedDevice({});
  }, []);
  const { appointments } = useContext(GlobalContext);
  const medicalNotifications = [
    // {
    //   title: "Appointment Reminder",
    //   content:
    //     "Your upcoming appointment with Dr. Smith is scheduled for next Monday at 10:00 AM.",
    //   patientName: "Alice Johnson",
    // },
    // {
    //   title: "Prescription Refill Request",
    //   content:
    //     "Your prescription for [Medication Name] is due for a refill. Please contact our pharmacy at [Phone Number] to request a refill.",
    //   patientName: "Alice Johnson",
    // },
    // {
    //   title: "Test Result Notification",
    //   content:
    //     "Your recent blood test results are available. Please schedule a follow-up appointment with your healthcare provider to discuss the findings.",
    //   patientName: "Alice Johnson",
    // },
    // {
    //   title: "Appointment Reminder",
    //   content:
    //     "Your upcoming appointment with Dr. Smith is scheduled for next Monday at 10:00 AM.",
    //   patientName: "Alice Johnson",
    // },
    // {
    //   title: "Prescription Refill Request",
    //   content:
    //     "Your prescription for [Medication Name] is due for a refill. Please contact our pharmacy at [Phone Number] to request a refill.",
    //   patientName: "Alice Johnson",
    // },
    // {
    //   title: "Test Result Notification",
    //   content:
    //     "Your recent blood test results are available. Please schedule a follow-up appointment with your healthcare provider to discuss the findings.",
    //   patientName: "Alice Johnson",
    // },
    // {
    //   title: "Appointment Reminder",
    //   content:
    //     "Your upcoming appointment with Dr. Smith is scheduled for next Monday at 10:00 AM.",
    //   patientName: "Alice Johnson",
    // },
    // {
    //   title: "Prescription Refill Request",
    //   content:
    //     "Your prescription for [Medication Name] is due for a refill. Please contact our pharmacy at [Phone Number] to request a refill.",
    //   patientName: "Alice Johnson",
    // },
    // {
    //   title: "Test Result Notification",
    //   content:
    //     "Your recent blood test results are available. Please schedule a follow-up appointment with your healthcare provider to discuss the findings.",
    //   patientName: "Alice Johnson",
    // },
    // {
    //   title: "Appointment Reminder",
    //   content:
    //     "Your upcoming appointment with Dr. Smith is scheduled for next Monday at 10:00 AM.",
    //   patientName: "Alice Johnson",
    // },
    {
      title: "xxxxx",
      content: "xxxxxxxxxxxxxxxxxxxxxxxx",
      patientName: "8:94 AM",
    },
    {
      title: "xxxxx",
      content: "xxxxxxxxxxxxxxxxxxxxxxxxx",
      patientName: "10:94 AM",
    },
  ];
  setTimeout(() => {
    const token = Cookies.get("session");
    if (token) {
      console.log("from dashboard", token);
    } else {
      console.log("there is no token");
    }
  }, 100);

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Patients",
        data: [120, 140, 160, 180, 200, 190, 210, 220, 230, 240, 230, 250],
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Active Devices",
        data: [30, 35, 40, 38, 42, 41, 45, 48, 50, 47, 52, 50],
        borderColor: "orange",
        fill: false,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom", // Adjust position as needed (e.g., 'top', 'right')
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
        },
      },
    },
  };

  return (
    <>
      <div className="flex flex-col h-fit w-full justify-between overflow-hidden bg-blue-100">
        <div className="w-full  justify-between flex flex-col my-auto">
          <DashboardCards />
          {/* <div className="bg-white h-fit flex flex-col justify-center items-center m-2 p-2 rounded-md">
            <h2 className="text-gray-600 font-bold mb-10">
              Patient and Active Device Trends
            </h2>
            <Line data={data} options={options} />
          </div> */}
        </div>
        <div className="w-full flex flex-row ">
          {console.log("notification", notifications)}
          {notifications !== null && patients !== null && (
            <DashboardNotifiction notifications={notifications} />
          )}
          {console.log("appointment", appointments)}
          {appointments !== null && patients !== null && (
            <Appointment appointments={appointments} />
          )}
        </div>
      </div>
    </>
  );
}
