import { useAuthenticator } from '@aws-amplify/ui-react';

export function Main() {
  const { signOut } = useAuthenticator();

  return (
    <>
      <h1>Main</h1>

      <button onClick={signOut}>Sign out</button>
    </>
  );
}
