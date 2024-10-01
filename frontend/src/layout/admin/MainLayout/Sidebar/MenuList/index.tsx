import React from 'react';
import { Typography } from '@mui/material';

// Project imports
import NavGroup from './NavGroup';
import menuItem from '@/menu-items'; // Ensure this path is correct and the module is properly typed

// Define types for menu item
interface MenuItem {
  id: string;
  type: 'group' | 'item'; // Adjust according to the actual types in your data
}

// Define the structure of menuItem object
interface MenuItems {
  items: MenuItem[];
}

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList: React.FC = () => {
  // Type assertion to ensure menuItem conforms to MenuItems
  const navItems = (menuItem as MenuItems).items.map((item: any) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
