"use client";

import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

export interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

type ContactErrors = Partial<Record<keyof ContactForm, string>>;

type ContactResponse =
  | {
      success: true;
    }
  | {
      success: false;
      error?: string;
    };

const emptyForm: ContactForm = {
  name: "",
  email: "",
  message: "",
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function subscribeToClientSnapshot() {
  return () => {};
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(form: ContactForm) {
  const errors: ContactErrors = {};

  if (!form.name.trim()) {
    errors.name = "Խնդրում ենք լրացնել անունը։";
  }

  if (!form.email.trim()) {
    errors.email = "Խնդրում ենք լրացնել էլ. հասցեն։";
  } else if (!isValidEmail(form.email.trim())) {
    errors.email = "Խնդրում ենք մուտքագրել վավեր էլ. հասցե։";
  }

  if (!form.message.trim()) {
    errors.message = "Խնդրում ենք գրել հաղորդագրությունը։";
  }

  return errors;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<Element | null>(null);
  const [form, setForm] = useState<ContactForm>(emptyForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const canUsePortal = useSyncExternalStore(
    subscribeToClientSnapshot,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    previousActiveElementRef.current = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.setTimeout(() => {
      const firstFocusable =
        modalRef.current?.querySelector<HTMLElement>(focusableSelector);
      firstFocusable?.focus();
    }, 0);

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);

      if (previousActiveElementRef.current instanceof HTMLElement) {
        previousActiveElementRef.current.focus();
      }
    };
  }, [onClose, open]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
    }));
    setStatusMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    setStatusMessage("");
    setIsSuccess(false);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      const data = (await response.json()) as ContactResponse;

      if (!response.ok || !data.success) {
        throw new Error(
          "error" in data && data.error
            ? data.error
            : "Չհաջողվեց ուղարկել հաղորդագրությունը։ Խնդրում ենք փորձել կրկին։",
        );
      }

      setForm(emptyForm);
      setIsSuccess(true);
      setStatusMessage("Շնորհակալություն։ Ձեր հաղորդագրությունն ուղարկվել է։");
    } catch (caughtError) {
      setIsSuccess(false);
      setStatusMessage(
        caughtError instanceof Error
          ? caughtError.message
          : "Չհաջողվեց ուղարկել հաղորդագրությունը։ Խնդրում ենք փորձել կրկին։",
      );
    } finally {
      setIsSending(false);
    }
  }

  function handleBackdropMouseDown(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  function handleModalKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = Array.from(
      modalRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
    ).filter((element) => element.offsetParent !== null);

    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  if (!canUsePortal) {
    return null;
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm transition-opacity duration-200 ${
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      onMouseDown={handleBackdropMouseDown}
      aria-hidden={!open}
      inert={!open}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        tabIndex={-1}
        onKeyDown={handleModalKeyDown}
        className={`max-h-[90vh] w-full max-w-[620px] overflow-y-auto rounded-[2rem] bg-white p-5 text-slate-950 shadow-2xl shadow-slate-950/30 outline-none transition duration-200 sm:p-7 ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="contact-modal-title"
              className="text-2xl font-bold leading-tight tracking-normal text-slate-950 sm:text-3xl"
            >
              Կապվել մեզ հետ
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Գրեք մեզ ձեր հարցը կամ առաջարկը, և մենք կկապվենք ձեզ հետ։
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-xl leading-none text-slate-500 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-cyan-100"
            aria-label="Փակել"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Անուն</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={isSending}
              className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base font-medium text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:bg-slate-100"
              autoComplete="name"
            />
            {errors.name ? (
              <span className="text-sm font-medium text-red-600">
                {errors.name}
              </span>
            ) : null}
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Էլ. հասցե
            </span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={isSending}
              className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base font-medium text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:bg-slate-100"
              autoComplete="email"
            />
            {errors.email ? (
              <span className="text-sm font-medium text-red-600">
                {errors.email}
              </span>
            ) : null}
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Հաղորդագրություն
            </span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              disabled={isSending}
              rows={5}
              className="min-h-32 resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-medium leading-7 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
            {errors.message ? (
              <span className="text-sm font-medium text-red-600">
                {errors.message}
              </span>
            ) : null}
          </label>

          {statusMessage ? (
            <div
              role="status"
              className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
                isSuccess
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {statusMessage}
            </div>
          ) : null}

          <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSending}
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Փակել
            </button>
            <button
              type="submit"
              disabled={isSending}
              className="inline-flex h-12 items-center justify-center gap-3 rounded-2xl bg-cyan-600 px-6 text-sm font-bold text-white shadow-lg shadow-cyan-200 transition hover:-translate-y-0.5 hover:bg-cyan-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:bg-cyan-400"
            >
              {isSending ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  <span>Ուղարկվում է...</span>
                </>
              ) : (
                "Ուղարկել"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
