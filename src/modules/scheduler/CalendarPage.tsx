import { useCallback, useMemo, useState } from 'react';

import { DateTime } from 'luxon';
import { Calendar, luxonLocalizer, Views } from 'react-big-calendar';

import { events, messagesKo, resources } from './lib/constant';

const localizer = luxonLocalizer(DateTime);

export function CalendarPage() {
  const [myEvents, setEvents] = useState(events);

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

  return (
    <>
      <Calendar
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
      />
    </>
  );
}
