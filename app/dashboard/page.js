"use client";
import Cookies from "js-cookie";
import { Line } from "react-chartjs-2";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import DashboardNotifiction from "@/components/dashboardNotification";
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
  const { headerTitle, setHeaderTitle } = useContext(GlobalContext);

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
  const { buttonsList, setButtonsList } = useContext(GlobalContext);
  useEffect(() => {
    setButtonsList(dashboardButtons);
    setHeaderTitle("Dashboard");
  }, [asideOpenStatus["registerPanel"]]);

  const medicalNotifications = [
    {
      title: "Appointment Reminder",
      content:
        "Your upcoming appointment with Dr. Smith is scheduled for next Monday at 10:00 AM.",
      patientName: "Alice Johnson",
    },
    {
      title: "Prescription Refill Request",
      content:
        "Your prescription for [Medication Name] is due for a refill. Please contact our pharmacy at [Phone Number] to request a refill.",
      patientName: "Alice Johnson",
    },
    {
      title: "Test Result Notification",
      content:
        "Your recent blood test results are available. Please schedule a follow-up appointment with your healthcare provider to discuss the findings.",
      patientName: "Alice Johnson",
    },
    {
      title: "Appointment Reminder",
      content:
        "Your upcoming appointment with Dr. Smith is scheduled for next Monday at 10:00 AM.",
      patientName: "Alice Johnson",
    },
    {
      title: "Prescription Refill Request",
      content:
        "Your prescription for [Medication Name] is due for a refill. Please contact our pharmacy at [Phone Number] to request a refill.",
      patientName: "Alice Johnson",
    },
    {
      title: "Test Result Notification",
      content:
        "Your recent blood test results are available. Please schedule a follow-up appointment with your healthcare provider to discuss the findings.",
      patientName: "Alice Johnson",
    },
    {
      title: "Appointment Reminder",
      content:
        "Your upcoming appointment with Dr. Smith is scheduled for next Monday at 10:00 AM.",
      patientName: "Alice Johnson",
    },
    {
      title: "Prescription Refill Request",
      content:
        "Your prescription for [Medication Name] is due for a refill. Please contact our pharmacy at [Phone Number] to request a refill.",
      patientName: "Alice Johnson",
    },
    {
      title: "Test Result Notification",
      content:
        "Your recent blood test results are available. Please schedule a follow-up appointment with your healthcare provider to discuss the findings.",
      patientName: "Alice Johnson",
    },
    {
      title: "Appointment Reminder",
      content:
        "Your upcoming appointment with Dr. Smith is scheduled for next Monday at 10:00 AM.",
      patientName: "Alice Johnson",
    },
    {
      title: "Prescription Refill Request",
      content:
        "Your prescription for [Medication Name] is due for a refill. Please contact our pharmacy at [Phone Number] to request a refill.",
      patientName: "Alice Johnson",
    },
    {
      title: "Test Result Notification",
      content:
        "Your recent blood test results are available. Please schedule a follow-up appointment with your healthcare provider to discuss the findings.",
      patientName: "Alice Johnson",
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
      <div className="flex flex-row justify-between w-full h-fit  overflow-hidden bg-blue-100">
        <div className=" w-full h-fit flex flex-col my-auto justify-around gap-10">
          <DashboardCards />
          <div className="bg-white h-fit flex flex-col justify-center items-center m-2 p-2 rounded-md">
            <h2 className="text-gray-600 font-bold mb-10">
              Patient and Active Device Trends
            </h2>
            <Line data={data} options={options} />
          </div>
        </div>
        <DashboardNotifiction notifications={medicalNotifications} />
      </div>
    </>
  );
}
