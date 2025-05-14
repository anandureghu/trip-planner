import React from "react";

const navbar = () => {
  return (
    <div className="flex items-center justify-between p-5 absolute top-0 left-0 right-0 w-full z-10">
      <h1 className="text-2xl font-poppins font-medium">Trip Planner</h1>
      <div className="flex items-center gap-1">
        <button className="p-2 px-4 rounded-full font-medium cursor-pointer font-montserrat">
          Sign In
        </button>
        <button className="border-black border p-2 px-4 rounded-full font-medium cursor-pointer font-montserrat hover:bg-black hover:text-white transition-all duration-300">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default navbar;
