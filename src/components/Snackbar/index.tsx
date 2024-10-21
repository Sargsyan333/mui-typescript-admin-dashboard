import { Snackbar as SnackbarMui } from '@mui/material';

import { useSnackbarContext } from 'providers/Snackbar';

const autoHideDuration = 2000;

const Snackbar = () => {
  const { snackbarOpen, setSnackbarOpen, snackbarMessage, setSnackbarMessage } =
    useSnackbarContext();

  const handleClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

  if (typeof snackbarMessage === 'string') {
    return (
      <SnackbarMui
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        message={snackbarMessage}
      />
    );
  }

  return (
    <SnackbarMui
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={snackbarOpen}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      {snackbarMessage}
    </SnackbarMui>
  );
};

export default Snackbar;
