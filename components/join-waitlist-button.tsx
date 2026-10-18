"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const loadWaitlistModal = () => import("@/components/waitlist-modal");
const WaitlistModal = dynamic(() => loadWaitlistModal().then((mod) => mod.WaitlistModal));

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
      <button
        type="button"
        className={className}
        onClick={() => setOpen(true)}
        onPointerEnter={loadWaitlistModal}
        onFocus={loadWaitlistModal}
      >
        {children}
      </button>
      {open && <WaitlistModal onClose={() => setOpen(false)} />}
    </>
  );
}
