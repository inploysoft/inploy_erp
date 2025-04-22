import { DragEvent, useState } from 'react';

import { CheckCircle2, FileSpreadsheet } from 'lucide-react';

import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { cn } from '@/shared/lib/utils';
import { Button } from '../../../components/ui/button/button';

interface ManualDropzoneProps {
  onDrop: (files: File[]) => void;
  className?: string;
}

export function FileDropzoneDialog({ onDrop, className }: ManualDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [_isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const processFiles = async (files: File[]) => {
    const file = files[0];

    setFile(file);

    setIsComplete(false);

    setIsLoading(true);

    try {
      onDrop(files);

      setIsComplete(true);
    } catch (err) {
      console.error('파일 업로드 실패', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setFile(null);
    }
  };

  //
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);

    processFiles(files);

    onDrop(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIsDragging(false);

      const files = Array.from(e.target.files);

      processFiles(files);

      onDrop(files);
    }
  };

  return (
    <>
      <Dialog onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button>엑셀 가져오기</Button>
        </DialogTrigger>

        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>엑셀 업로드</DialogTitle>

            <DialogDescription>
              최대 5MB 이하 xls, xlsx 를 지원해요
            </DialogDescription>

            <Card
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                'my-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-15 transition-all',
                isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-muted',
                className,
              )}
              onClick={() =>
                document.getElementById('manual-file-input')?.click()
              }
            >
              {file && isComplete ? (
                <div className="flex flex-col items-center">
                  <CheckCircle2 className="h-8 w-8 text-green-700" />

                  <p className="text-md mt-4 font-medium text-green-700">
                    {file?.name ?? '업로드 실패'}
                  </p>
                </div>
              ) : (
                <>
                  <input
                    id="manual-file-input"
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                  />

                  <FileSpreadsheet className="text-muted-foreground h-20 w-20" />

                  <Label className="text-muted-foreground text-center text-sm">
                    {isDragging
                      ? '여기에 파일을 놓아주세요'
                      : '클릭하거나 파일을 끌어오세요'}
                  </Label>
                </>
              )}
            </Card>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
