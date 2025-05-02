import { useCallback, useState } from 'react';

import { signUp } from 'aws-amplify/auth';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formatKoreanPhoneToInternational } from '@/shared/lib/format';
import { cn } from '@/shared/lib/utils';
import { Button } from '../../components/ui/button/button';
import { SignUpOTP } from './components/SignUpOTP';

const formSchema = z
  .object({
    name: z.string(),
    username: z.string().email(),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        '비밀번호는 8자 이상이며, 대소문자, 숫자, 특수문자를 각각 하나 이상 포함해야해요',
      ),
    confirmPassword: z.string(),
    'custom:company_name': z.string(),
    'custom:is_admin': z.boolean(),
    phone_number: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않아요',
    path: ['confirmPassword'],
  });

export function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [username, setUsername] = useState<string>('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      'custom:company_name': '',
      'custom:is_admin': false,
      phone_number: '',
    },
  });

  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: values.username,
      password: values.password,
      options: {
        userAttributes: {
          name: values.name,
          'custom:company_name': values['custom:company_name'],
          'custom:is_admin': String(values['custom:is_admin']),
          phone_number: formatKoreanPhoneToInternational(values.phone_number),
        },
      },
    });

    console.log('isSignUpComplete', isSignUpComplete);
    console.log('userId', userId);
    console.log('nextStep', nextStep);

    if (!isSignUpComplete && nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
      setUsername(values.username);
    }
  }, []);

  return (
    <div
      className={cn(
        'absolute top-1/2 left-1/2 w-1/3 -translate-x-1/2 -translate-y-1/2',
      )}
    >
      <Card>
        <CardHeader>
          <CardTitle>회원 가입</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>

                    <FormControl>
                      <Input
                        required
                        placeholder="이름을 입력해주세요"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>

                    <FormControl>
                      <Input
                        required
                        placeholder="이메일을 입력해주세요"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>

                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="비밀번호를 입력해주세요"
                          //
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            form.clearErrors('password');
                          }}
                        />

                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute top-1/2 right-2 -translate-y-1/2"
                        >
                          {showPassword ? '숨기기' : '보기'}
                        </Button>
                      </div>
                    </FormControl>

                    <FormDescription>
                      길이 8자리, 대소문자, 숫자, 특수문자 필수
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>

                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="비밀번호를 다시 입력해주세요"
                          required
                          type={showConfirmPassword ? 'text' : 'password'}
                          {...field}
                        />

                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute top-1/2 right-2 -translate-y-1/2"
                        >
                          {showConfirmPassword ? '숨기기' : '보기'}
                        </Button>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="custom:company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>회사 이름</FormLabel>

                    <FormControl>
                      <Input
                        required
                        placeholder="회사 이름을 입력해주세요"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="custom:is_admin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>관리자 인가요?</FormLabel>

                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(checked === true)
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>전화번호</FormLabel>

                    <FormControl>
                      <Input
                        required
                        placeholder="전화번호를 입력해주세요"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                회원 가입 하기
              </Button>
            </form>
          </Form>

          {username && <SignUpOTP username={username} />}
        </CardContent>
      </Card>
    </div>
  );
}
