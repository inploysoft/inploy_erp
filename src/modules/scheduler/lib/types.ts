import { Nullable } from '@/shared/types/types';
import { SlotInfo } from 'react-big-calendar';

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

export interface EventAddDialog {
  isDialogOpened: boolean;
  slotInfo: Nullable<SlotInfo>;
}
