import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const NavBar = ({ userName }) => {
  return (
    <nav className="navbar bg-transparent fixed z-[999] px-6 py-4 border-b border-gray-400">
      <div className="flex-1">
        <LogoutButton />
      </div>
      <div className="flex-none gap-4">
        <p className="btn btn-ghost text-xl text-white">
          {userName && <span>Welcome, {userName}!</span>}
        </p>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk"
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
