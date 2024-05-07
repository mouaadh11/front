import Button from "../button";
import { GlobalContext } from "@/context";
import { useContext, useState, useEffect } from "react";
export default function ({ formattedDate }) {
  const { selectedPatient, fetchPatients } = useContext(GlobalContext);
  const { asideOpenStatus, setAsideOpenStatus } = useContext(GlobalContext);

  const [formData, setFormData] = useState(selectedPatient);
  // Destructure selectedPatient to exclude the 'id' (assuming it's patientId)
  useEffect(() => {
    const { id, hasDevice, ...data } = selectedPatient;

    setFormData(data);
  }, [selectedPatient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit(formData);
  // };
  const handleClose = () => {
    setAsideOpenStatus(
      Object.keys(asideOpenStatus).reduce((acc, key) => {
        acc[key] = false; // Set all panels to be closed (false)
        return acc;
      }, {})
    );
  };
  const handleOpen = (panel) => {
    setAsideOpenStatus(
      Object.keys(asideOpenStatus).reduce((acc, key) => {
        acc[key] = key === panel;
        return acc;
      }, {})
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const patientId = selectedPatient.id; // Assuming patientId is available
      console.log("updated id", patientId);
      const response = await fetch(
        `http://localhost:5000/user/patients/${patientId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error updating patient data: ${response.statusText}`);
      }

      const updatedPatientData = await response.json(); // Parse the response as JSON
      console.log("Patient data updated successfully:", updatedPatientData);
      // Handle successful update (e.g., display a success message, close the form)
      alert("Patient data updated successfully");
    } catch (error) {
      console.error("Error updating patient data:", error);
      // Handle errors appropriately (e.g., display an error message to the user)
    }
    fetchPatients();
  };
  return (
    <>
      <div className="2xl:p-10 px-6 py-4 flex flex-col justify-center">
        <div className="px-4 py-1">
          <center>
            <h2 className=" text-3xl font-semibold mb-3">
              Modify Patient Informations
            </h2>
          </center>
          <h4 className="font-normal">Patient ID: </h4>
          <h2 className=" text-3xl font-medium">{selectedPatient.patientId}</h2>
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
              value={formData.DateofBirth}
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
              handler={handleClose}
              styling={"w-full px-5 mt-3 bg-orange-400 hover:bg-red-600"}
              title={"Cancel"}
            />
          </div>
        </form>
        <div className="absolute top-0 right-0 mt-4 mr-6">
          <Button
            handler={() => {
              handleOpen("sidebar");
            }}
            imgSrc={"/back.svg"}
            styling={"hover:bg-blue-300"}
          ></Button>
        </div>
      </div>
    </>
  );
}
