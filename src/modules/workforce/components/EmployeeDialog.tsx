import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EmployeeTableData } from '@/modules/member-management/types/views';

interface EmployeeDialogProps {
  employee: EmployeeTableData | null;
  handleCloseModal: (open: boolean) => void;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: '이름은 필수 입력 사항입니다.',
  }),
  email: z.string().email({
    message: '이메일 주소가 올바르지 않습니다.',
  }),
  phone: z.string().min(1, {
    message: '전화번호는 필수 입력 사항입니다.',
  }),
  rank: z.string().min(1, {
    message: '직급은 필수 입력 사항입니다.',
  }),
  position: z.string().min(1, {
    message: '직책은 필수 입력 사항입니다.',
  }),
});

export function EmployeeDialog({
  employee,
  handleCloseModal,
}: EmployeeDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: employee?.name ?? '',
      rank: employee?.rank ?? '',
      position: employee?.position ?? '',
      email: employee?.email,
      phone: employee?.phone,
    },
  });

  useEffect(() => {
    if (!employee) {
      return;
    }

    form.reset({
      name: employee.name,
      rank: employee.rank ?? '',
      position: employee.position ?? '',
      email: employee.email,
      phone: employee.phone,
    });
  }, [employee, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Dialog open={!!employee} onOpenChange={handleCloseModal}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{employee?.name}</DialogTitle>

          <DialogDescription />

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>

                    <FormControl>
                      <Input placeholder="이름" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>

                    <FormControl>
                      <Input placeholder="이메일" {...field} />
                    </FormControl>
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
                      <Input placeholder="전화번호" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>직급</FormLabel>

                    <FormControl>
                      <Input placeholder="직급" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>직책</FormLabel>

                    <FormControl>
                      <Input placeholder="직책" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit">저장</Button>
            </form>
          </FormProvider>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
