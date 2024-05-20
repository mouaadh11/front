"use client";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbBrandProducthunt } from "react-icons/tb";
import { PiUsersFourLight } from "react-icons/pi";
import { useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GlobalContext } from "../../context";
import Link from "next/link";
const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <LuLayoutDashboard size={25} />,
  },
  {
    id: "devices",
    label: "Devices",
    path: "/devices",
    icon: <TbBrandProducthunt size={25} />,
  },
  {
    id: "patients",
    label: "Patients",
    path: "/patients",
    icon: <PiUsersFourLight size={25} />,
  },
];
export default function Sidbar() {
  const { SidbarOpen, setSidbarOpen } = useContext(GlobalContext);
  const pathname = usePathname();
  const router = useRouter();
  const handlenavigate = (menuItem) => {
    router.push("/dashboard" + menuItem.path);
  };
  return (
    <aside
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-[#74b2eb] duration-300 ease-linear xl:static xl:translate-x-0 shadow-sm
        ${SidbarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {console.log(SidbarOpen)}
      <div className="flex items-center justify-between gap-2 p-4 px-6 lg:py-6.5">
        <Link href="/" className="text-[40px] text-[#e5f1fb]">
          Med Sync
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5 ">
              {menuItems.map((item) => (
                <li key={item.id} onClick={() => handlenavigate(item)}>
                  <label
                    className={`group relative cursor-pointer w-full flex items-center gap-2.5 rounded-sm py-2 px-4 font-semibold duration-300 ease-in-out hover:bg-[#62a9eb] hover:text-[#fb7c32] ${
                      pathname.endsWith(item.id)
                        ? "bg-[#62a9eb] text-orange-300"
                        : "" 
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
}
