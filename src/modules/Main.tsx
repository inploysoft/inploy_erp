import { Button } from '@/components/ui/button';
import { useAuthenticator } from '@aws-amplify/ui-react';

export function Main() {
  const { signOut } = useAuthenticator();

  return (
    <>
      <h1>Main</h1>

      <Button onClick={signOut}>Sign out</Button>
    </>
  );
}
