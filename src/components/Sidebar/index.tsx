import { Button, Collapse, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';

import { expandBtnStyles, sidebarStyles } from 'components/Sidebar/styles';

type MenuItemProps = {
  name: string;
  title: string;
  link: string;
  submenu?: MenuItemProps[];
}

const menuItems: MenuItemProps[] = [
  {
    name: 'coworkers',
    title: 'coworkers',
    link: '/coworkers',
  },
  {
    name: 'clients',
    title: 'clients',
    link: '/clients',
  },
  {
    name: 'projects',
    title: 'projects',
    link: '/projects',
    submenu: [
      {
        name: 'subprojects',
        title: 'subprojects',
        link: '/subprojects',
      },
    ],
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useTranslation('main', {keyPrefix: 'menu'});

  const [submenuOpen, setSubmenuOpen] = useState<boolean>(false);

  const handleMenuExpandBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    setSubmenuOpen((prev) => !prev);
  };

  const onMenuItemClick = (link: string) => {
    navigate(link);
  };

  return (
    <Drawer
      sx={sidebarStyles}
      variant="persistent"
      anchor="left"
      open
    >
      <List>
        {menuItems.map((menuItem) => (
          <React.Fragment key={`menu-${menuItem.name}`}>
            <ListItemButton
              onClick={() => { onMenuItemClick(menuItem.link) }}
              sx={{ backgroundColor: location.pathname.includes(menuItem.link) ? 'rgba(25, 118, 210, 0.08)' : ''  }}
            >
              <ListItemText primary={t(menuItem.title)} />
              {
                menuItem.submenu &&
                <Button onClick={handleMenuExpandBtnClick} sx={expandBtnStyles}>
                  {submenuOpen ? <ExpandLess /> : <ExpandMore />}
                </Button>
              }
            </ListItemButton>
            {
              menuItem.submenu && (
                <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {menuItem.submenu.map((submenuItem) => (
                        <ListItemButton
                          sx={{
                            pl: 4,
                            backgroundColor: location.pathname.includes(submenuItem.link) ? 'rgba(25, 118, 210, 0.08)' : ''
                          }}
                          key={submenuItem.name}
                          onClick={() => { onMenuItemClick(submenuItem.link) }}
                        >
                          <ListItemText primary={t(submenuItem.title)} />
                        </ListItemButton>
                      ))}
                  </List>
                </Collapse>
              )
            }
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar;