import { useCallback } from 'react';

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
import { useUserBootstrap } from '@/shared/hooks/useUserBootstrap';
import { createMembershipPlan, createMembershipType } from '../utils/api';

export const membershipRegistrationFormSchema = z.object({
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
  const { memberManagementModule } = useUserBootstrap();

  //
  const membershipRegistrationForm = useForm<
    z.infer<typeof membershipRegistrationFormSchema>
  >({
    resolver: zodResolver(membershipRegistrationFormSchema),
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof membershipRegistrationFormSchema>) => {
      if (!memberManagementModule) {
        return;
      }

      const { displayName, description, ...rest } = values;

      const membershipType = await createMembershipType(
        memberManagementModule.id,
        displayName,
        description,
      );

      if (!membershipType) {
        return;
      }

      await createMembershipPlan(
        memberManagementModule.id,
        membershipType?.id,
        rest,
      );
    },
    [memberManagementModule],
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
      </DialogContent>
    </Dialog>
  );
}
