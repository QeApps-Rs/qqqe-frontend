import React, { useEffect, useState } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { Outlet, useLocation } from 'react-router-dom';

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isShowback, setShowback] = useState(false)
  const location = useLocation();
  const { pathname } = location;

  const noSidebarOrHeaderPaths = [
    '/signin',
    '/auth/signup',
    '/forgot-password',
    '/email-verification',
    '/reset-password',
  ];

  useEffect(() => {
    if (pathname === '/master-form') {
      setShowback(true)
      setSidebarOpen(false)
    } else {
      setShowback(false)
      setSidebarOpen(true)
    }
  }, [pathname])

  const showSidebarAndHeader = !noSidebarOrHeaderPaths.includes(pathname);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        {showSidebarAndHeader && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          {showSidebarAndHeader &&
            (<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isShowback={isShowback} />
            )}
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
