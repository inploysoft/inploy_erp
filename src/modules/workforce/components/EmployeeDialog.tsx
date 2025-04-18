import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUserBootstrap } from '@/shared/hooks/useUserBootstrap';
import { formatKoreanPhoneToInternational } from '@/shared/lib/format';
import { EmployeeTableData } from '../types/api';
import {
  createTrainer,
  deleteTrainer,
  fetchTrainer,
  updateEmployee,
} from '../utils/api';
interface EmployeeDialogProps {
  employee: EmployeeTableData | null;
  handleCloseModal: () => void;
}

interface RankOption {
  label: string;
  value: string;
}

const rankOptions: RankOption[] = [
  { label: '관리자', value: 'admin' },
  { label: '트레이너', value: 'trainer' },
];

export const getRankLabel = (value: string) =>
  rankOptions.find((opt) => opt.value === value)?.label ?? value;

export const formSchema = z.object({
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
  const { fetchLoginUserQuery, workforceModule } = useUserBootstrap();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['employees', fetchLoginUserQuery.data?.companyId],
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  //
  useEffect(() => {
    if (!employee) {
      return;
    }

    form.reset({
      name: employee.name,
      rank: employee.rank ?? '',
      email: employee.email,
      phone: employee.phone,
      position: employee.position ?? '',
    });
  }, [employee, form]);

  //
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!employee) {
      return;
    }

    const formattedValues = {
      ...values,
      phone: formatKoreanPhoneToInternational(values.phone),
    };

    if (formattedValues.rank === 'trainer') {
      await createTrainer(employee?.sub, workforceModule, formattedValues);
    } else {
      const trainer = await fetchTrainer(employee?.sub);

      if (!trainer) {
        return;
      }

      await deleteTrainer(trainer.id);
    }

    mutation.mutate({
      id: employee.id,
      ...formattedValues,
    });

    handleCloseModal();
  }

  return (
    <>
      <Dialog open={!!employee} onOpenChange={handleCloseModal}>
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>{employee?.name}</DialogTitle>

            <DialogDescription />

            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                  name="rank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>직급</FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="직급" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {rankOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}

                          <SelectItem value="add-employee">
                            직급 추가하기
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
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

                      <FormMessage />
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
                        <Input
                          disabled={true}
                          placeholder="이메일"
                          {...field}
                        />
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

                <Button type="submit">저장</Button>
              </form>
            </FormProvider>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
