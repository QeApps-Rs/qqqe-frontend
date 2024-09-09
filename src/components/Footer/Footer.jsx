import React from "react";
import { TawkLogo } from '../custIcon/svgIcon'
import { Link } from "react-router-dom";

const Footer = ({ sidebarOpen }) => {
  return (
    <footer className={`bg-black text-white py-4 fixed bottom-0 ${sidebarOpen ? 'right-0 w-[88%]' : 'right-0 w-[96%]'}`}>
      <div className="container mx-auto text-center">
        <p className="text-sm">
          <span className="mr-3">@Copyright 2024 Des Moines University</span><span>|</span>{" "}
          <Link to='https://web.whatsapp.com/' className="ml-3" target="#">
            <i className="fa fa-whatsapp" aria-hidden="true"></i><span className="ml-1 mr-3">whatsapp</span>
          </Link>{" "}
          |{" "}
          <Link to='https://calendly.com/' className="ml-3" target="#">
            <i className="fa fa-calendar-check-o" aria-hidden="true"></i><span className="ml-1 mr-3">Calendly</span>
          </Link>{" "}
          |{" "}
          <Link to='https://www.tawk.to/' className="ml-3" target="#">
            <i className="fa fa-commenting" aria-hidden="true"></i><span className="ml-1 mr-3">Tawk</span>
          </Link>
          {" "}
          | {" "}
          <Link to='https://www.calrik.com/' className="ml-3" target="#">
            <i className="fa fa-phone" aria-hidden="true"></i><span className="ml-1 mr-3">Calrik</span>
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
