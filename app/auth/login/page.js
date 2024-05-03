"use client";
import Link from "next/link";
import React, { useState } from "react";
import style from "./login.module.css";
import { MdCall, MdOutlinePassword } from "react-icons/md";
import { useRouter } from "next/navigation";

const Login = () => {
  const [show, setShow] = useState(false);
  const router = useRouter(); // Get router instance

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = event.target.tel.value;
    const password = event.target.password.value;

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      console.log("Login successful");
      router.push("/dashboard"); // Redirect using Next.js router
    } else {
      console.log(response.status);
      console.error("Invalid login credentials"); // Replace with appropriate error handling
    }
  };

  return (
    <>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
          <p className="w-3/4 mx-auto text-gray-400">Sign up to get started</p>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          <div className={style.input_group}>
            <input
              type="tel"
              name="tel"
              placeholder="Phone number"
              className={style.input_text}
            ></input>
            <span className="icon flex items-center px-4">
              <MdCall size={20} />
            </span>
          </div>
          <div className={style.input_group}>
            <input
              type={`${show ? "text" : "password"}`}
              name="password"
              placeholder="password"
              className={style.input_text}
            ></input>
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow(!show)}
            >
              <MdOutlinePassword size={20} />
            </span>
          </div>
          <div className="input-button ">
            <button className={style.button} type="submit">
              login
            </button>
          </div>
        </form>

        <p className="text-center text-gray-400">
          Don't have an account yet?{" "}
          <Link href={"/auth/signup"}>
            <span className="text-[#fb7c32]">SignUp</span>
          </Link>
        </p>
      </section>
    </>
  );
};

export default Login;
