"use client";

import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import ContactModal from "@/components/ContactModal";
import DownloadModal, { type DownloadItem } from "@/components/DownloadModal";
import BenefitsSection from "@/components/home/BenefitsSection";
import FaqSection from "@/components/home/FaqSection";
import HomeFooter from "@/components/home/HomeFooter";
import HomeHeader from "@/components/home/HomeHeader";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import SeoLinksSection from "@/components/home/SeoLinksSection";
import { trackEvent } from "@/lib/analytics";
import {
  type Difficulty,
  type HomeContent,
  type Locale,
  type QuestionType,
} from "@/lib/home-content";

const MAX_FREE_GENERATIONS = 2;
const USAGE_STORAGE_KEY = "testaran_generation_count";

type GenerateQuizSuccessResponse = {
  success: true;
  title?: string;
  downloads: DownloadItem[];
};

type GenerateQuizErrorResponse = {
  success: false;
  error?: string;
  message?: string;
};

type GenerateQuizResponse =
  | GenerateQuizSuccessResponse
  | GenerateQuizErrorResponse;

type SubscribeSuccessResponse = {
  success: true;
};

type SubscribeErrorResponse = {
  success: false;
  error?: string;
};

type SubscribeResponse = SubscribeSuccessResponse | SubscribeErrorResponse;

type HomePageClientProps = {
  locale: Locale;
  content: HomeContent;
};

