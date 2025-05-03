export interface CalendarEvent {
  id: number;
  resourceId?: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  desc?: string;
}

export interface CalendarResource {
  trainerId: number;
  trainerName: string;
}
