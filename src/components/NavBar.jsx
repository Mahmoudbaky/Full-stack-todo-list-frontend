import React from "react";
import { DarkMode } from "./index";
const NavBar = () => {
  return (
    <nav className="navbar bg-transparent fixed z-[999] px-6 py-4 border-b border-gray-400">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-white">daisyUI</a>
      </div>
      <div className="flex-none gap-4">
        <button className="btn btn-sm">Sign out</button>

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
