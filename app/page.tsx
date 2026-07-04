"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import ContactModal from "../components/ContactModal";
import DownloadModal, { type DownloadItem } from "../components/DownloadModal";

type Difficulty = "mixed" | "easy" | "medium" | "hard";
type QuestionType = "both" | "single" | "multiple";

type GenerateQuizResponse =
  | {
      success: true;
      title?: string;
      downloads: DownloadItem[];
    }
  | {
      success: false;
      error?: string;
      message?: string;
    };

type SubscribeResponse =
  | {
      success: true;
    }
  | {
      success: false;
      error?: string;
    };

const difficulties: Array<{ value: Difficulty; label: string }> = [
  { value: "mixed", label: "Խառը" },
  { value: "easy", label: "Հեշտ" },
  { value: "medium", label: "Միջին" },
  { value: "hard", label: "Բարդ" },
];

const questionTypes: Array<{ value: QuestionType; label: string }> = [
  { value: "both", label: "Երկուսն էլ" },
  { value: "single", label: "Մեկ ճիշտ պատասխան" },
  { value: "multiple", label: "Մի քանի ճիշտ պատասխան" },
];

const MAX_FREE_GENERATIONS = 2;
const USAGE_STORAGE_KEY = "testaran_generation_count";

const howItWorksItems = [
  {
    step: "1",
    title: "Վերբեռնեք PDF ֆայլը",
    text: "Ընտրեք դասագիրք, ուսումնական նյութ կամ դասախոսության PDF ֆայլ։",
  },
  {
    step: "2",
    title: "AI-ն վերլուծում է նյութը",
    text: "Համակարգը կարդում է բովանդակությունը և ստեղծում համապատասխան հարցեր։",
  },
  {
    step: "3",
    title: "Ներբեռնեք պատրաստի թեստը",
    text: "Ստացեք թեստը PDF և Excel ձևաչափերով՝ պատասխաններով կամ առանց պատասխանների։",
  },
];

const benefits = [
  {
    title: "Ուսուցիչների համար",
    text: "Արագ պատրաստեք հարցաշարեր դասի, տնային աշխատանքի, ստուգման կամ կրկնության համար։",
  },
  {
    title: "Հայերեն նյութերի համար",
    text: "Testaran-ը նախատեսված է նաև հայերեն PDF դասանյութերից հայերեն թեստեր ստեղծելու համար։",
  },
  {
    title: "Պատրաստի արտահանում",
    text: "Ստացեք թեստի տարբերակներ, ճիշտ պատասխաններ և բացատրություններ՝ հարմար օգտագործման համար։",
  },
];

const faqs = [
  {
    question: "Ի՞նչ է Testaran-ը",
    answer:
      "Testaran-ը AI թեստերի գեներատոր է, որը PDF դասանյութերից ստեղծում է պատրաստի հարցաշարեր՝ հարցերով, տարբերակներով, ճիշտ պատասխաններով և բացատրություններով։",
  },
  {
    question: "Կարո՞ղ եմ PDF ֆայլից թեստ ստեղծել",
    answer:
      "Այո։ Կարող եք վերբեռնել PDF ֆայլ, ընտրել բարդությունը և հարցերի տեսակը, իսկ համակարգը կստեղծի թեստ այդ նյութի հիման վրա։",
  },
  {
    question: "Արդյո՞ք Testaran-ը աշխատում է հայերենով",
    answer:
      "Այո։ Testaran-ը նախատեսված է հայերեն նյութերից հայերեն թեստեր ստեղծելու համար։",
  },
  {
    question: "Ինչպիսի՞ PDF ֆայլեր կարող եմ վերբեռնել",
    answer:
      "Լավագույն արդյունքի համար վերբեռնեք այն PDF ֆայլերը, որոնցում տեքստը հնարավոր է կարդալ։ Սքանավորված կամ նկարային PDF ֆայլերը կարող են ճիշտ չմշակվել։",
  },
  {
    question: "Արդյո՞ք AI-ով ստեղծված հարցերը պետք է ստուգել",
    answer:
      "Այո։ Testaran-ը խնայում է ժամանակ և ստեղծում է լավ նախնական տարբերակ, բայց վերջնական օգտագործումից առաջ խորհուրդ է տրվում վերանայել հարցերը։",
  },
  {
    question: "Ի՞նչ ձևաչափերով կարող եմ ներբեռնել թեստը",
    answer:
      "Թեստը կարող եք ներբեռնել PDF և Excel ձևաչափերով՝ պատասխաններով կամ առանց պատասխանների։",
  },
];

