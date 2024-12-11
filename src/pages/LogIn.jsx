import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        // this is body
        {
          username,
          password,
        },
        // this for headers
        { withCredentials: true }
      );
      setMessage("Login successful");
      console.log(message);
      console.log(response.data.user);

      // You can handle successful login logic here (e.g., redirect, save token)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 ">
        <form
          className="bg-white px-6 py-8 rounded-xl shadow-md text-black w-full flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <h1 className="mb-4 text-3xl text-center">Login</h1>
          <h1 className="mb-4">Welcome to our todo app</h1>
          <input
            className="block border border-grey-light w-full p-3 rounded-full mb-4"
            type="username"
            name="username"
            placeholder="User Name"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="block border border-grey-light w-full p-3 rounded-full mb-4"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-wide self-center block mx-auto"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
