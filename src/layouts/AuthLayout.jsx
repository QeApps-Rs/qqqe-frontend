import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}

      {/* <!-- ===== Content Area Start ===== --> */}
      {/* <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden"> */}
      {/* <!-- ===== Main Content Start ===== --> */}
      <main className="absolute min-h-screen bg-[url('/src/images/purple-bg.jpg')] bg-no-repeat bg-cover  w-full overflow-auto">
        <div className="relative inset-0 backdrop-brightness-50  opacity-90 h-full min-h-screen">
          {/* <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10"> */}
          <Outlet />

          {/* </div> */}
        </div>
      </main>
      {/* <!-- ===== Main Content End ===== --> */}
      {/* </div> */}
      {/* <!-- ===== Content Area End ===== --> */}
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
};

export default AuthLayout;
