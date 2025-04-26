import { useCallback } from 'react';

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../amplify/data/resource';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
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
import { Textarea } from '@/components/ui/textarea';

const client = generateClient<Schema>();

const membershipRegistrationFormSchema = z.object({
  displayName: z.string(),
  description: z.string().optional(),
  //
  durationValue: z.number(),
  durationUnit: z.union([
    z.literal('none'),
    z.literal('minute'),
    z.literal('hour'),
    z.literal('day'),
    z.literal('month'),
  ]),
  sessionCount: z.number().optional(),
  price: z.number(),
});

export function MembershipRegistrationDialog() {
  // const { memberManagementModule } = useUserBootstrap();

  //
  const membershipRegistrationForm = useForm<
    z.infer<typeof membershipRegistrationFormSchema>
  >({
    resolver: zodResolver(membershipRegistrationFormSchema),
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof membershipRegistrationFormSchema>) => {
      console.log('Duration form values:', values);

      // const membership: CreateMembership = {
      //   registerType: 'duration',
      //   ...values,
      //   moduleInstanceId: memberManagementModule?.id ?? '',
      // };

      // const { data, errors } = await client.models.Membership.create(
      //   {
      //     ...membership,
      //   },
      //   {
      //     authMode: 'userPool',
      //   },
      // );

      // if (errors) {
      //   console.error(errors);
      //   return;
      // }

      // if (data) {
      //   console.log(data);
      // }
    },
    [],
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>이용권 등록</Button>
      </DialogTrigger>

      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>이용권 등록</DialogTitle>

          {/* <DialogDescription /> */}
        </DialogHeader>

        <Form {...membershipRegistrationForm}>
          <form
            onSubmit={membershipRegistrationForm.handleSubmit(
              onSubmit,
              (errors) => {
                console.error('폼 에러:', errors);
              },
            )}
          >
            <div className="w-full space-y-6">
              <FormField
                control={membershipRegistrationForm.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    {/* <FormDescription /> */}
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />

              <FormField
                control={membershipRegistrationForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>설명</FormLabel>

                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex w-full space-x-4">
                <FormField
                  control={membershipRegistrationForm.control}
                  name="durationValue"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>기간</FormLabel>

                      <FormControl>
                        <Input
                          {...field}
                          // override
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={membershipRegistrationForm.control}
                  name="durationUnit"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>단위</FormLabel>

                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="없음" />
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

                <FormField
                  control={membershipRegistrationForm.control}
                  name="sessionCount"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>횟수</FormLabel>

                      <FormControl>
                        <Input
                          {...field}
                          // override
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={membershipRegistrationForm.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>가격</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        // override
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit">등록</Button>
              </div>
            </div>
          </form>
        </Form>

        {/* <Tabs defaultValue="duration-base" className="w-[400px]">
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
        </Tabs> */}
      </DialogContent>
    </Dialog>
  );
}
