"use client";

import { createContext } from "react";
import { useState } from "react";
export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [SidbarOpen, setSidbarOpen] = useState(false);
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [isNoteFormOpen, setIsNoteFormOpen] = useState(false);
  const [isModifyProfileOpen, setIsModifyProfileOpen] = useState(false);

  const [selectedPatient, setSelectedPatient] = useState({});
  return (
    <GlobalContext.Provider
      value={{
        SidbarOpen,
        setSidbarOpen,
        isAsideOpen,
        setIsAsideOpen,
        isNoteFormOpen,
        setIsNoteFormOpen,
        setSelectedPatient,
        selectedPatient,
        isModifyProfileOpen,
        setIsModifyProfileOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
