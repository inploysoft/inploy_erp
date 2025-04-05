import { createContext, useContext } from 'react';

import { FetchUserAttributesOutput } from 'aws-amplify/auth';

interface UserContextType {
  currentUserAttributes: FetchUserAttributesOutput | undefined;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

// Required Definite Assignment Assertions(!)
export const useUserContext = () => useContext(UserContext)!;
