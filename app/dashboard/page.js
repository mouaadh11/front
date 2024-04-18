"use client";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import Header from "@/components/header";

export default function Dashboard() {
  const { status } = useSession();
  console.log(status);

  setTimeout(() => {
    const token = Cookies.get("session");
    if (token) {
      console.log("from dashboard", token);
    } else {
      console.log("there is no token");
    }
  }, 100);

  const buttons = [
    {
      buttonTitle: "Add New Device",
      function: () => {
        router.push("/device/information");
      },
    },
    {
      buttonTitle: "Register New Patient",
      function: () => {
        router.push("/Patient/add");
      },
    },
  ];

  return (
    <>
      <Header title="Dashboard" buttons={buttons} />
      <div>
        <h1 >APP Name</h1>
      </div>
    </>
  );
}
