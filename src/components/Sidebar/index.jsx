import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
// import Logo from '../../images/logo/logo.svg';
import Logo from "../../images/favicon.png";
import SidebarLink from "./SidebarLink";
import smallLogo from "../../images/favicon-A.png";
import DropdownUser from "../Header/DropdownUser";
import DropdownNotification from "../Header/DropdownNotification";
import DropdownHelp from "../Header/DropdownHelp";

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
      href: "/app-dashboard",
      iconType: "dashboard",
      label: "Dashboard",
    },
    {
      href: "/analytics",
      iconType: "analytics",
      label: "Analytics",
    },
    { href: "/dashboard", iconType: "home", label: "People" },
    // { href: '/people-dashboard', iconType: 'people', label: 'People' },
    { href: "/product-dashboard", iconType: "product", label: "Product" },
    { href: "/price-dashboard", iconType: "price", label: "Price(Sales)" },
    {
      href: "/promotion-dashboard",
      iconType: "promotion",
      label: "Promotion",
    },
    // {
    //   href: "/video-player",
    //   iconType: "video",
    //   label: "QQQE-Video",
    // },
    {
      href: "/campaigns",
      iconType: "campaigns",
      label: "Campaigns",
    },
  ];

  return (
    <aside
      ref={sidebar}
      className="hidden md:block overflow-visible absolute left-0 top-0 z-9 flex h-screen flex-col overflow-y-visible bg-[#161349] shadow-[0_0_11px_#ccc] duration-300 ease-linear lg:static lg:translate-x-0 
        w-20"
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-center gap-2">
        <Link to="/">
          <img src={smallLogo} className="p-2 mt-2 w-25 h-10" alt="Logo" />
        </Link>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div
        className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear "
        style={{ maxHeight: "calc(100% - 400px)" }}
      >
        {/* <!-- Sidebar Menu --> */}

        <nav className="mt-2">
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
        <div className="fixed w-20 bottom-0 flex left-0 pb-4">
          <div className="grid justify-center text-center w-full">
            <Link
              to="https://web.whatsapp.com/"
              className="min-h-10 items-center flex justify-center"
              target="#"
            >
              <i
                className="fa fa-whatsapp bg-green-500  text-white p-1 rounded-full h-6 w-6 flex items-center justify-center text-base"
                aria-hidden="true"
              ></i>
            </Link>{" "}
            {/* <span className="text-white">|</span>{" "} */}
            <Link
              to="https://calendly.com/"
              className="min-h-10 items-center flex justify-center"
              target="#"
            >
              <i
                className="fa fa-calendar-check-o bg-blue-400  text-white p-1 rounded-full h-6 w-6 flex items-center justify-center text-base"
                aria-hidden="true"
              ></i>
            </Link>{" "}
            {/* <span className="text-white">|</span>{" "} */}
            <Link
              to="https://www.tawk.to/"
              className="min-h-10 items-center flex justify-center"
              target="#"
            >
              <i
                className="fa fa-commenting bg-pink-400  text-white p-1 rounded-full h-6 w-6 flex items-center justify-center text-base"
                aria-hidden="true"
              ></i>
            </Link>{" "}
            {/* <span className="text-white">|</span>{" "} */}
            <Link
              to="https://www.calrik.com/"
              className="min-h-10 items-center flex justify-center "
              target="#"
            >
              <i
                className="fa fa-phone bg-cyan-300  text-white p-1 rounded-full h-6 w-6 flex items-center justify-center text-base"
                aria-hidden="true"
              ></i>
            </Link>
            <DropdownNotification />
            <DropdownHelp />
            <DropdownUser />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
