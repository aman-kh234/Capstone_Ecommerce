import { Divider, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DrawerList = ({ menu, menu2, toggleDrawer }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className='h-full'>
      <div className='flex flex-col justify-between h-full w-[300px] border-r py-5'>
        <div className='space-y-2'>
          {menu.map((item, index) => (
            <div
              onClick={() => navigate(item.path)}
              className='pr-9 cursor-pointer'
              key={index}
            >
              <p
                className={`${
                  item.path === location.pathname
                    ? 'bg-[#000000] text-white'
                    : 'text-[#000000]'
                } flex items-center px-5 py-3 rounded-r-full`}
              >
                <ListItemIcon>
                  {item.path === location.pathname
                    ? item.activeIcon
                    : item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </p>
            </div>
          ))}
        </div>
        <Divider />
        <div className='space-y-2'>
          {menu2.map((item, index) => (
            <div
              onClick={() => navigate(item.path)}
              className='pr-9 cursor-pointer'
              key={index}
            >
              <p
                className={`${
                  item.path === location.pathname
                    ? 'bg-[#000000] text-white'
                    : 'text-[#6a1b9a]'
                } flex items-center px-5 py-3 rounded-r-full`}
              >
                <ListItemIcon>
                  {item.path === location.pathname
                    ? item.activeIcon
                    : item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrawerList;
