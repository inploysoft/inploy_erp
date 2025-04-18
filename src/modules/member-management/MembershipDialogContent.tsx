import { useCallback } from 'react';

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button/button';
import {
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreateMembership } from '@/modules/member-management/types/api';
import { useUserBootstrap } from '@/shared/hooks/useUserBootstrap';

const client = generateClient<Schema>();

// Duration-based membership schema
const durationFormSchema = z.object({
  displayName: z.string(),
  durationValue: z.number().min(1, {
    message: 'Duration value must be at least 1.',
  }),
  durationUnit: z.enum(['minute', 'hour', 'day', 'month']),
  price: z.number().min(0, {
    message: 'Price must be at least 0.',
  }),
});

// Count-based membership schema
const countFormSchema = z.object({
  displayName: z.string(),
  sessionCount: z.number().min(1, {
    message: 'Total session counts must be at least 1.',
  }),
  price: z.number().min(0, {
    message: 'Price must be at least 0.',
  }),
});

export function MembershipDialogContent() {
  const { memberManagementModule } = useUserBootstrap();

  // Form for duration-based membership
  const durationForm = useForm<z.infer<typeof durationFormSchema>>({
    resolver: zodResolver(durationFormSchema),
    defaultValues: {
      displayName: '',
      durationValue: 1,
      durationUnit: 'month',
      price: 0,
    },
  });

  // Form for count-based membership
  const countForm = useForm<z.infer<typeof countFormSchema>>({
    resolver: zodResolver(countFormSchema),
    defaultValues: {
      displayName: '',
      sessionCount: 1,
      price: 0,
    },
  });

  const onSubmitDuration = useCallback(
    async (values: z.infer<typeof durationFormSchema>) => {
      console.log('Duration form values:', values);

      const membership: CreateMembership = {
        registerType: 'duration',
        ...values,
        moduleInstanceId: memberManagementModule?.id ?? '',
      };

      const { data, errors } = await client.models.Membership.create(
        {
          ...membership,
        },
        {
          authMode: 'userPool',
        },
      );

      if (errors) {
        console.error(errors);
        return;
      }

      if (data) {
        console.log(data);
      }
    },
    [memberManagementModule],
  );

  const onSubmitCount = useCallback(
    async (values: z.infer<typeof countFormSchema>) => {
      console.log('Count form values:', values);

      const membership: CreateMembership = {
        registerType: 'count',
        ...values,
        moduleInstanceId: memberManagementModule?.id ?? '',
      };

      const { data, errors } = await client.models.Membership.create(
        {
          ...membership,
        },
        {
          authMode: 'userPool',
        },
      );

      if (errors) {
        console.error(errors);

        return;
      }

      if (data) {
        console.log(data);
      }
    },
    [memberManagementModule],
  );

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>이용권 등록</DialogTitle>

        <DialogDescription className="py-3">
          이용권 유형을 선택하고, 이용 기간 또는 사용 횟수를 입력해 주세요.
          <br />
          • 기간제 이용권: 설정한 기간 동안 이용 (예: 30일 이용권)
          <br />• 횟수제 이용권: 설정한 횟수만큼 이용 (예: 10회 이용권)
        </DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="duration-base" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="duration-base">기간제</TabsTrigger>

          <TabsTrigger value="count-base">횟수제</TabsTrigger>
        </TabsList>

        <TabsContent value="duration-base">
          <FormProvider {...durationForm}>
            <form
              onSubmit={durationForm.handleSubmit(onSubmitDuration)}
              className="space-y-8"
            >
              <div className="w-full space-y-6 pt-4">
                <FormField
                  control={durationForm.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>

                      <FormControl>
                        <Input placeholder="PT 이용권" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex w-full">
                  <div className="w-1/3 pr-[2%]">
                    <FormField
                      control={durationForm.control}
                      name="durationValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>기간</FormLabel>

                          <FormControl>
                            <Input
                              min={1}
                              placeholder="1"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-1/3 pr-[2%]">
                    <FormField
                      control={durationForm.control}
                      name="durationUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>단위</FormLabel>

                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>

                              <SelectContent>
                                <SelectItem value="minute">분</SelectItem>

                                <SelectItem value="hour">시간</SelectItem>

                                <SelectItem value="day">일</SelectItem>

                                <SelectItem value="month">개월</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-1/3">
                    <FormField
                      control={durationForm.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>가격</FormLabel>

                          <FormControl>
                            <Input
                              min={0}
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <Button type="submit">등록</Button>
            </form>
          </FormProvider>
        </TabsContent>

        <TabsContent value="count-base">
          <FormProvider {...countForm}>
            <form
              onSubmit={countForm.handleSubmit(onSubmitCount)}
              className="space-y-8"
            >
              <div className="w-full space-y-6 pt-4">
                <FormField
                  control={countForm.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>

                      <FormControl>
                        <Input placeholder="PT" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={countForm.control}
                  name="sessionCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>횟수</FormLabel>

                      <FormControl>
                        <Input
                          min={1}
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={countForm.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>가격</FormLabel>
                      <FormControl>
                        <Input
                          min={0}
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit">등록</Button>
            </form>
          </FormProvider>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
}
