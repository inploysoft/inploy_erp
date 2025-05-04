import { Dispatch, SetStateAction, useCallback } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EventAddDialog } from '../lib/types';

interface EventDialogProps {
  eventAddDialogState: EventAddDialog;
  setEventAddDialogState: Dispatch<SetStateAction<EventAddDialog>>;
}

export function EventDialog({
  eventAddDialogState,
  setEventAddDialogState,
}: EventDialogProps) {
  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        setEventAddDialogState({
          isDialogOpened: isOpen,
          slotInfo: null,
        });
      }
    },
    [setEventAddDialogState],
  );

  return (
    <Dialog
      open={eventAddDialogState.isDialogOpened}
      onOpenChange={handleOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>일정 등록</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
