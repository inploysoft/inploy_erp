import { useCallback, useMemo, useState } from 'react';

import { DateTime } from 'luxon';
import {
  Calendar,
  Formats,
  luxonLocalizer,
  SlotInfo,
  Views,
} from 'react-big-calendar';
import withDragAndDrop, {
  EventInteractionArgs,
} from 'react-big-calendar/lib/addons/dragAndDrop';

import { localeToKorea } from '@/shared/lib/format';
import { SchedularToolbar } from './components/SchedularToolbar';
import { eventMockData, koreanMessages, resources } from './lib/constant';
import { CalendarEvent, CalendarResource } from './lib/types';

const localizer = luxonLocalizer(DateTime);

const DraggableCalendar = withDragAndDrop<CalendarEvent, CalendarResource>(
  Calendar,
);

export function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>(eventMockData);

  const handleSelectSlot = useCallback(
    ({ start, end }: SlotInfo) => {
      const title = window.prompt('New Event name');

      if (title) {
        setEvents((prev) => [
          ...prev,
          {
            id: 224,
            resourceId: 1,
            title: title,
            start: start,
            end: end,
          },
        ]);
      }
    },
    [setEvents],
  );

  const handleSelectEvent = useCallback(
    (event: CalendarEvent) => console.log(event),
    [],
  );

  const { min, messages, max, scrollToTime } = useMemo(
    () => ({
      max: DateTime.local(1970, 1, 1, 23, 59, 59).toJSDate(),
      messages: koreanMessages,
      min: DateTime.local(1970, 1, 1, 6, 0, 0).toJSDate(),
      scrollToTime: DateTime.local(1970, 1, 1, 6).toJSDate(),
    }),
    [],
  );

  const formats: Formats = useMemo(() => {
    return {
      dayHeaderFormat: (date: Date) =>
        localeToKorea(DateTime.fromJSDate(date)).toFormat('M월 d일 cccc'),

      dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) => {
        const startFormatted = DateTime.fromJSDate(start).toFormat('M월 d일');

        const endFormatted = DateTime.fromJSDate(end).toFormat('M월 d일');

        return `${startFormatted} - ${endFormatted}`;
      },

      monthHeaderFormat: (date: Date) =>
        localeToKorea(DateTime.fromJSDate(date)).toFormat('yyyy년 M월'),
    };
  }, []);

  // Drag and Drop
  const moveEvent = useCallback(
    ({
      event,
      start,
      end,
      // isAllDay: droppedOnAllDaySlot = false,
    }: EventInteractionArgs<CalendarEvent>) => {
      // const { allDay } = event;
      // if (!allDay && droppedOnAllDaySlot) {
      //   event.allDay = true;
      // }
      // if (allDay && !droppedOnAllDaySlot) {
      //   event.allDay = false;
      // }

      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id);

        if (!existing) {
          return prev;
        }

        const filtered = prev.filter((ev) => ev.id !== event.id);

        return [
          ...filtered,
          {
            ...existing,
            start: start as Date,
            end: end as Date,
          },
        ];
      });
    },
    [setEvents],
  );

  const resizeEvent = useCallback(
    ({ event, start, end }: EventInteractionArgs<CalendarEvent>) => {
      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id);

        if (!existing) {
          return prev;
        }

        const filtered = prev.filter((ev) => ev.id !== event.id);

        return [
          ...filtered,
          {
            ...existing,
            start: start as Date,
            end: end as Date,
          },
        ];
      });
    },
    [setEvents],
  );

  return (
    <>
      <DraggableCalendar
        // misc
        culture="ko"
        components={{
          toolbar: SchedularToolbar,
        }}
        defaultView={Views.DAY}
        endAccessor={(event) => event.end}
        formats={formats}
        events={events}
        localizer={localizer}
        messages={messages}
        startAccessor={(event) => event.start}
        // customizable resource
        resources={resources}
        resourceIdAccessor={(resource) => resource.trainerId}
        resourceTitleAccessor={(resource) => resource.trainerName}
        // selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        min={min}
        max={max}
        scrollToTime={scrollToTime}
        // draggable
        draggableAccessor={() => true}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        popup
        resizable
      />
    </>
  );
}
