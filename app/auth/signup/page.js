"use client";
import Link from "next/link";
import style from "./login.module.css";
import {
  MdAlternateEmail,
  MdCall,
  MdOutlinePassword,
  MdDateRange,
} from "react-icons/md";
import { FaUserMd } from "react-icons/fa";
import React, { useState } from "react";
const SignUp = () => {
  const [show, setShow] = useState({
    password: false,
    confirm_password: false,
  });
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(event.target); // Get form data

    const data = {
      firstname: formData.get("FirstName"),
      lastname: formData.get("LastName"),
      phoneNum: formData.get("tel"),
      DateOfBirth: new Date(formData.get("BirthDate")),
      email: formData.get("email"),
      password: formData.get("password"),
      // confirmPassword: formData.get("confirm_password"),
    };
    console.log(data);
    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.log(response.text);
        throw new Error("Failed to sign up");
      }

      // Handle successful signup (e.g., display success message, redirect)
      console.log("Signup successful!");
    } catch (error) {
      console.error("Signup error:", error);
      // Handle signup error (e.g., display error message)
    }
  };

  return (
    <>
      <section className="w-3/4 h-full mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
          <p className="w-3/4 mx-auto text-gray-400">Sign up to get started</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-row gap-2">
            <div className={style.input_group}>
              <input
                type="text"
                name="FirstName"
                placeholder="First Name"
                className={style.input_text}
              ></input>
              <span className="icon flex items-center px-4">
                <FaUserMd size={20} />
              </span>
            </div>
            <div className={style.input_group}>
              <input
                type="text"
                name="LastName"
                placeholder="Last Name"
                className={style.input_text}
              ></input>
              <span className="icon flex items-center px-4">
                <FaUserMd size={20} />
              </span>
            </div>
          </div>

          <div className={style.input_group}>
            <input
              type="tel"
              name="tel"
              placeholder="phone number"
              className={style.input_text}
            ></input>
            <span className="icon flex items-center px-4">
              <MdCall size={20} />
            </span>
          </div>

          <div className={style.input_group}>
            <input
              type="date"
              name="BirthDate"
              placeholder="Birth Date"
              className={style.input_text}
            ></input>
            <span className="icon flex items-center px-4">
              <MdDateRange size={20} className="-z-0" />
            </span>
          </div>

          <div className={style.input_group}>
            <input
              type="email"
              name="email"
              placeholder="email"
              className={style.input_text}
            ></input>
            <span className="icon flex items-center px-4">
              <MdAlternateEmail size={20} />
            </span>
          </div>

          <div className={style.input_group}>
            <input
              type={show.password ? "text" : "password"}
              name="password"
              placeholder="Password"
              className={style.input_text}
            />
            <span
              className={`${style.icon} flex items-center px-4`}
              onClick={() => setShow({ ...show, password: !show.password })}
            >
              <MdOutlinePassword
                size={20}
                className={
                  show.password
                    ? style.password_icon
                    : style.password_icon_hover
                }
              />
            </span>
          </div>

          <div className={style.input_group}>
            <input
              type={show.confirm_password ? "text" : "password"}
              name="confirm_password"
              placeholder="Confirm Password"
              className={style.input_text}
            />
            <span
              className={`${style.icon} flex items-center px-4`}
              onClick={() =>
                setShow({ ...show, confirm_password: !show.confirm_password })
              }
            >
              <MdOutlinePassword
                size={20}
                className={
                  show.confirm_password
                    ? style.password_icon
                    : style.password_icon_hover
                }
              />
            </span>
          </div>

          <div className="input-button">
            <button className={style.button} type="submit">
              SignUp
            </button>
          </div>
        </form>

        <p className="text-center text-gray-400">
          Have an account yet?{" "}
          <Link href={"/auth/login"}>
            <span className="text-[#fb7c32]">Login</span>
          </Link>
        </p>
      </section>
    </>
  );
};

export default SignUp;
