"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
type WaitlistModalProps = {
  open: boolean;
  onClose: () => void;
};

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  honeypot: string;
};

const initialFormState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  honeypot: "",
};

type LeadApiResponse = {
  success?: boolean;
  message?: string;
  errors?: string[];
};

const labelClass =
  "block text-left text-[14px] font-normal leading-[100%] text-[#7C7C7C] md:text-[15px] lg:text-[18px]";
const inputClass =
  "waitlist-input h-[48px] w-full rounded-[12px] bg-[#F5F5F5] px-4 text-[16px] font-semibold leading-[100%] text-[#05120A] outline-none placeholder:font-normal placeholder:text-[#A6A8AE] focus:ring-2 focus:ring-[#1E90FF]/30 md:h-[52px] md:text-[17px] lg:h-[65px] lg:text-[21px]";

export function WaitlistModal({ open, onClose }: WaitlistModalProps) {
  const titleId = useId();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetForm = useCallback(() => {
    setForm(initialFormState);
    setErrors([]);
    setIsSubmitting(false);
    setIsSuccess(false);
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    resetForm();
  }, [onClose, resetForm]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyLeft = body.style.left;
    const previousBodyRight = body.style.right;
    const previousBodyWidth = body.style.width;

    html.classList.add("waitlist-modal-open");
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      html.classList.remove("waitlist-modal-open");
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.left = previousBodyLeft;
      body.style.right = previousBodyRight;
      body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, handleClose]);

  if (!open) {
    return null;
  }

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setErrors([]);
    setIsSubmitting(true);

    try {
      const payload: Record<string, string> = {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        country: form.country.trim(),
      };

      if (form.phone.trim()) {
        payload.phone = form.phone.trim();
      }

      if (form.city.trim()) {
        payload.city = form.city.trim();
      }

      if (form.honeypot) {
        payload._honeypot = form.honeypot;
      }

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: LeadApiResponse = {};
      try {
        data = (await response.json()) as LeadApiResponse;
      } catch {
        data = {};
      }

      if (response.status === 429) {
        setErrors([data.message ?? "Too many submissions. Please try again later."]);
        return;
      }

      if (response.status === 400) {
        setErrors(
          Array.isArray(data.errors) && data.errors.length > 0
            ? data.errors
            : [data.message ?? "Invalid input"],
        );
        return;
      }

      // 201 new lead; 200 duplicate email or honeypot fake success
      if (response.ok) {
        setIsSuccess(true);
        setForm(initialFormState);
        return;
      }

      setErrors([data.message ?? "Something went wrong. Please try again."]);

    } catch {
      setErrors(["Something went wrong. Please try again."]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain">
      <button
        type="button"
        aria-label="Close waitlist form"
        className="fixed inset-0 bg-[#07070780]"
        onClick={handleClose}
      />

      <div className="relative z-10 flex min-h-full justify-center px-4 py-6 pointer-events-none lg:py-8">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="pointer-events-auto w-full max-w-[420px] self-center rounded-[20px] bg-white px-5 py-6 shadow-[0_24px_60px_rgba(15,15,16,0.18)] sm:px-6 md:w-[540px] md:max-w-[540px] md:px-6 md:py-6 lg:w-[600px] lg:max-w-[600px] lg:rounded-[24px] lg:px-8 lg:py-8"
        >
        {!isSuccess && (
          <div className="flex flex-col items-center text-center">
            <Image
              src="/asset/mavscan-full-black%201.svg"
              alt="Mavscan"
              width={120}
              height={120}
              priority
              className="h-16 w-auto md:h-20 lg:h-[120px]"
            />
            <h2
              id={titleId}
              className="mt-3 text-[20px] font-medium leading-[100%] text-[#05120A] md:text-[24px] lg:mt-[12px] lg:text-[32px]"
            >
              Get Early Access
            </h2>
          </div>
        )}

        {isSuccess ? (
          <div
            className="waitlist-success-enter flex flex-col items-center px-2 py-4 text-center md:px-4 md:py-6"
            role="status"
            aria-live="polite"
          >
            <div
              className="waitlist-success-check flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#4ADE80] md:h-20 md:w-20"
              aria-hidden="true"
            >
              <svg
                className="h-9 w-9 text-white md:h-10 md:w-10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2
              id={titleId}
              className="mt-6 text-[20px] font-semibold leading-[120%] text-[#05120A] md:text-[24px] lg:text-[28px]"
            >
              You&apos;re on the list!
            </h2>
            <p className="mt-2 max-w-[320px] text-[14px] leading-[150%] text-[#7C7C7C] md:text-[16px]">
              Thanks for your interest. We will be sending out further communications soon.
            </p>

            <button
              type="button"
              className="mt-8 flex h-[48px] w-full items-center justify-center rounded-[12px] bg-[#008AFF] text-[16px] font-semibold text-white transition hover:bg-[#0078E6] md:mt-10 lg:h-[60px] lg:text-[18px]"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        ) : (
          <form className="mt-6 space-y-5 text-left md:mt-7 md:space-y-5 lg:mt-[32px] lg:space-y-[30px]" onSubmit={handleSubmit}>
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                name="_honeypot"
                value={form.honeypot}
                onChange={(event) => updateField("honeypot", event.target.value)}
              />
            </div>

            <div className="space-y-1.5 md:space-y-2 lg:space-y-[6px]">
              <label htmlFor="waitlist-full-name" className={labelClass}>
                Full Name
              </label>
              <input
                id="waitlist-full-name"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                placeholder="John Wick"
                className={inputClass}
                value={form.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
              />
            </div>

            <div className="space-y-1.5 md:space-y-2 lg:space-y-[6px]">
              <label htmlFor="waitlist-email" className={labelClass}>
                Your email
              </label>
              <input
                id="waitlist-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className={inputClass}
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
              />
            </div>

            <div className="space-y-1.5 md:space-y-2 lg:space-y-[6px]">
              <label htmlFor="waitlist-phone" className={labelClass}>
                Phone number (optional)
              </label>
              <input
                id="waitlist-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="+2348012345678"
                title="Use international format, e.g. +2348012345678"
                className={inputClass}
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
              />
              <p className="text-[12px] leading-[130%] text-[#A6A8AE] md:text-[13px]">
                Include country code (E.164), e.g. +2348012345678
              </p>
            </div>

            <div className="space-y-1.5 md:space-y-2 lg:space-y-[6px]">
              <label htmlFor="waitlist-country" className={labelClass}>
                Country
              </label>
              <input
                id="waitlist-country"
                name="country"
                type="text"
                autoComplete="country-name"
                required
                placeholder="e.g Nigeria"
                className={inputClass}
                value={form.country}
                onChange={(event) => updateField("country", event.target.value)}
              />
            </div>

            <div className="space-y-1.5 md:space-y-2 lg:space-y-[6px]">
              <label htmlFor="waitlist-city" className={labelClass}>
                City (optional)
              </label>
              <input
                id="waitlist-city"
                name="city"
                type="text"
                autoComplete="address-level2"
                placeholder="e.g Nigeria"
                className={inputClass}
                value={form.city}
                onChange={(event) => updateField("city", event.target.value)}
              />
            </div>

            {errors.length > 0 && (
              <ul className="space-y-1 rounded-[12px] bg-[#FEE2E2] px-4 py-3 text-left text-[13px] text-[#B91C1C]">
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="mt-8 flex h-[48px] w-full items-center justify-center gap-3 rounded-[12px] bg-[#008AFF] text-[16px] font-semibold leading-[100%] text-white transition hover:bg-[#008AFF] disabled:cursor-not-allowed disabled:opacity-60 md:mt-9 md:h-[52px] lg:mt-[53px] lg:h-[60px] lg:text-[18px]"
            >
              {isSubmitting && (
                <svg
                  className="h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
        </div>
      </div>
    </div>
  );
}
