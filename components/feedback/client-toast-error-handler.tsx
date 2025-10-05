"use client";
import { useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export default function ClientToastErrorHandler({ error, children }: { error: string | null, children: ReactNode }) {
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, []);

  return children
}
