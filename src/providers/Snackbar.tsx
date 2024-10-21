import {
  useContext,
  createContext,
  useState,
  ReactNode,
  ReactElement,
  Dispatch,
  SetStateAction,
} from 'react';

type SnackbarContextType = {
  snackbarOpen: boolean;
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>;
  snackbarMessage: string | ReactElement;
  setSnackbarMessage: Dispatch<SetStateAction<string | ReactElement>>;
};

const initialState: SnackbarContextType = {
  snackbarOpen: false,
  setSnackbarOpen: () => {},
  snackbarMessage: '',
  setSnackbarMessage: () => {},
};

export const SnackbarContext = createContext(initialState);

export const useSnackbarContext = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | ReactElement>(
    '',
  );

  const value = {
    snackbarOpen,
    setSnackbarOpen,
    snackbarMessage,
    setSnackbarMessage,
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
};
