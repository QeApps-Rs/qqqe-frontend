import { useState } from "react";
import { Link } from "react-router-dom";
import ClickOutside from "../ClickOutside";
import { NotificationIcon } from "../custIcon/svgIcon";

const notifications = [
  {
    message: "Edit your information in a swipe",
    date: "12 May, 2025",
  },
  {
    message: "It is a long established fact",
    date: "24 Feb, 2025",
  },
  {
    message: "There are many variations",
    date: "04 Jan, 2025",
  },
  {
    message: "There are many variations",
    date: "01 Dec, 2024",
  },
];

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
    <ClickOutside onClick={() => setDropdownOpen(false)}>
      <div
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="min-h-10 flex items-center justify-center cursor-pointer"
      >
        <NotificationIcon />
      </div>

      {dropdownOpen && (
        <div className="absolute left-15 bottom-30 z-200 mt-2 w-62.5 rounded-lg border bg-white shadow-[0px_5px_10px_rgba(0,0,0,0.25)] border-[#cccccc6b]">
          <div className="px-4.5 py-3">
            <h5 className="text-sm font-bold text-black text-justify">
              Notifications
            </h5>
          </div>
          <ul className="flex flex-col overflow-y-auto">
            {notifications.map((notification, index) => (
              <li key={index}>
                <Link
                  className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 text-justify"
                  to="#"
                >
                  <p className="text-sm">
                    <span className="text-black dark:text-white">
                      {notification.message}
                    </span>{" "}
                    Sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim.
                  </p>
                  <p className="text-xs">{notification.date}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </ClickOutside>
    </>
  );
};

export default DropdownNotification;
