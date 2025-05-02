import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/shared/lib/utils';
import { Button } from '../../components/ui/button/button';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
  company: z.string(),
  isAdmin: z.boolean(),
  phone: z.string(),
});

export function SignUpPage() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      company: '',
      isAdmin: false,
      phone: '',
    },
  });

  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
                name="email"
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
                      <Input
                        type="password"
                        required
                        placeholder="비밀번호를 입력해주세요"
                        {...field}
                      />
                    </FormControl>

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
                      <Input
                        type="password"
                        required
                        placeholder="비밀번호를 다시 입력해주세요"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
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
                name="isAdmin"
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
                name="phone"
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
        </CardContent>
      </Card>
    </div>
  );
}
