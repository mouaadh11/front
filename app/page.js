"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
    <div className="flex justify-center items-center w-full h-full">
      <h1>Laoding .............</h1>
      {router.push("/auth/login")}
    </div>
    </>
  );
}
