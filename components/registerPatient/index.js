import Button from "@/components/button";
import { GlobalContext } from "@/context";
import { useContext, useState } from "react";

export default function RegisterNewPatient() {
  const { asideOpenStatus, setAsideOpenStatus } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    DateOfBirth: "",
    phoneNum: "",
    email: "", 
    height: 0,
    weight: 0,
    BloodType: "",

  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setFormData({...formData, height:  parseInt(formData.height), weight: parseInt(formData.weight), password: formData.DateOfBirth })
    const requestBody = JSON.stringify(formData); // Prepare request body
    console.log(requestBody)
    try {
      const response = await fetch(
        "http://localhost:5000/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: requestBody,
        }
      );

      if (!response.ok) {
        // Handle errors (e.g., display an error message to the user)
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
        alert(
          "Registration failed. Please check the entered details and try again."
        ); // Or use a more user-friendly error display mechanism
        return;
      }

      console.log("Patient registration successful:", await response.json());
      // Handle successful registration (e.g., redirect to a confirmation page, display a success message)
      alert("Registration successful! You can now log in."); // Or use a more appropriate success message
    } catch (error) {
      console.error("Registration error:", error);
      alert(
        "An unexpected error occurred during registration. Please try again later."
      ); // Or use a more user-friendly error message
    }
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
                    name="firstname"
                    id="firstName"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                    className="mt-2 resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-1 mb-4 w-full">
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastName"
                    value={formData.lastname}
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
                  name="DateOfBirth"
                  id="birthDate"
                  value={formData.DateOfBirth}
                  onChange={handleChange}
                  className="mt-2 resize-none rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="phoneNumber">Phone Number (Required):</label>
                <input
                  type="tel"
                  name="phoneNum"
                  id="phoneNumber"
                  value={formData.phoneNum}
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
                  name="BloodType"
                  id="bloodType"
                  value={formData.BloodType}
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
