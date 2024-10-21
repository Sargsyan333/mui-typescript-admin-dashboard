import { Dispatch, SetStateAction, useEffect, useState } from 'react';


type SetValue<T> = Dispatch<SetStateAction<T>>;

function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch {
    console.error('Local storage parsing error on');
    return undefined;
  }
}

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T | null, SetValue<T | null>, () => void] {
  const item = localStorage.getItem(key);

  const [isDirty, setIsDirty] = useState(false);

  const readValue = (): T | null => {
    try {
      if (item) {
        return parseJSON(item) as T;
      }

      if (isDirty) {
        return null;
      }

      return initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T | null>(readValue);

  const setValue: SetValue<T | null> = (value) => {
    setIsDirty(true);
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;

      localStorage.setItem(key, JSON.stringify(newValue));

      setStoredValue(newValue);
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
    }
  };

  const removeValue = () => {
    localStorage.removeItem(key);
  };

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
