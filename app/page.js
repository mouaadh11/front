"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  return <>
  <h1>home</h1>
  {router.push("/auth/login")}
  </>;
}
