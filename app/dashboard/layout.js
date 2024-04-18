
import GlobalState from "../../context";
import Sidbar from "@/components/sidbar";


export default function DashboardLayout ({ children }) {
    return (
        <GlobalState>
        <div className="flex h-screen overflow-hidden bg-gray-300">
          <Sidbar />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              {children}
          </div>
        </div>
      </GlobalState>
    )

}
