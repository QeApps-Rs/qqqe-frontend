/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 sm:left-20 left-0 right-0 flex  sm:flex-row items-center justify-center px-4 py-3 bg-activity_log_bg_gradient z-50 shadow-md text-white">
      <div className="text-center md:text-left mr-4">
        <p className="text-sm">@Copyright 2024 QQQE</p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
        <FooterLink
          href="https://web.whatsapp.com/"
          icon="fa-whatsapp"
          color="text-green-500"
          label="Whatsapp"
        />
        <FooterLink
          href="https://calendly.com/"
          icon="fa-calendar-check-o"
          color="text-blue-400"
          label="Calendly"
        />
        <FooterLink
          href="https://www.tawk.to/"
          icon="fa-commenting"
          color="text-pink-400"
          label="Tawk"
        />
        <FooterLink
          href="https://www.calrik.com/"
          icon="fa-phone"
          color="text-cyan-300"
          label="Calrik"
        />
      </div>
    </footer>
  );
};

const FooterLink = ({ href, icon, color, label }) => (
  <Link
    to={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center gap-2 hover:${color} transition-all duration-300`}
  >
    <i className={`fa ${icon} ${color} text-lg`} aria-hidden="true"></i>
    <span className="hidden sm:inline-block">{label}</span>
  </Link>
);

export default Footer;
