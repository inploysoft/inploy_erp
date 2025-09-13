import { useCallback, useEffect, useState } from 'react';

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

export function UserDashboard() {
  const [purchaseComponent, setPurchaseComponent] = useState(false);

  useEffect(() => {
    console.log(purchaseComponent);
  }, [purchaseComponent]);

  const onClickPurchase = useCallback(() => {
    console.log('he');
    setPurchaseComponent(true);
  }, []);

  return (
    <>
      <H2>대시보드</H2>

      {purchaseComponent ? (
        <PurchaseModules />
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
