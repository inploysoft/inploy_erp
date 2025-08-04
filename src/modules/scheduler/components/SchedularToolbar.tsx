import { useCallback } from 'react';

import { NavigateAction, ToolbarProps, View } from 'react-big-calendar';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarEvent, CalendarResource } from '../lib/types';

export function SchedularToolbar({
  label,
  onNavigate,
  onView,
  view,
}: ToolbarProps<CalendarEvent, CalendarResource>) {
  const handleViewChange = useCallback(
    (val: string) => {
      onView(val as View);
    },
    [onView],
  );

  const handleNavigateChange = useCallback(
    (val: string) => {
      onNavigate(val as NavigateAction);
    },
    [onNavigate],
  );

  return (
    <div className="border- flex flex-col items-center justify-between gap-4 p-4 md:flex-row">
      <Tabs defaultValue="today" onValueChange={handleNavigateChange}>
        <TabsList>
          <TabsTrigger onClick={() => onNavigate('PREV')} value="prev">
            이전
          </TabsTrigger>

          <TabsTrigger onClick={() => onNavigate('TODAY')} value="today">
            오늘
          </TabsTrigger>

          <TabsTrigger onClick={() => onNavigate('NEXT')} value="next">
            다음
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="text-lg font-semibold">{label}</div>

      <Tabs value={view} onValueChange={handleViewChange}>
        <TabsList>
          <TabsTrigger value="day">일간</TabsTrigger>

          <TabsTrigger value="week">주간</TabsTrigger>

          <TabsTrigger value="month">월간</TabsTrigger>

          <TabsTrigger value="agenda">일정</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
