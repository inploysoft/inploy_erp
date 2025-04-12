import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet/sheet';
import { MemberTableData } from './types/views';

interface MemberDetailSheetProps {
  member: MemberTableData;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function MemberDetailSheet({
  member,
  open,
  setOpen,
}: MemberDetailSheetProps) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full max-w-none sm:w-[50vw]">
        <SheetHeader>
          <SheetTitle>{member.name}</SheetTitle>

          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
