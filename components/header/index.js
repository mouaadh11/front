"use client";
import { useContext } from "react";
import { GlobalContext } from "../../context";
import { useRouter } from "next/navigation";
export default function Header() {
  const { SidbarOpen, setSidbarOpen } = useContext(GlobalContext);
  const router = useRouter();
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1">
      <div className="flex flex-grow items-center gap-2 justify-end py-4 px-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button className="inline-flex items-center justify-center bg-black px-6 py-2 text-lg text-white font-medium tracking-wide uppercase">
            {SidbarOpen ? "hide Sidbar" : "show Sidbar"}
          </button>
        </div>
        <button onClick={()=>{router.push('/auth/login')}} className="inline-flex items-center justify-center bg-black px-6 py-2 text-lg text-white font-medium tracking-wide uppercase">
          Login
        </button>
      </div>
    </header>
  );
}
