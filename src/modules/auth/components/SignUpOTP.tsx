import { useCallback, useState } from 'react';

import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';

import { Button } from '@/components/ui/button/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { H4 } from '@/theme/Typography';
import { useNavigate } from 'react-router';

interface SignUpOTPProps {
  username: string;
}

export function SignUpOTP({ username }: SignUpOTPProps) {
  const navigate = useNavigate();

  const [value, setValue] = useState('');

  const onClickSendCode = useCallback(async () => {
    if (!username) {
      return;
    }

    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: username,
        confirmationCode: value,
      });

      if (isSignUpComplete && nextStep.signUpStep === 'DONE') {
        alert('회원가입에 성공했어요. 로그인 페이지로 돌아갈께요');

        navigate('/signin');
      }
    } catch (error) {
      alert('인증코드를 다시 확인해주세요' + error);
    }
  }, [navigate, username, value]);

  const onClickResendCode = useCallback(async () => {
    if (!username) {
      return;
    }

    try {
      await resendSignUpCode({
        username: username,
      });
    } catch (error) {
      alert('인증코드를 다시 확인해주세요' + error);
    }
  }, [username]);

  return (
    <div className="flex flex-col items-center space-y-2 pt-10">
      <H4>인증코드 입력</H4>

      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <p className="text-muted-foreground text-center text-sm">
        이메일로 전송된 6자리 인증 코드를 입력 후 확인 버튼을 눌러주세요
      </p>

      <div className="flex w-full justify-center gap-2">
        <Button onClick={onClickSendCode}>인증 코드 전송</Button>
        <Button onClick={onClickResendCode}>인증 코드 다시보내기</Button>
      </div>
    </div>
  );
}
