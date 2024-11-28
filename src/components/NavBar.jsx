import React from "react";

const NavBar = () => {
  return (
    <nav className="p-3 bg-transparent top-0 fixed w-[100%] z-auto">
      <div className="navbar bg-base-100 bg-transparent">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-white">Todo List</a>
        </div>
        <div className="flex-none gap-2">
          <button className="btn btn-outline btn-error"> Sign out </button>
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
            {/* <ul
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
            </ul> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
