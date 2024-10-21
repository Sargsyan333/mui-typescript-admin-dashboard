import { IconButton, styled } from '@mui/material';

export const actionsWrapperStyles = {
  display: 'flex',
  justifyContent: 'flex-end',
};

export const StyledActionButton = styled(IconButton)({
  '& > svg': {
    fontSize: '1.25rem',
  },
});