export default function Home() {
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

  const fileName = useMemo(() => {
    if (!pdf) {
      return "Ընտրեք PDF ֆայլ";
    }

    return pdf.name;
  }, [pdf]);

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Testaran",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: "https://testaran.site",
    description:
      "Testaran-ը AI թեստերի գեներատոր է, որը PDF դասանյութերից ստեղծում է պատրաստի հարցաշարեր ուսուցիչների համար։",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "AMD",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
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
      setError("Խնդրում ենք վերբեռնել միայն PDF ֆայլ։");
      event.target.value = "";
      return;
    }

    setPdf(selectedFile);
  }

  function handleGenerateAnother() {
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
      setSubscribeError("Խնդրում ենք մուտքագրել էլ․ հասցե։");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribeError("Խնդրում ենք մուտքագրել ճիշտ էլ․ հասցե։");
      return;
    }

    setIsSubscribing(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as SubscribeResponse;

      if (!response.ok || !data.success) {
        throw new Error(
          "error" in data
            ? data.error || "Բաժանորդագրումը ձախողվեց։"
            : "Բաժանորդագրումը ձախողվեց։",
        );
      }

      setSubscribeEmail("");
      setSubscribeMessage(
        "Շնորհակալություն։ Ձեր էլ․ հասցեն պահպանվեց, և մենք կտեղեկացնենք նոր հնարավորությունների մասին։",
      );
    } catch (caughtError) {
      setSubscribeError(
        caughtError instanceof Error
          ? caughtError.message
          : "Անհայտ սխալ է տեղի ունեցել։",
      );
    } finally {
      setIsSubscribing(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!pdf) {
      setError("Խնդրում ենք նախ ընտրել PDF ֆայլ։");
      return;
    }

    const currentUsageCount = Number(
      window.localStorage.getItem(USAGE_STORAGE_KEY) || "0",
    );

    if (currentUsageCount >= MAX_FREE_GENERATIONS) {
      setError(
        "Դուք արդեն օգտագործել եք անվճար 2 թեստի ստեղծման հնարավորությունը։ Եթե ցանկանում եք ավելի շատ օգտագործել Testaran-ը, թողեք ձեր էլ․ հասցեն ներքևում։",
      );

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

      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as GenerateQuizResponse;

      if (!response.ok || !data.success) {
        throw new Error(
          "error" in data
            ? data.error || data.message || "Թեստի ստեղծումը ձախողվեց։"
            : "Թեստի ստեղծումը ձախողվեց։",
        );
      }

      const nextUsageCount = currentUsageCount + 1;

      window.localStorage.setItem(USAGE_STORAGE_KEY, String(nextUsageCount));

      setDownloads(data.downloads);
      setDownloadTitle(data.title);
      setIsDownloadModalOpen(true);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Անհայտ սխալ է տեղի ունեցել։",
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
        <header className="mx-auto flex w-full max-w-6xl items-center justify-center py-5 md:justify-between">
          <Image
            src="/images/og-image.png"
            alt="Testaran - AI թեստերի գեներատոր"
            width={260}
            height={70}
            priority
            className="h-auto w-52 md:w-56 lg:w-64"
          />

          <nav
            aria-label="Հիմնական նավիգացիա"
            className="hidden items-center gap-6 text-sm font-semibold text-slate-600 sm:flex"
          >
            <a href="#how-it-works" className="transition hover:text-cyan-700">
              Ինչպես է աշխատում
            </a>

            <a href="#benefits" className="transition hover:text-cyan-700">
              Առավելություններ
            </a>

            <a href="#subscribe" className="transition hover:text-cyan-700">
              Բաժանորդագրություն
            </a>

            <a href="#faq" className="transition hover:text-cyan-700">
              ՀՏՀ
            </a>
          </nav>
        </header>

        <section className="mx-auto mt-4 flex w-full max-w-5xl flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center justify-center rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-sm font-medium text-cyan-800 shadow-sm shadow-cyan-100">
            AI-ով աշխատող հայկական թեստերի գեներատոր
          </div>

          <h1 className="max-w-4xl text-balance text-3xl font-bold leading-tight tracking-normal text-slate-950 sm:text-4xl lg:text-5xl">
            AI թեստերի գեներատոր PDF ֆայլերից
          </h1>

          <p className="mt-5 max-w-3xl text-pretty text-lg leading-8 text-slate-600 sm:text-xl">
            Վերբեռնեք PDF դասանյութը և մի քանի րոպեում ստացեք պատրաստի
            հարցաշար՝ ճիշտ պատասխաններով, տարբերակներով և բացատրություններով։
            Testaran-ը օգնում է ուսուցիչներին արագ ստեղծել հայերեն թեստեր
            դասի, ստուգման կամ կրկնության համար։
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
                  Վերբեռնել PDF
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
                    Բարդություն
                  </span>

                  <select
                    value={difficulty}
                    onChange={(event) =>
                      setDifficulty(event.target.value as Difficulty)
                    }
                    disabled={isLoading}
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base font-medium text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                  >
                    {difficulties.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Հարցերի տեսակ
                  </span>

                  <select
                    value={questionType}
                    onChange={(event) =>
                      setQuestionType(event.target.value as QuestionType)
                    }
                    disabled={isLoading}
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base font-medium text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                  >
                    {questionTypes.map((option) => (
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
                Այս պահին կարող եք ստեղծել մինչև{" "}
                <strong>2 թեստ</strong>։ Եթե ցանկանում եք ավելի շատ օգտագործել
                Testaran-ը, թողեք ձեր էլ․ հասցեն ներքևում։
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-cyan-600 px-6 text-base font-bold text-white shadow-xl shadow-cyan-200 transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 disabled:cursor-not-allowed disabled:bg-cyan-400"
              >
                {isLoading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    <span>Թեստը ստեղծվում է...</span>
                  </>
                ) : (
                  "Ստեղծել թեստ"
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
              ✉
            </div>

            <h2 className="mt-4 text-xl font-bold text-slate-950">
              Ցանկանու՞մ եք ավելի շատ օգտագործել Testaran-ը
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Այս պահին Testaran-ը հասանելի է անվճար մինչև{" "}
              <strong>2 թեստ</strong> ստեղծելու համար։ Եթե ցանկանում եք ավելի
              շատ օգտագործել համակարգը, թողեք ձեր էլ․ հասցեն, և մենք
              կտեղեկացնենք հասանելիության և նոր հնարավորությունների մասին։
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]"
            >
              <label className="sr-only" htmlFor="subscribe-email">
                Էլ․ հասցե
              </label>

              <input
                id="subscribe-email"
                type="email"
                value={subscribeEmail}
                onChange={(event) => setSubscribeEmail(event.target.value)}
                placeholder="Ձեր էլ․ հասցեն"
                disabled={isSubscribing}
                className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:bg-slate-100"
              />

              <button
                type="submit"
                disabled={isSubscribing}
                className="h-12 rounded-2xl bg-cyan-600 px-6 text-base font-bold text-white shadow-lg shadow-cyan-200 transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 disabled:cursor-not-allowed disabled:bg-cyan-400"
              >
                {isSubscribing ? "Ուղարկվում է..." : "Բաժանորդագրվել"}
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

        <section
          id="how-it-works"
          className="mx-auto mt-20 w-full max-w-5xl scroll-mt-24"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-950">
              Ինչպես է աշխատում Testaran-ը
            </h2>

            <p className="mt-3 text-slate-600">
              PDF-ից թեստ ստեղծելը կատարվում է երեք պարզ քայլով։
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {howItWorksItems.map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600 font-bold text-white">
                  {item.step}
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="benefits"
          className="mx-auto mt-20 w-full max-w-5xl scroll-mt-24"
        >
          <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/60 sm:p-10">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-slate-950">
                Թեստերի գեներատոր ուսուցիչների համար
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                Testaran-ը ստեղծված է այն դեպքերի համար, երբ անհրաժեշտ է արագ
                պատրաստել հարցաշար ուսումնական նյութից։ Այն կարող է օգնել
                դասավանդողներին, ուսումնական կենտրոններին և մասնավոր
                դասախոսներին PDF ֆայլերից ստանալ օգտագործման պատրաստ թեստեր։
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {benefits.map((item) => (
                <div key={item.title} className="rounded-3xl bg-slate-50 p-6">
                  <h3 className="text-lg font-bold text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="mx-auto mt-20 w-full max-w-3xl scroll-mt-24"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-950">
              Հաճախ տրվող հարցեր
            </h2>

            <p className="mt-3 text-slate-600">
              Ամենակարևոր հարցերը Testaran-ի և PDF-ից թեստ ստեղծելու մասին։
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <summary className="cursor-pointer list-none font-bold text-slate-950">
                  {item.question}
                </summary>

                <p className="mt-3 leading-7 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <DownloadModal
          open={isDownloadModalOpen}
          title={downloadTitle}
          downloads={downloads}
          onClose={() => setIsDownloadModalOpen(false)}
          onGenerateAnother={handleGenerateAnother}
        />

        <ContactModal
          open={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />

        <footer className="mt-24 border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-12 text-center">
            <h2 className="text-2xl font-bold text-slate-950">Testaran</h2>

            <p className="max-w-lg text-slate-600">
              AI-ով թեստերի գեներատոր, որը օգնում է ուսուցիչներին մի քանի
              րոպեում ստեղծել պատրաստի թեստեր PDF ֆայլերից։
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-700">
              <a
                href="#how-it-works"
                className="transition hover:text-cyan-700"
              >
                Ինչպես է աշխատում
              </a>

              <a href="#benefits" className="transition hover:text-cyan-700">
                Առավելություններ
              </a>

              <a href="#subscribe" className="transition hover:text-cyan-700">
                Բաժանորդագրություն
              </a>

              <a href="#faq" className="transition hover:text-cyan-700">
                ՀՏՀ
              </a>

              <button
                type="button"
                onClick={() => setIsContactModalOpen(true)}
                className="font-bold text-cyan-700 transition hover:text-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-100"
              >
                Կապվել մեզ հետ
              </button>
            </div>

            <p className="text-sm text-slate-500">
              © 2026 Testaran. Բոլոր իրավունքները պաշտպանված են։
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}