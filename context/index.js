"use client";

import { createContext } from "react";
import { useState } from "react";
export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
    const [SidbarOpen, setSidbarOpen] = useState(false);   
    return <GlobalContext.Provider value={{SidbarOpen, setSidbarOpen}}>{children}</GlobalContext.Provider>;
}