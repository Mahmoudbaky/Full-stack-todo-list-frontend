import React, { useState } from "react";
import { DarkMode } from "./index";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const authToken = localStorage.getItem("authToken");

const NavBar = () => {
  const navigate = useNavigate();

  // const [loading, setLoading] = useState(false); // Add loading state

  const handleLogout = async () => {
    // setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/login");
        localStorage.removeItem("authToken");
        console.log(authToken);
      }
    } catch (err) {
      console.log(err);
    } finally {
      // setLoading(false);
    } // Set loading to false after request is complete }
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <span className="loading loading-dots loading-lg"></span>
  //     </div>
  //   );
  // } // Render loading spinner while loading

  return (
    <nav className="navbar bg-transparent fixed z-[999] px-6 py-4 border-b border-gray-400">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-white">daisyUI</a>
      </div>
      <div className="flex-none gap-4">
        <button className="btn btn-sm" onClick={handleLogout}>
          Sign out
        </button>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
