import Button from "@/components/button";
import { GlobalContext } from "@/context";
import { useContext, useState } from "react";

export default function RegisterNewPatient() {
  const { isRegisterPOpen, setIsRegisterPOpen } = useContext(GlobalContext);
  const { asideOpenStatus, setAsideOpenStatus } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    phoneNumber: "", // Required field
    email: "", // Optional field
    height: "",
    weight: "",
    bloodType: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("Form Submitted:", formData); // You can use this data to submit to an API or database
    // Implement form submission logic here
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
      <div className="flex flex-col px-6 py-4">
        <div className="flex flex-row justify-end mb-3 gap-4">
          <Button
            handler={handleClose}
            imgSrc={"/close2.svg"}
            styling={"hover:bg-blue-300"}
          ></Button>
        </div>
        <div className="px-4 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="p-4 flex flex-col space-y-4 w-4/5 mb-4"
          >
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold">Register New Patient</h2>
              <div className="flex flex-row justify-between gap-2">
                <div className="flex flex-col gap-1 mb-4 w-full">
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="mt-2 resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-1 mb-4 w-full">
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="mt-2 resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="birthDate">Birth Date:</label>
                <input
                  type="date"
                  name="birthDate"
                  id="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="mt-2 resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="phoneNumber">Phone Number (Required):</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="mt-2 resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="email">Email (Optional):</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-row justify-between gap-4 ">
                <div className="flex flex-col gap-1 mb-4 w-full">
                  <label htmlFor="height">Height (cm):</label>
                  <input
                    type="number"
                    name="height"
                    id="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="mt-2 resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-1 mb-4 w-full">
                  <label htmlFor="weight">Weight (kg):</label>
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="mt-2 resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="bloodType">Blood Type:</label>
                <select
                  name="bloodType"
                  id="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  className="mt-2 resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div className="flex flex-row justify-between">
                <Button
                  handler={handleClose}
                  title={"Cancel"}
                  styling={"bg-red-400"}
                />

                <Button buttontype={"submit"} title={"Register Patient"} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
