"use client";

import { useState } from "react";
import { WaitlistModal } from "@/components/waitlist-modal";

type JoinWaitlistButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

export function JoinWaitlistButton({
  className,
  children = "Join waitlist",
}: JoinWaitlistButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
      <WaitlistModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
