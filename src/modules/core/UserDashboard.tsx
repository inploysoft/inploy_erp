import { useCallback, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { PurchaseModules } from './PurchaseModules';
import { H2 } from '@/theme/Typography';
import { Module } from '@/shared/models/module';
import { createPurchasedModules } from './api';
import { useUserBootstrap } from '@/shared/hooks/useUserBootstrap';

export function UserDashboard() {
  const [purchaseComponent, setPurchaseComponent] = useState(false);
  const [purchasedList, setpurchasedList] = useState<Module[]>([]);

  const { fetchLoginUserQuery } = useUserBootstrap();

  const { data } = useQuery({
    queryKey: [
      'createPurchasedModules',
      purchasedList,
      fetchLoginUserQuery.data,
    ],
    queryFn: async () =>
      await createPurchasedModules(purchasedList, fetchLoginUserQuery.data),
  });

  const onClickPurchase = useCallback(() => {
    setPurchaseComponent(true);
  }, []);

  return (
    <>
      <H2>대시보드</H2>

      {purchaseComponent ? (
        <PurchaseModules
          setPurchaseComponent={setPurchaseComponent}
          setPurchasedList={setpurchasedList}
        />
      ) : (
        <Card
          onClick={onClickPurchase}
          className="cursor-pointer transition duration-150 ease-in-out hover:shadow-md active:scale-95 active:shadow-sm"
        >
          <CardHeader>
            <CardTitle>모듈 구매</CardTitle>

            <CardDescription>Card Description</CardDescription>

            <CardAction>Card Action</CardAction>
          </CardHeader>

          <CardContent>
            <p>Card Content</p>
          </CardContent>

          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
