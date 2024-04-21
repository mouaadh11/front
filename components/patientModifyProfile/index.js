import Button from "../button";
import { GlobalContext } from "@/context";
import { useContext, useState, useEffect } from "react";
export default function ({ formattedDate }) {
  const { isAsideOpen, setIsAsideOpen } = useContext(GlobalContext);
  const { isNoteFormOpen, setIsNoteFormOpen } = useContext(GlobalContext);
  const { selectedPatient, setSelectedPatient } = useContext(GlobalContext);
  const { isModifyProfileOpen, setIsModifyProfileOpen } =
    useContext(GlobalContext);

  const [formData, setFormData] = useState(selectedPatient);
  useEffect(() => {
    setFormData(selectedPatient); // Update form data after initial render
  }, [selectedPatient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return (
    <>
      <div className="2xl:p-10  flex flex-col justify-center">
        <div className="px-4 py-1">
          <center><h2 className=" text-3xl font-semibold mb-3">Modify Patient Informations</h2></center>
          <h4 className="font-normal">Patient ID: </h4>
          <h2 className=" text-3xl font-medium">
            {selectedPatient.patientId}
          </h2>
          <h3 className="py-1 font-extralight">Date: {formattedDate}</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-4 flex flex-col space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full mt-2 resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full mt-2 resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Birth Date
            </label>
            <input
              type="date"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className=" mt-2 resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Height (cm)
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className=" mt-2 resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Weight (kg)
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className=" mt-2 resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-1/4 flex flex-col  mb-4">
            <Button
              buttontype={"submit"}
              title={"Save Changes"}
              styling={
                "w-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              }
            />

            <Button
              handler={() => {
                setIsAsideOpen(false);
                setIsModifyProfileOpen(false);
                setIsNoteFormOpen(false);
              }}
              styling={"w-full px-5 mt-3 bg-orange-400 hover:bg-red-600"}
              title={"Cancel"}
            />
          </div>
        </form>
        <div className="absolute top-0 right-0 mt-4 mr-6">
          <Button
            handler={() => {
              setIsModifyProfileOpen(false);
              setIsAsideOpen(true);
            }}
            imgSrc={"/back.svg"}
            styling={"hover:bg-blue-300"}
          ></Button>
        </div>
      </div>
    </>
  );
}
