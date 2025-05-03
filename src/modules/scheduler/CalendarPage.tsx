import { DateTime } from 'luxon';

import { Calendar, luxonLocalizer } from 'react-big-calendar';
import { events, messagesKo } from './lib/constant';

const localizer = luxonLocalizer(DateTime);

export function CalendarPage() {
  return (
    <>
      <Calendar
        culture="ko"
        endAccessor="end"
        events={events}
        localizer={localizer}
        messages={messagesKo}
        startAccessor="start"
      />
    </>
  );
}
