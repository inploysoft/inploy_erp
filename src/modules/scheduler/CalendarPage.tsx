import { useCallback, useMemo, useState } from 'react';

import { DateTime } from 'luxon';
import { Calendar, luxonLocalizer, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import { eventMockData, messagesKo, resources } from './lib/constant';

const localizer = luxonLocalizer(DateTime);

const DraggableCalendar = withDragAndDrop(Calendar);

export function CalendarPage() {
  const [events, setEvents] = useState(eventMockData);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
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
    (event) => console.log(event.title),
    [],
  );

  const { min, messages, max, scrollToTime } = useMemo(
    () => ({
      max: DateTime.local(1970, 1, 1, 23, 59, 59).toJSDate(),
      messages: messagesKo,
      min: DateTime.local(1970, 1, 1, 6, 0, 0).toJSDate(),
      scrollToTime: DateTime.local(1970, 1, 1, 6).toJSDate(),
    }),
    [],
  );

  // Drag and Drop
  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }
      if (allDay && !droppedOnAllDaySlot) {
        event.allDay = false;
      }

      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};

        const filtered = prev.filter((ev) => ev.id !== event.id);

        return [
          ...filtered,
          {
            ...existing,
            start,
            end,
            allDay: event.allDay,
          },
        ];
      });
    },
    [setEvents],
  );

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setEvents],
  );

  return (
    <>
      <DraggableCalendar
        // misc
        culture="ko"
        defaultView={Views.DAY}
        endAccessor={(event) => event.end}
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
        draggableAccessor={(event) => true}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        popup
        resizable
      />
    </>
  );
}
