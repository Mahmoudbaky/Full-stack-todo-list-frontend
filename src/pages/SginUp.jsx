import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SginUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const [userExist, setUserExist] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const [loading, setLoading] = useState(false); // Add loading state

  const navigate = useNavigate();

  const showParagraph = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  // implement the not redirecting to login page if userExist or passwordMatch is true

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/signup", {
        username,
        password,
        repassword,
      });

      response.data;

      if (response.data.userExist) {
        navigate("/");
        showParagraph();
        setUserExist(response.data.userExist);
        setPasswordMatch(false);
        return;
      }

      if (response.data.passwordConfirm) {
        navigate("/");
        showParagraph();
        setPasswordMatch(response.data.passwordConfirm);
        setUserExist(false);
        return;
      }

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
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
          <h1 className="mb-4 text-3xl text-center">Sign up</h1>
          <h1 className="mb-4">Welcome to our todo app</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Confirm Password"
            onChange={(e) => setRePassword(e.target.value)}
            required
          />

          <button
            // href={passwordMatch || userExist ? "/signup" : "/login"}
            type="submit"
            className="btn btn-wide self-center flex mx-auto "
          >
            Create Account
          </button>

          {isVisible && userExist && (
            <p className="text-red-600 mt-4">
              Username you enterd already exist
            </p>
          )}

          {isVisible && passwordMatch && (
            <p className="text-red-600 mt-4">
              Passwords you entered do not match
            </p>
          )}
        </form>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <Link
            to="/login"
            className="no-underline border-b border-blue text-blue"
          >
            {" Login"}
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default SginUp;
