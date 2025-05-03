import { DateTime } from 'luxon';

import { Calendar, luxonLocalizer } from 'react-big-calendar';

const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 7 });

export function CalendarPage() {
  return (
    <>
      <h1>CalendarPage</h1>

      <Calendar localizer={localizer} startAccessor="start" endAccessor="end" />
    </>
  );
}
