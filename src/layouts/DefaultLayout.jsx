import React, { useEffect, useState } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isShowBack, setShowBack] = useState(false)
 
  const { pathname } = useLocation();

  const noSidebarOrHeaderPaths = [
    '/signin',
    '/auth/signup',
    '/forgot-password',
    '/email-verification',
    '/reset-password',
  ];

  useEffect(() => {
    if (pathname === '/master-form') {
      setShowBack(true)
      setSidebarOpen(false)
    } else {
      setShowBack(false)
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
            (<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isShowBack={isShowBack} />
            )}
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className={ pathname == '/master-form' ? '':`mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 `}>
              <Outlet />
            </div>
          </main>
          { pathname != '/master-form' ? <Footer sidebarOpen={sidebarOpen}/> : null}
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
