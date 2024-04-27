import { useContext } from "react";
import { GlobalContext } from "@/context";
import Button from "@/components/button";
import DeviceCard from "@/components/deviceCard";
export default function () {
  const { asideOpenStatus, setAsideOpenStatus } = useContext(GlobalContext);
  const OpenConfigureAside = () => {
    setAsideOpenStatus(
      Object.keys(asideOpenStatus).reduce((acc, key) => {
        acc[key] = key === "configurationPanel";
        return acc;
      }, {})
    );
  };
  const handleClose = () => {
    setAsideOpenStatus(
      Object.keys(asideOpenStatus).reduce((acc, key) => {
        acc[key] = false; // Set all panels to be closed (false)
        return acc;
      }, {})
    );
  };
  return (
    <>
      <div className="flex flex-col w-full px-6 py-4">
        <div className="flex flex-row justify-end mb-3 gap-3">
          <Button
            handler={OpenConfigureAside}
            imgSrc={"/configure.svg"}
            styling={"bg-blue-300"}
            title={"Configure Device"}
          ></Button>

          <Button
            handler={handleClose}
            imgSrc={"/close2.svg"}
            styling={"hover:bg-blue-300"}
          ></Button>
        </div>
        <div className="flex flex-col h-fit justify-between">
          <DeviceCard />
        </div>
      </div>
    </>
  );
}
