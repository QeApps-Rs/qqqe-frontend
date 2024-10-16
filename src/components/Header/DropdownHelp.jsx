import { useState } from "react";
import { Link } from "react-router-dom";
import ClickOutside from "../ClickOutside";

const DropdownHelp = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [notifying, setNotifying] = useState(true);

  const dropDownDivClass = "flex flex-col border-stroke";

  const menuItemClasses = "flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base";
  return (
    <>
      <ClickOutside onClick={() => setDropdownOpen(false)}>
        <div
          onClick={() => {
            // setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          className="min-h-10 items-center flex justify-center cursor-pointer"
        >
          {/* <div
            className={`absolute top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
              notifying === false ? "hidden" : "inline"
            }`}
          >
            <span className="absolute z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span> */}
          <i
            className="fa fa-info-circle text-[20px] text-white"
            aria-hidden="true"
          ></i>
        </div>
        {dropdownOpen && (
          <div className="absolute left-15 bottom-20 z-200 mt-2 w-62.5 rounded-lg bg-white shadow-[0px_5px_10px_rgba(0,0,0,0.25)] border border-[#cccccc6b]">
            <div className="px-4.5 py-3">
              <h5 className="text-md font-medium text-black flex justify-start">
                Help Center
              </h5>
            </div>
            <ul className={`${dropDownDivClass} gap-5 border-b px-6 py-4`}>
              <li>
                <Link to="/video-player" className={menuItemClasses}>
                  <i
                    className="fa fa-video-camera bg-orange-700 text-white p-1 rounded-full h-6 w-6 flex items-center justify-center text-base"
                    aria-hidden="true"
                  ></i>{" "}
                  QQQE Videos
                </Link>
              </li>
            </ul>
          </div>
        )}
      </ClickOutside>
    </>
  );
};

export default DropdownHelp;
