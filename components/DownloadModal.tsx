"use client";

import { trackEvent } from "@/lib/analytics";
import {
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

export interface DownloadItem {
  type: string;
  withAnswers: boolean;
  label: string;
  description: string;
  url: string;
}

interface DownloadModalProps {
  open: boolean;
  title?: string;
  downloads: DownloadItem[];
  onClose: () => void;
  onGenerateAnother: () => void;
}

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

function getDownloadIcon(type: string) {
  const normalizedType = type.toLowerCase();

  if (normalizedType.includes("pdf")) {
    return "📄";
  }

  if (normalizedType.includes("doc")) {
    return "📝";
  }

  return "📁";
}

export default function DownloadModal({
  open,
  title = "✅ Թեստը հաջողությամբ ստեղծվեց",
  downloads,
  onClose,
  onGenerateAnother,
}: DownloadModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<Element | null>(null);
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
        aria-labelledby="download-modal-title"
        tabIndex={-1}
        onKeyDown={handleModalKeyDown}
        className={`max-h-[90vh] w-full max-w-[700px] overflow-y-auto rounded-[2rem] bg-white p-5 text-slate-950 shadow-2xl shadow-slate-950/30 outline-none transition duration-200 sm:p-7 ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="download-modal-title"
              className="text-2xl font-bold leading-tight tracking-normal text-slate-950 sm:text-3xl"
            >
              {title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Կարող եք ներբեռնել անհրաժեշտ տարբերակը.
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

        <div className="mt-6 grid gap-4">
          {downloads.map((download) => (
            <article
              key={`${download.type}-${download.url}`}
              className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 transition hover:border-cyan-200 hover:bg-cyan-50/40 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm ring-1 ring-slate-200">
                {getDownloadIcon(download.type)}
              </div>

              <div className="min-w-0">
                <h3 className="text-base font-bold text-slate-950">
                  {download.label}
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {download.description}
                </p>
              </div>

              <a
                href={download.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-cyan-600 px-5 text-sm font-bold text-white shadow-lg shadow-cyan-200 transition hover:-translate-y-0.5 hover:bg-cyan-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-100"
                onClick={() => {
                  trackEvent("download_clicked", {
                    source: "download_modal",
                    file_type: download.type,
                    with_answers: download.withAnswers,
                    label: download.label,
                  });
                }}
              >
                Ներբեռնել
              </a>
            </article>
          ))}
        </div>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-slate-100"
          >
            Փակել
          </button>
          <button
            type="button"
            onClick={() => {
              trackEvent("generate_another_clicked", {
                source: "download_modal",
              });

              onGenerateAnother();
            }}
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-bold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            Ստեղծել նոր թեստ
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
