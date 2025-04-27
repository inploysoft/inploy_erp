import { ReactElement } from 'react';

import {
  Hourglass,
  TrendingUpIcon,
  UserPlus2,
  Users2,
  UserX2,
} from 'lucide-react';

import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { H4 } from '@/theme/Typography';

interface SectionCardData {
  icon: ReactElement;
  title: string;
  count: number;
  description: string;
}

const data: SectionCardData[] = [
  {
    icon: <Users2 />,
    title: '총 등록 회원 수',
    count: 10,
    description: '30일 이내',
  },
  {
    icon: <Hourglass />,
    title: '만료 예정 회원 수',
    count: 3,
    description: '30일 이내',
  },
  {
    icon: <UserX2 />,
    title: '최근 만료 회원 수',
    count: 10,
    description: '30일 이내',
  },
  {
    icon: <UserPlus2 />,
    title: '최근 등록 회원 수',
    count: 10,
    description: '30일 이내',
  },
];

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {data.map((value, index) => (
        <Card key={index} className="@container/card h-full justify-between">
          <CardHeader className="flex w-full items-center justify-between">
            {value.icon}

            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {value.count}
            </CardTitle>
          </CardHeader>

          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="flex items-center gap-2">
              <H4>{value.title}</H4>

              <TrendingUpIcon className="size-5" />
            </div>

            <div className="text-muted-foreground">{value.description}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
