import  Button from "@/components/button"
import { GlobalContext } from "@/context";
import { useContext } from "react";
export default function ({ children, hiddenElement} ) {
   const {isAsideOpen, setIsAsideOpen} = useContext(GlobalContext);
   const {isNoteFormOpen, setIsNoteFormOpen} = useContext(GlobalContext);
  return (
    <div
      className={`relative w-full h-full  px-6 py-4 bg-white text-black ${
        ! hiddenElement ? "hidden" : ""
      }`}
    >
      {children}
    </div>
  );
}
