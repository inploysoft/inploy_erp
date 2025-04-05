import { ReactNode, useEffect, useMemo, useState } from 'react';

import {
  fetchUserAttributes,
  FetchUserAttributesOutput,
} from 'aws-amplify/auth';

import { UserContext } from './UserContext';

export default function UserProvider({ children }: { children: ReactNode }) {
  const [currentUserAttributes, setCurrentUserAttributes] =
    useState<FetchUserAttributesOutput>();

  // TODO: 20250330 페이지 이동할 때 마다 useEffect 호출...
  useEffect(() => {
    const handler = async () => {
      const currentUserAttributes = await fetchUserAttributes();
      console.log('currentUser', currentUserAttributes);

      setCurrentUserAttributes(currentUserAttributes);
    };

    void handler();
  }, []);

  //
  const contextValue = useMemo(
    () => ({
      currentUserAttributes: currentUserAttributes,
    }),
    [currentUserAttributes],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
