import { ReactNode, useMemo } from 'react';

import { CoreContext } from './CoreContext';

export default function CoreProvider({ children }: { children: ReactNode }) {
  //
  const contextValue = useMemo(() => ({}), []);

  return (
    <CoreContext.Provider value={contextValue}>{children}</CoreContext.Provider>
  );
}
