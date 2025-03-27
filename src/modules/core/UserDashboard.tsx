import { Button } from '@/components/ui/button';
import { H1, H2, H3 } from '@/theme/Typography';
import { useAuthenticator } from '@aws-amplify/ui-react';

export function UserDashboard() {
  const { signOut } = useAuthenticator();

  return (
    <>
      <H1>Main</H1>

      <H2>메인</H2>

      <H3>Main</H3>

      <Button onClick={signOut}>Sign out</Button>
    </>
  );
}
