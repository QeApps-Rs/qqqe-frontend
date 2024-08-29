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
    { href: '/dashboard', iconType: 'home', label: 'Dashboard' },
    { href: '/people-dashboard', iconType: 'people-icon', label: 'People' },
    { href: '/product-dashboard', iconType: 'product-icon', label: 'Product' },
    { href: '/price-dashboard', iconType: 'price-icon', label: 'Price(Sales)' },
    {
      href: '/promotion-dashboard',
      iconType: 'promotion-icon',
      label: 'Promotion',
    },
  ];

  return (
    <aside
      ref={sidebar}
      className={`overflow-hidden absolute left-0 top-0 z-9999 flex h-screen flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'w-60' : 'w-20'} ${
        sidebarOpen ? 'translate-x-0' : 'lg:w-20'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className={`flex items-center justify-center gap-2 px-6 py-5.5 lg:py-6.5 ${sidebarOpen?'':'w-32'}`}>
        <Link to="/">
          <img  src={sidebarOpen ? Logo : smallLogo } className={`${sidebarOpen ? 'p-2' : '-ml-6 p-2'}`} alt="Logo" />
        </Link>

      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className={`mb-4  text-sm font-semibold text-bodydark2 ${sidebarOpen ? 'ml-4' : 'mt-5'}`}>
              MENU
            </h3>

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


              {/* <!-- Menu Item Settings --> */}
            {/* </ul> */}
          </div>

          {/* <!-- Others Group --> */}


        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
