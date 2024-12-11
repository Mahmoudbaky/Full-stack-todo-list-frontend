import React from "react";

const SginUp = () => {
  return (
    <div class="bg-grey-lighter min-h-screen flex flex-col">
      <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 ">
        <div class="bg-white px-6 py-8 rounded-xl shadow-md text-black w-full flex flex-col items-center">
          <h1 class="mb-4 text-3xl text-center">Sign up</h1>
          <h1 className="mb-4">Welcome to our todo app</h1>
          <input
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="fullname"
            placeholder="Full Name"
          />

          <input
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
          />

          <input
            type="password"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
          />
          <input
            type="password"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Confirm Password"
          />

          <button type="submit" class="btn btn-wide self-center block mx-auto">
            Create Account
          </button>
        </div>

        <div class="text-grey-dark mt-6">
          Already have an account?
          <a
            class="no-underline border-b border-blue text-blue"
            href="../login/"
          >
            {" Login"}
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default SginUp;
