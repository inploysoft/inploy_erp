import { useCallback, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { H4 } from '@/theme/Typography';
import { fetchModules } from './api';
import { Module } from '@/shared/models/module';
import { Button } from '@/components/ui/button/button';

interface PurchaseModules {
  setPurchaseComponent: React.Dispatch<React.SetStateAction<boolean>>;
  setPurchasedList: React.Dispatch<React.SetStateAction<Module[]>>;
}

export function PurchaseModules({
  setPurchaseComponent,
  setPurchasedList,
}: PurchaseModules) {
  const { data } = useQuery({
    queryKey: ['modules'],
    queryFn: async () => await fetchModules(),
  });

  const [selectedList, setSelectedList] = useState<Module[]>([]);

  const handleSelect = useCallback((module: Module) => {
    setSelectedList((prev) => {
      const isSelected = prev.some((m) => m.id === module.id);

      if (isSelected) {
        return prev.filter((m) => m.id !== module.id);
      }

      return [...prev, module];
    });
  }, []);

  const handlePurchaseModules = useCallback(() => {
    setPurchaseComponent(false);
    setPurchasedList(selectedList);
  }, [selectedList, setPurchaseComponent, setPurchasedList]);

  return (
    <>
      <H4>모듈 구매하기</H4>

      <div className="flex gap-3">
        {data?.map((module) => {
          const isSelected = selectedList.some(
            (value) => value.id === module.id,
          );

          return (
            <Card
              key={module.id}
              onClick={() => handleSelect(module)}
              className={`w-full cursor-pointer transition duration-150 ease-in-out hover:shadow-md active:scale-95 active:shadow-sm ${isSelected ? 'bg-indigo-50 ring-2 ring-indigo-500' : 'bg-white'} `}
            >
              <CardHeader>
                <CardTitle>{module.displayName}</CardTitle>

                {/* <CardDescription>Card Description</CardDescription> */}

                {/* <CardAction>
                  <Badge className="p-2 text-sm">구매 하기</Badge>
                </CardAction> */}
              </CardHeader>

              {/* <CardContent>
              <p>Card Content</p>
            </CardContent>
  
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter> */}
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Button onClick={handlePurchaseModules} className="w-46">
          구매하기
        </Button>
      </div>
    </>
  );
}
