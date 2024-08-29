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

  // close on click outside
  // useEffect(() => {
  //   const clickHandler = ({ target }) => {
  //     if (!sidebar.current || !trigger.current) return;
  //     if (
  //       !sidebarOpen ||
  //       sidebar.current.contains(target) ||
  //       trigger.current.contains(target)
  //     )
  //       return;
  //     setSidebarOpen(false);
  //   };
  //   document.addEventListener("click", clickHandler);
  //   return () => document.removeEventListener("click", clickHandler);
  // });

  // close if the esc key is pressed
  // useEffect(() => {
  //   const keyHandler = ({ keyCode }) => {
  //     if (!sidebarOpen || keyCode !== 27) return;
  //     setSidebarOpen(false);
  //   };
  //   document.addEventListener("keydown", keyHandler);
  //   return () => document.removeEventListener("keydown", keyHandler);
  // });

  // useEffect(() => {
  //   localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
  //   if (sidebarExpanded) {
  //     document.querySelector("body")?.classList.add("sidebar-expanded");
  //   } else {
  //     document.querySelector("body")?.classList.remove("sidebar-expanded");
  //   }
  // }, [sidebarExpanded]);

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

  console.log(sidebarOpen,"sidebarOpen")
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

        {/* <button
          // ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
          aria-label="sidebar"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button> */}
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
