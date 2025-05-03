import { useCallback, useMemo, useState } from 'react';

import { DateTime } from 'luxon';
import { Calendar, luxonLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import { events, messagesKo } from './lib/constant';

const localizer = luxonLocalizer(DateTime);

const DnDCalendar = withDragAndDrop(Calendar);

export function CalendarPage() {
  const [myEvents, setEvents] = useState(events);
  const [dndEvents, setDnDEvents] = useState(events);

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

      setDnDEvents((prev) => {
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
    [setDnDEvents],
  );

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setDnDEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setDnDEvents],
  );

  return (
    <>
      {/* <Calendar
        // misc
        culture="ko"
        defaultView={Views.DAY}
        endAccessor="end"
        events={myEvents}
        localizer={localizer}
        messages={messages}
        startAccessor="start"
        // selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        min={min}
        max={max}
        scrollToTime={scrollToTime}
        // customizable resource
        resources={resources}
        resourceIdAccessor="trainerId"
        resourceTitleAccessor="trainerName"
      /> */}

      <DnDCalendar
        localizer={localizer}
        events={dndEvents}
        draggableAccessor={(event) => true}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        popup
        resizable
      />
    </>
  );
}
