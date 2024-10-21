import { createContext, ReactNode, useContext } from 'react';

import useLocalStorage from 'hooks/localStorage';
import { accessTokenKey } from 'constants/localStorage';
import useEmit from 'hooks/eventEmitter';
import { AuthEvents } from 'types/events';

interface Props {
  children: ReactNode;
}

type AuthContextType = {
  userSignedIn: boolean | null,
  updateAccessToken: (accessToken: string) => void,
  clearAccessToken: () => void,
}

const initialState: AuthContextType = {
  userSignedIn: false,
  updateAccessToken: () => {},
  clearAccessToken: () => {},
};

const AuthContext = createContext(initialState);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: Props) => {
  const [accessToken, setAccessToken] = useLocalStorage(accessTokenKey, '');

  const updateAccessToken = (newAccessToken: string) => {
    setAccessToken(newAccessToken);
  };

  const clearAccessToken = () => {
    setAccessToken('');
    window.location.href = '/login';
  };

  useEmit({
    [AuthEvents.updateAccessToken]: async (token: string) => {
      updateAccessToken(token);
    },
  });

  useEmit({
    [AuthEvents.clearAccessToken]: async () => {
      clearAccessToken();
    },
  });

  const value: AuthContextType = {
    userSignedIn: !!accessToken,
    updateAccessToken,
    clearAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
