import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="absolute min-h-screen bg-[url('/src/images/purple-bg.jpg')] bg-no-repeat bg-cover  w-full overflow-auto">
        <div className="relative inset-0 backdrop-brightness-50  opacity-90 h-full min-h-screen">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
