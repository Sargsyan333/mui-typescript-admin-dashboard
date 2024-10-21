import { sidebarWidth } from 'constants/main';

export const sidebarStyles = {
  width: `${sidebarWidth}px`,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: `${sidebarWidth}px`,
    boxSizing: 'border-box',
    top: '78px'
  },
};

export const expandBtnStyles = {
  background: 'transparent',
  padding: 0,
  minWidth: 'auto',
  outline: 'none',
};