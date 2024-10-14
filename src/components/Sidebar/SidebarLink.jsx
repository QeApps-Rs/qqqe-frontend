/* eslint-disable react/prop-types */
import { Link, useLocation, useNavigate } from "react-router-dom";

const SidebarLink = ({ href, iconType, label, sidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  const isActive = pathname === href || pathname.includes(href);

  return (
    <Link
      to={href}
      className={`relative
          hover:bg-slate-400  hover:text-white list-none min-h-15 text-center flex justify-center py-2  ${
            isActive && "bg-white  min-h-15 text-white items-center"
          } `}
      onClick={() => navigate(href)}
      title={label}
    >
      {" "}
      <li className="min-h-15 grid items-center">
        <span className="flex justify-center">
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
        <span
          className={`block text-xs font-medium  ${
            isActive ? "text-black" : "text-white"
          }`}
        >
          {label}
        </span>
      </li>
    </Link>
  );
};

export default SidebarLink;
