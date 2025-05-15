import React from "react";

const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-dvh w-dvw max-w-dvw bg-[#ffffff]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(#ff730033_1px,#ffffff_1px)] bg-[size:16px_16px] "></div>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(60deg,_rgba(255,255,255,1),_rgba(215,255,207,0.25)_38%,_rgba(250,232,255,0.28)_50%,_rgba(255,255,255,1))]"></div>
      <div className="relative z-10 h-dvh w-full overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

export default Background;
