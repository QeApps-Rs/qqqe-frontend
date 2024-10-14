import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark auth-layout">
    {/* <!-- ===== Page Wrapper Start ===== --> */}


      {/* <!-- ===== Content Area Start ===== --> */}
      {/* <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden"> */}
        {/* <!-- ===== Main Content Start ===== --> */}
        <main>
          {/* <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10"> */}
            <Outlet />

          {/* </div> */}
        </main>
        {/* <!-- ===== Main Content End ===== --> */}
      {/* </div> */}
      {/* <!-- ===== Content Area End ===== --> */}
    {/* <!-- ===== Page Wrapper End ===== --> */}
  </div>
  );
};

export default AuthLayout;
