import {
  Authenticator,
  CheckboxField,
  TextField,
  useAuthenticator,
} from '@aws-amplify/ui-react';

interface AuthenticatorProps {
  children: React.ReactNode;
}

// https://ui.docs.amplify.aws/react/connected-components/authenticator/customization
export function InployAuthenticator({ children }: AuthenticatorProps) {
  return (
    <Authenticator
      components={{
        SignUp: {
          FormFields: CustomFormFields,
        },
      }}
      loginMechanisms={['email', 'phone_number']}
      signUpAttributes={['email']}
    >
      {children}
    </Authenticator>
  );
}

function CustomFormFields() {
  const { validationErrors } = useAuthenticator();

  return (
    <>
      <TextField
        name="custom:company_name"
        label="회사 이름"
        placeholder="회사 이름을 입력해주세요"
        required={true}
      />

      <CheckboxField
        errorMessage={validationErrors.isAdmin as string}
        hasError={!!validationErrors.isAdmin}
        name="custom:is_admin"
        value="yes"
        label="관리자인가요?"
      />

      <Authenticator.SignUp.FormFields />
    </>
  );
}
