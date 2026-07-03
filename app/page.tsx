"use client";

import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
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

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("mixed");
  const [questionType, setQuestionType] = useState<QuestionType>("both");
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [downloadTitle, setDownloadTitle] = useState<string>();
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fileName = useMemo(() => {
    if (!pdf) {
      return "Ընտրեք PDF ֆայլ";
    }

    return pdf.name;
  }, [pdf]);

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!pdf) {
      setError("Խնդրում ենք նախ ընտրել PDF ֆայլ։");
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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#e0f2fe_0,#f8fafc_38%,#ffffff_76%)] px-4 py-10 text-slate-950 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <div className="mb-8 inline-flex items-center justify-center rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-sm font-medium text-cyan-800 shadow-sm shadow-cyan-100">
          PDF-ից պատրաստի թեստեր
        </div>

        <h1 className="max-w-4xl text-balance text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
          Թեստերի ավտոմատ գեներատոր
        </h1>

        <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-slate-600 sm:text-xl">
          Վերբեռնեք PDF ֆայլը և մի քանի րոպեում ստացեք պատրաստի թեստ։
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-12 w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white/95 p-5 text-left shadow-2xl shadow-slate-200/70 sm:p-8"
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
      </section>

      <DownloadModal
        open={isDownloadModalOpen}
        title={downloadTitle}
        downloads={downloads}
        onClose={() => setIsDownloadModalOpen(false)}
        onGenerateAnother={handleGenerateAnother}
      />
    </main>
  );
}
