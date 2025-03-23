import { useState } from 'react';

import { Authenticator, TextField } from '@aws-amplify/ui-react';
import { DefaultComponents } from 'node_modules/@aws-amplify/ui-react/dist/types/components/Authenticator/hooks/useCustomComponents/defaultComponents';

interface AuthenticatorProps {
  children: React.ReactNode;
}

interface AWSComponents {
  Footer?: () => React.JSX.Element | null;
  FormFields?: () => React.JSX.Element | null;
  Header?: () => React.JSX.Element | null;
}

export function InployAuthenticator({ children }: AuthenticatorProps) {
  const [companyName, setCompanyName] = useState('');

  const signUpComponents: AWSComponents = {
    FormFields() {
      return (
        <>
          <TextField
            label="회사 이름"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required={true}
          />

          <Authenticator.SignUp.FormFields />
        </>
      );
    },
  };

  const components: DefaultComponents = {
    SignUp: signUpComponents,
  };

  return (
    <Authenticator
      loginMechanisms={['email', 'phone_number']}
      signUpAttributes={['email']}
      components={components}
    >
      {children}
    </Authenticator>
  );
}
