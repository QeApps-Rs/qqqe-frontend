
import React from 'react';

import Icon from '../custIcon/Icon';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SidebarLink = ({
  href,
  iconType,
  label,
  sidebarOpen,
}) => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  const isActive = pathname === href || pathname.includes(href);

  return (
    <li className={`${sidebarOpen ? 'mb-3' : 'mb-6'}   flex flex-col gap-1.5`}  >
      <Link
        to={href}
        className={`group relative flex items-center ${sidebarOpen ? 'gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out' : 'sidebarrounded-lg'} hover:bg-graydark dark:hover:bg-meta-4 ${isActive && 'bg-graydark dark:bg-meta-4'
          }`}
        onClick={() => navigate(href)}
        title={label}
      >
        <Icon type={iconType} title={label} />
        {/* <span className={`icon ${iconType} 'mr-0' `} /> */}
        <span className="lg:block hidden">{sidebarOpen ? label : ''}</span>
      </Link>
    </li>
  );
};

export default SidebarLink;
