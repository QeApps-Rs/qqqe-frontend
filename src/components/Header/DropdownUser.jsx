import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import LogOutSvg from '../../images/svg-icons/logoutSvg';
import SettingSvg from '../../images/svg-icons/settingSvg';
import DownArrowSvg from '../../images/svg-icons/downArrowSvg';

const DropdownUser = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState({});
    const [initial, setInitial] = useState('U');

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = '/';
    };

    function getInitials(name) {
        const initials = name.split(' ')
            .map(word => word[0].toUpperCase())
            .join('');
        return initials;
    }

    useEffect(() => {
        let user = localStorage.getItem("user");
        if (user) {
            user = JSON.parse(user);
            setUser(user);
            const initial = getInitials(user.name);
            setInitial(initial);
        }
    }, []);

    const menuItemClasses = "flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base";
    const dropDownDivClass = "flex flex-col border-stroke dark:border-strokedark";

    return (
        <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
            <Link to="#" onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-4">
                <span className="hidden text-right lg:block">
                    <span className="block text-sm font-medium text-black dark:text-white">
                        Welcome, {user && user.name}
                    </span>
                </span>
                <span className="h-12 w-12 flex items-center justify-center rounded-full bg-customGray text-white font-bold">
                    {initial}
                </span>

                <DownArrowSvg />
            </Link>

            {/* <!-- Dropdown Start --> */}
            {dropdownOpen && (
                <div className={`${dropDownDivClass} absolute right-0 mt-4 w-62.5 rounded-sm border bg-white shadow-default dark:bg-boxdark`}>
                    <ul className={`${dropDownDivClass} gap-5 border-b px-6 py-7.5`}>
                        <li>
                            <Link to="/settings" className={menuItemClasses}>
                                <SettingSvg /> Settings
                            </Link>
                        </li>
                    </ul>
                    <button onClick={handleLogout} className={`${menuItemClasses} px-6 py-4`}>
                        <LogOutSvg /> Log Out
                    </button>
                </div>
            )}
            {/* <!-- Dropdown End --> */}
        </ClickOutside>
    );
};

export default DropdownUser;
