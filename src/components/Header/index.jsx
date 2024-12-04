import { Link } from "react-router-dom";
import smallLogo from "../../images/favicon-A.png";
import DropdownNotification from "./DropdownNotification";
import DropdownHelp from "./DropdownHelp";
import DropdownUser from "./DropdownUser";

const Header = () => {
  return (
<div className="fixed top-0 sm:left-20 left-0 right-0  flex items-center justify-between px-6 py-2 bg-activity_log_bg_gradient z-50 shadow-md">
<Link to={"/app-dashboard"}> <img src={smallLogo} className="w-[100px] h-auto" alt="Logo" /></Link>

  <div className="relative flex items-center gap-4">
    <Link to={"/activity/log"}>
      <div className="flex items-center justify-center cursor-pointer h-6 w-6 rounded-full bg-[#907dff] text-white">
        <i className="fa fa-refresh text-base" aria-hidden="true"></i>
      </div>
    </Link>

    {/* Dropdown Components */}
    <DropdownNotification className="absolute top-10 right-10" />
    <DropdownHelp className="absolute top-10 right-10" />
    <DropdownUser className="absolute top-13 right-0" />
  </div>
</div>

  );
};

export default Header;
