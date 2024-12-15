import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const LogIn = ({ setAuthToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [loading, setLoading] = useState(false); // Add loading state

  const navigate = useNavigate();

  const showParagraph = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      const { token } = response.data;
      setAuthToken(token);
      localStorage.setItem("authToken", token);
      // const decodedToken = JSON.parse(atob(token.split(".")[1]));

      if (response.data.passwordMatch || response.data.userExist) {
        showParagraph();
        navigate("/login");
        console.log("The username or password you entered is incorrect");
        setWrongCredentials(true);
        return;
      }

      if (response.status === 200) {
        navigate("/todo-page");
        setMessage("Login successful");
        console.log("Login successful:", response.data);
        // console.log(message);
      }

      // You can handle successful login logic here (e.g., redirect, save token)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    } // Set loading to false after request is complete }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  } // Render loading spinner while loading

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
            className="btn btn-wide self-center flex mx-auto"
          >
            Login
          </button>

          {isVisible && wrongCredentials && (
            <p className="text-red-600 mt-4">
              The username or password you entered is incorrect
            </p>
          )}
        </form>

        <div className="text-grey-dark mt-6">
          You don't have an account?
          <Link to="/" className="no-underline border-b border-blue text-blue">
            {" Sign Up"}
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default LogIn;
