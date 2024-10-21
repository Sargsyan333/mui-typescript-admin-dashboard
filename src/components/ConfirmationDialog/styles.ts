import { DialogTitle, DialogActions, IconButton, styled } from '@mui/material';

export const actionButtonStyles = {
  '&.Mui-disabled': {
    backgroundColor: 'transparent',
    border: 'none',
  },
};

export const loadingIconStyles = {
  marginLeft: '0.5rem',
  marginRight: '0.5rem',
};

export const dialogStyles = {
  '& .MuiDialog-paper': {
    width: '80%',
  },
};

export const StyledDialogTitle = styled(DialogTitle)(() => ({
  paddingBottom: 0,
}));

export const StyledCloseIconButton = styled(IconButton)(() => ({
  position: 'absolute',
  right: 8,
  top: 8,
}));

export const StyledDialogActions = styled(DialogActions)(() => ({
  padding: '1rem 1.75rem',
  paddingTop: 0,
}));
