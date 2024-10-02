import React from "react";

import Icon from "../custIcon/Icon";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SidebarLink = ({ href, iconType, label, sidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  const isActive = pathname === href || pathname.includes(href);

  return (
    <li className={`${sidebarOpen ? "mb-3" : "mb-6"}   flex flex-col gap-1.5`}>
      <Link
        to={href}
        className={`group relative flex items-center ${
          sidebarOpen
            ? "gap-2.5 rounded-sm px-4 py-3 font-medium text-black duration-300 ease-in-out"
            : "sidebar rounded-lg justify-center py-2"
        } hover:bg-graydark dark:hover:bg-meta-4 hover:text-white ${
          isActive && "bg-graydark dark:bg-meta-4 text-white"
        }`}
        onClick={() => navigate(href)}
        title={label}
      >
        <span className="">
          {iconType === "home" ? (
            <i
              className="fa fa-home bg-[#4680ff] text-white p-1 rounded-full h-6 w-6 flex items-center justify-center text-lg"
              aria-hidden="true"
            ></i>
          ) : iconType === "people" ? (
            <i
              className="fa fa-users bg-[#fc6180] text-white p-1 rounded-full h-6 w-6 flex items-center justify-center text-base"
              aria-hidden="true"
            ></i>
          ) : iconType === "product" ? (
            <i
              className="fa fa-shopping-bag bg-[#7aa13f] text-white p-1 rounded-full h-6 w-6 flex items-center justify-center text-sm"
              aria-hidden="true"
            ></i>
          ) : iconType === "price" ? (
            <i
              className="fa fa-usd bg-[#f7ac3f] text-white p-1 rounded-full h-6 w-6 flex items-center justify-center text-base"
              aria-hidden="true"
            ></i>
          ) : iconType === "promotion" ? (
            <i
              className="fa fa-gift bg-[#963ce5] text-white p-1 rounded-full h-6 w-6 flex items-center justify-center text-base"
              aria-hidden="true"
            ></i>
          ) : iconType === "analytics" ? (
            <i
              className="fa fa-bar-chart fa fa-home text-[14px] bg-[#3292a9] text-white p-1 rounded-full h-6 w-6 flex items-center justify-center"
              aria-hidden="true"
            ></i>
          ) : iconType === "video" ? (
            <i
              className="fa fa-video-camera bg-orange-700 text-white p-1 rounded-full h-6 w-6 flex items-center justify-center text-base"
              aria-hidden="true"
            ></i>
          ) : iconType === "campaigns" ? (
            <i
              className="fa fa-bullhorn  bg-orange-700 text-white p-1 rounded-full h-6 w-6 flex items-center justify-center text-base"
              aria-hidden="true"
            ></i>
          ) : null}
        </span>
        {/* <span className={`icon ${iconType} 'mr-0' `} /> */}
        <span className="lg:block hidden">{sidebarOpen ? label : ""}</span>
      </Link>
    </li>
  );
};

export default SidebarLink;
