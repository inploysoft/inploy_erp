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
    (event) => window.alert(event.title),
    [],
  );

  const { scrollToTime, messages } = useMemo(
    () => ({
      scrollToTime: new Date(1970, 1, 1, 6),
      messages: messagesKo,
    }),
    [],
  );

  return (
    <>
      <Calendar
        culture="ko"
        defaultView={Views.WEEK}
        endAccessor="end"
        events={myEvents}
        //
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={scrollToTime}
        //
        resources={resources}
        resourceIdAccessor="trainerId"
        resourceTitleAccessor="trainerName"
        localizer={localizer}
        messages={messages}
        startAccessor="start"
      />
    </>
  );
}