export default function HomePageClient({ locale, content }: HomePageClientProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const subscribeSectionRef = useRef<HTMLElement>(null);

  const [pdf, setPdf] = useState<File | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("mixed");
  const [questionType, setQuestionType] = useState<QuestionType>("both");
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [downloadTitle, setDownloadTitle] = useState<string>();
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [subscribeError, setSubscribeError] = useState("");

  const eventSource = content.source;

  const fileName = useMemo(() => {
    if (!pdf) {
      return content.form.chooseFile;
    }

    return pdf.name;
  }, [content.form.chooseFile, pdf]);

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Testaran",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: locale === "en" ? "https://testaran.site/en" : "https://testaran.site",
    description: content.softwareDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "AMD",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] ?? null;

    setError("");

    if (!selectedFile) {
      setPdf(null);
      return;
    }

    if (
      selectedFile.type !== "application/pdf" &&
      !selectedFile.name.toLowerCase().endsWith(".pdf")
    ) {
      setPdf(null);
      setError(content.errors.onlyPdf);
      event.target.value = "";
      return;
    }

    setPdf(selectedFile);
  }

  function handleGenerateAnother() {
    trackEvent("generate_another_clicked", {
      source: eventSource,
    });

    setIsDownloadModalOpen(false);
    setDownloads([]);
    setDownloadTitle(undefined);
    setPdf(null);
    setDifficulty("mixed");
    setQuestionType("both");
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubscribeMessage("");
    setSubscribeError("");

    const email = subscribeEmail.trim().toLowerCase();

    if (!email) {
      setSubscribeError(content.errors.requiredEmail);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribeError(content.errors.invalidEmail);
      return;
    }

    setIsSubscribing(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: locale === "en" ? "testaran.site/en" : "testaran.site",
          page: locale === "en" ? "/en" : "/",
        }),
      });

      const data = (await response.json()) as SubscribeResponse;

      if (!response.ok || !data.success) {
        throw new Error(
          "error" in data
            ? data.error || content.errors.subscribeFailed
            : content.errors.subscribeFailed,
        );
      }

      setSubscribeEmail("");
      setSubscribeMessage(content.subscribe.success);

      trackEvent("subscribe_success", {
        source: eventSource,
      });
    } catch (caughtError) {
      trackEvent("subscribe_error", {
        source: eventSource,
      });

      setSubscribeError(
        caughtError instanceof Error ? caughtError.message : content.errors.unknown,
      );
    } finally {
      setIsSubscribing(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    trackEvent("generate_quiz_clicked", {
      source: eventSource,
      locale,
    });

    if (!pdf) {
      setError(content.errors.requiredPdf);
      return;
    }

    const currentUsageCount = Number(
      window.localStorage.getItem(USAGE_STORAGE_KEY) || "0",
    );

    if (currentUsageCount >= MAX_FREE_GENERATIONS) {
      setError(content.errors.limitReached);

      subscribeSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      return;
    }

    setIsLoading(true);
    setError("");
    setDownloads([]);

    try {
      const formData = new FormData();
      formData.append("pdf", pdf);
      formData.append("difficulty", difficulty);
      formData.append("questionType", questionType);
      formData.append("locale", locale);

      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as GenerateQuizResponse;

      if (!response.ok || !data.success) {
        throw new Error(
          "error" in data
            ? data.error || data.message || content.errors.generateFailed
            : content.errors.generateFailed,
        );
      }

      const nextUsageCount = currentUsageCount + 1;
      window.localStorage.setItem(USAGE_STORAGE_KEY, String(nextUsageCount));

      trackEvent("quiz_generated_success", {
        source: eventSource,
        locale,
      });

      setDownloads(data.downloads);
      setDownloadTitle(data.title || content.downloadModal.defaultTitle);
      setIsDownloadModalOpen(true);
    } catch (caughtError) {
      trackEvent("quiz_generated_error", {
        source: eventSource,
        locale,
      });

      setError(
        caughtError instanceof Error ? caughtError.message : content.errors.unknown,
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#e0f2fe_0,#f8fafc_38%,#ffffff_76%)] px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
        <HomeHeader content={content} />

        <section className="mx-auto mt-4 flex w-full max-w-5xl flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center justify-center rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-sm font-medium text-cyan-800 shadow-sm shadow-cyan-100">
            {content.hero.badge}
          </div>

          <h1 className="max-w-4xl text-balance text-3xl font-bold leading-tight tracking-normal text-slate-950 sm:text-4xl lg:text-5xl">
            {content.hero.title}
          </h1>

          <p className="mt-5 max-w-3xl text-pretty text-lg leading-8 text-slate-600 sm:text-xl">
            {content.hero.description}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white/95 p-5 text-left shadow-2xl shadow-slate-200/70 sm:p-8"
          >
            <div className="grid gap-6">
              <label className="group flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center transition hover:border-cyan-400 hover:bg-cyan-50/60">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-600 text-sm font-bold text-white shadow-lg shadow-cyan-200">
                  PDF
                </span>

                <span className="mt-4 text-base font-semibold text-slate-950">
                  {content.form.uploadTitle}
                </span>

                <span className="mt-2 max-w-sm truncate text-sm text-slate-500">
                  {fileName}
                </span>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handleFileChange}
                  disabled={isLoading}
                  className="sr-only"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    {content.form.difficulty}
                  </span>

                  <select
                    value={difficulty}
                    onChange={(event) =>
                      setDifficulty(event.target.value as Difficulty)
                    }
                    disabled={isLoading}
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base font-medium text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                  >
                    {content.difficulties.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    {content.form.questionType}
                  </span>

                  <select
                    value={questionType}
                    onChange={(event) =>
                      setQuestionType(event.target.value as QuestionType)
                    }
                    disabled={isLoading}
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base font-medium text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                  >
                    {content.questionTypes.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {error ? (
                <div
                  role="alert"
                  className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-700"
                >
                  {error}
                </div>
              ) : null}

              <div className="rounded-2xl border border-cyan-100 bg-cyan-50 px-4 py-3 text-center text-sm leading-6 text-cyan-900">
                {content.form.freeLimitBefore}{" "}
                <strong>{content.form.freeLimitStrong}</strong>{" "}
                {content.form.freeLimitAfter}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-cyan-600 px-6 text-base font-bold text-white shadow-xl shadow-cyan-200 transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 disabled:cursor-not-allowed disabled:bg-cyan-400"
              >
                {isLoading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    <span>{content.form.loading}</span>
                  </>
                ) : (
                  content.form.submit
                )}
              </button>
            </div>
          </form>

          <section
            ref={subscribeSectionRef}
            id="subscribe"
            className="mt-8 w-full max-w-2xl scroll-mt-24 rounded-[2rem] border border-cyan-100 bg-white/95 p-5 text-center shadow-xl shadow-cyan-100/50 sm:p-6"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-600 text-lg font-bold text-white shadow-lg shadow-cyan-200">
              {content.subscribe.icon}
            </div>

            <h2 className="mt-4 text-xl font-bold text-slate-950">
              {content.subscribe.title}
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              {content.subscribe.descriptionBefore}{" "}
              <strong>{content.subscribe.descriptionStrong}</strong>{" "}
              {content.subscribe.descriptionAfter}
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]"
            >
              <label className="sr-only" htmlFor={`subscribe-email-${locale}`}>
                {content.subscribe.emailLabel}
              </label>

              <input
                id={`subscribe-email-${locale}`}
                type="email"
                value={subscribeEmail}
                onChange={(event) => setSubscribeEmail(event.target.value)}
                placeholder={content.subscribe.placeholder}
                disabled={isSubscribing}
                className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:bg-slate-100"
              />

              <button
                type="submit"
                disabled={isSubscribing}
                className="h-12 rounded-2xl bg-cyan-600 px-6 text-base font-bold text-white shadow-lg shadow-cyan-200 transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 disabled:cursor-not-allowed disabled:bg-cyan-400"
              >
                {isSubscribing ? content.subscribe.loading : content.subscribe.button}
              </button>
            </form>

            {subscribeMessage ? (
              <p className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                {subscribeMessage}
              </p>
            ) : null}

            {subscribeError ? (
              <p className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {subscribeError}
              </p>
            ) : null}
          </section>
        </section>

        <HowItWorksSection content={content} />
        <SeoLinksSection content={content} />
        <BenefitsSection content={content} />
        <FaqSection content={content} />

        <DownloadModal
          open={isDownloadModalOpen}
          title={downloadTitle}
          downloads={downloads}
          onClose={() => setIsDownloadModalOpen(false)}
          onGenerateAnother={handleGenerateAnother}
          labels={content.downloadModal}
        />

        <ContactModal
          open={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />

        <HomeFooter
          content={content}
          onContactClick={() => setIsContactModalOpen(true)}
        />
      </main>
    </>
  );
}
