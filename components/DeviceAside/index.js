import { useContext } from "react";
import { GlobalContext } from "@/context";
import Button from "@/components/button";

export default function () {
  const { isDeviceAsideOpen, setIsDeviceAsideOpen } = useContext(GlobalContext);
  const { selectedDevice, setSelectedDevice } = useContext(GlobalContext);
  const OpenConfigureAside = () => {
    setIsDeviceAsideOpen(true);
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-end mb-3 gap-3">
          <Button
            handler={() => {
              OpenConfigureAside;
            }}
            imgSrc={"/configure.svg"}
            styling={"bg-blue-300"}
            title={"Configure Device"}
          ></Button>

          <Button
            handler={() => {
              setIsDeviceAsideOpen(false);
            }}
            imgSrc={"/close2.svg"}
            styling={"hover:bg-blue-300"}
          ></Button>
        </div>
        <div>{selectedDevice.deviceId}</div>
      </div>
    </>
  );
}
