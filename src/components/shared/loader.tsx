import React from "react";

const Loader = ({
  children,
  message,
}: {
  children?: React.ReactNode;
  message?: string;
}) => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      {children && children}
      <p className="text-gray-500">{message || children ? "" : "Loading..."}</p>
    </div>
  );
};

export default Loader;
