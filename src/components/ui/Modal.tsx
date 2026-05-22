"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/classnames";
import { Button } from "./Button";

type ModalProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
};

export function Modal({ open, title, children, onClose, className }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 px-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "kid-shadow w-full max-w-lg rounded-[2rem] border-4 border-white bg-white p-5",
          className,
        )}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-black text-slate-950">{title}</h2>
          <Button
            variant="ghost"
            onClick={onClose}
            aria-label="Fechar modal"
            className="size-11 min-h-0 rounded-2xl p-0"
          >
            <X aria-hidden="true" size={20} />
          </Button>
        </div>
        {children}
      </section>
    </div>
  );
}
