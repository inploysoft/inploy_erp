import { DateTime } from 'luxon';

import { Calendar, luxonLocalizer } from 'react-big-calendar';
import { events, messagesKo, resources } from './lib/constant';

const localizer = luxonLocalizer(DateTime);

export function CalendarPage() {
  return (
    <>
      <Calendar
        culture="ko"
        endAccessor="end"
        events={events}
        resources={resources}
        resourceIdAccessor="trainerId"
        resourceTitleAccessor="trainerName"
        localizer={localizer}
        messages={messagesKo}
        startAccessor="start"
      />
    </>
  );
}
