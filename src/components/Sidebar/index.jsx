import { useRef } from "react";
import { Link } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import smallLogo from "../../images/favicon-A.png";
import DropdownUser from "../Header/DropdownUser";
import DropdownNotification from "../Header/DropdownNotification";
import DropdownHelp from "../Header/DropdownHelp";

const Sidebar = () => {
  const sidebar = useRef(null);

  const sidebarLinks = [
    {
      href: "/app-dashboard",
      iconType: "dashboard",
      label: "Dashboard",
    },
    {
      href: "/analytics",
      iconType: "analytics",
      label: "Overview",
    },
    { href: "/people-dashboard", iconType: "people", label: "People" },
    { href: "/product-dashboard", iconType: "product", label: "Product" },
    { href: "/price-dashboard", iconType: "price", label: "Price(Sales)" },
    {
      href: "/promotion-dashboard",
      iconType: "promotion",
      label: "Promotion",
    },
    {
      href: "/campaigns",
      iconType: "campaigns",
      label: "Campaigns",
    },
  ];

  return (
    <aside
      ref={sidebar}
      className="hidden sm:block overflow-visible absolute z-9 top-0 flex-col  bg-activity_log_bg_gradient duration-300 ease-linear 
        w-20 h-screen"
    >
      {/* <!-- SIDEBAR HEADER --> */}
      {/* <div className="flex items-center justify-center gap-2">
        <Link to="/">
          <img src={smallLogo} className="p-2 mt-2 w-25 h-10" alt="Logo" />
        </Link>
      </div> */}
      {/* <!-- SIDEBAR HEADER --> */}

      <div
        className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear "
        style={{ maxHeight: "calc(100% - 210px)" }}
      >
        {/* <!-- Sidebar Menu --> */}

        <nav>
          {/* <!-- Menu Group --> */}
          <div>
            {/* <!-- Menu Item Dashboard --> */}

            {sidebarLinks?.map((link) => (
              <SidebarLink
                key={link.href}
                href={link.href}
                iconType={link.iconType}
                label={link.label}
              />
            ))}
          </div>
        </nav>
        <div className="fixed w-20 bottom-0 flex left-0 pb-4">
          <div className="grid justify-center text-center w-full">
            <Link to={"/activity/log"}>
              <div className="min-h-10 items-center flex justify-center cursor-pointer">
                <i
                  className="fa fa-refresh text-[20px] bg-[#907dfff0] text-white p-1 rounded-full h-6 w-6 flex items-center justify-center text-base"
                  aria-hidden="true"
                ></i>
              </div>
            </Link>
            <DropdownNotification className={"left-15 bottom-30"}/>
            <DropdownHelp className={"left-15 bottom-20"} />
            <DropdownUser className={"top-0 left-15"} />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
