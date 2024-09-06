import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
// import Logo from '../../images/logo/logo.svg';
import Logo from "../../images/favicon.png";
import SidebarLink from "./SidebarLink";
import smallLogo from '../../images/favicon-A.png';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );



  const sidebarLinks = [
    {
      href: '/analytics',
      iconType: 'analytics',
      label: 'Analytics',
    },
    { href: '/dashboard', iconType: 'home', label: 'People' },
    // { href: '/people-dashboard', iconType: 'people', label: 'People' },
    { href: '/product-dashboard', iconType: 'product', label: 'Product' },
    { href: '/price-dashboard', iconType: 'price', label: 'Price(Sales)' },
    {
      href: '/promotion-dashboard',
      iconType: 'promotion',
      label: 'Promotion',
    },
  ];

  return (
    <aside
      ref={sidebar}
      className={`overflow-hidden absolute left-0 top-0 z-9999 flex h-screen flex-col overflow-y-hidden bg-white shadow-[0_0_11px_#ccc] duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'w-60' : 'w-20'} ${sidebarOpen ? 'translate-x-0' : 'lg:w-20'
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className={`bg-[#303549] flex items-center justify-center gap-2 px-6 py-5.4 lg:py-6.4 ${sidebarOpen ? '' : 'w-32'}`}>
        <Link to="/">
          <img src={sidebarOpen ? Logo : smallLogo} className={`${sidebarOpen ? 'p-2' : '-ml-6 p-2'}`} alt="Logo" />
        </Link>

      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}

        <nav className="mt-5 py-4 lg:mt-4">
          {/* <!-- Menu Group --> */}
          <div>
            {/* <ul className="mb-6 flex flex-col gap-1.5"> */}
            {/* <!-- Menu Item Dashboard --> */}

            {sidebarLinks?.map((link) => (
              <SidebarLink
                key={link.href}
                href={link.href}
                iconType={link.iconType}
                label={link.label}
                sidebarOpen={sidebarOpen}
              />
            ))}
          </div>
        </nav>
        {sidebarOpen && <div className="container fixed bottom-0 p-4 bg-black w-full flex justify-center">
          <p className="text-sm">
            <Link to='https://web.whatsapp.com/' className="ml-1 mr-1" target="#">
              <i class="fa fa-whatsapp text-white" aria-hidden="true"></i>
            </Link>{" "}
            <span className="text-white">|</span>{" "}
            <Link to='https://calendly.com/' className="ml-1 mr-1" target="#">
              <i class="fa fa-calendar-check-o text-white" aria-hidden="true"></i>
            </Link>{" "}
            <span className="text-white">|</span>{" "}
            <Link to='https://www.tawk.to/' className="ml-1 mr-1" target="#">
              <i class="fa fa-commenting text-white" aria-hidden="true"></i>
            </Link>
            {" "}
            <span className="text-white">|</span>{" "}
            <Link to='https://www.calrik.com/' className="ml-1" target="#">
              <i class="fa fa-phone text-white" aria-hidden="true"></i>
            </Link>
          </p>
        </div>}
      </div>
    </aside>
  );
};

export default Sidebar;
