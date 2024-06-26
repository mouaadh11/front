"use client";
import { useEffect, useState } from "react";
import DataTableAction from "./DataTableAction";

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user object from local storage
        const user = localStorage.getItem("user");
        if (!user) {
          console.error("User not found in local storage");
          return;
        }

        // Parse user object and get userId
        const parsedUser = JSON.parse(user);
        const userId = parsedUser.id;

        // Fetch data with userId in the URL
        const response = await fetch(
          `http://localhost:5000/user/patient`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ UserId: userId }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = ("0" + (dateObject.getMonth() + 1)).slice(-2); // Adding 1 to month because it is zero-based
    const day = ("0" + dateObject.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="overflow-x-auto mt-5">
      <table className="min-w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="py-2 px-4">First Name</th>
            <th className="py-2 px-4">Last Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Phone Number</th>
            <th className="py-2 px-4">Created At</th>
            <th className="py-2 px-4">Updated At</th>
            <th className="py-2 px-4">Birthdate</th>
            <th className="py-2 px-4">Weight</th>
            <th className="py-2 px-4">Height</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-gray-200 text-gray-700">
          {data?.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-2 px-4">{item.firstName}</td>
              <td className="py-2 px-4">{item.lastName}</td>
              <td className="py-2 px-4">{item.email}</td>
              <td className="py-2 px-4">{item.phoneNum}</td>
              <td className="py-2 px-4">{formatDate(item.createdAt)}</td>
              <td className="py-2 px-4">{formatDate(item.updatedAt)}</td>
              <td className="py-2 px-4">{formatDate(item.birthdate)}</td>
              <td className="py-2 px-4">{item.weight}</td>
              <td className="py-2 px-4">{item.height}</td>
              <td className="">
                <DataTableAction itemId={item.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
