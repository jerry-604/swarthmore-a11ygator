import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Drawer, List, ListItem, IconButton, Tooltip, ListItemIcon, ListItemText } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const Sidebar = ({ data, selectedKey, setSelectedKey, collapsed, handleDrawerToggle, drawerWidth }) => {
  const router = useRouter();
  const itemRefs = useRef([]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, data.length);
  }, [data]);

  useEffect(() => {
    if (selectedKey && itemRefs.current[selectedKey-1]) {
      itemRefs.current[selectedKey-1].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedKey]);

  const handleListItemClick = (courseName, key) => {
    setSelectedKey(key);
    router.push(`/#${courseName}`);
  };

  if (collapsed) {
    return (
        <Tooltip title="Open Sidebar" placement="right">
      <IconButton
        onClick={handleDrawerToggle}
        className="fixed left-0 top-1/2 -translate-y-1/2 bg-[#b43135] rounded-r-full z-50 hover:bg-[#a02d2a] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#b43135] hover:shadow-2xl transition-shadow duration-300 ease-in-out hover:transform hover:scale-105"
        aria-label="Open Sidebar"
      >
        <ChevronRightIcon className="text-white" />
      </IconButton>
        </Tooltip>
    );
  }

  return (
    <Drawer
      variant="persistent"
      open={!collapsed}
      className={`m-4 overflow-hidden transition-width duration-300 ease-in-out`}
      PaperProps={{ className: `h-full w-[280px] box-border overflow-auto` }}
    >
        <div className='sticky top-0 bg-white z-30 flex' >
            <Tooltip title="Close Sidebar" placement="right">
      <IconButton
        onClick={handleDrawerToggle}
        aria-label="Close navigation"
        className=" sticky top-0 bg-white z-30 justify-center mx-auto my-4 focus:outline focus:outline-2 focus:outline-[#b43135]"
      >
        <ChevronLeftIcon />
      </IconButton>
            </Tooltip>
      </div>
      <List>
        {data.map((course, index) => {
          const isSelected = selectedKey === `${index + 1}`;
          const key = `${index + 1}`;

          return (

              <ListItem
                button
                ref={(el) => itemRefs.current[index] = el}
                onClick={() => handleListItemClick(course.name, key)}
                className={`rounded ${isSelected ? 'bg-[#b43135]' : 'bg-transparent'} ${isSelected && 'text-white' } focus:bg-[#b43135] focus:text-white hover:text-blue-950` }
              >
                <ListItemIcon className="min-w-0 mr-2">
                  <FolderOpenIcon className={`${isSelected ? 'text-white' : 'text-gray-700'}`} />
                </ListItemIcon>
                {!collapsed && <ListItemText primary={course.name} primaryTypographyProps={{ className: `${isSelected ? 'text-white' : 'text-gray-700'}` }} />}
              </ListItem>

          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
