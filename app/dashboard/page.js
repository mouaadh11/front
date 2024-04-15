'use client';
import { useSession } from "next-auth/react";
export default function Dashboard() {
  const {status} = useSession();
console.log(status);
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }