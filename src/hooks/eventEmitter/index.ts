import { useState, useEffect } from 'react';

import Events from 'hooks/eventEmitter/EventEmitter';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useEmit = (listeners: { [key: string]: any }) => {
  const [entries, setEntries] = useState(Object.entries(listeners));

  useEffect(() => {
    if (Object.entries(listeners).toString() !== entries.toString()) {
      setEntries(Object.entries(listeners));
    }
  }, [listeners]);

  useEffect(() => {
    for (let i = 0; i < entries.length; i += 1) {
      Events.on(entries[i][0], entries[i][1]);
    }
    return () => {
      for (let i = 0; i < entries.length; i += 1) {
        Events.off(entries[i][0], entries[i][1]);
      }
    };
  }, [entries]);
};

export default useEmit;
