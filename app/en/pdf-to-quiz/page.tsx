import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create a Quiz from PDF | PDF Quiz Generator | Testaran",
  description:
    "Create quizzes from PDF files with AI. Testaran helps teachers generate Armenian quiz questions, answers, and explanations from PDF learning materials.",
  alternates: {
    canonical: "/en/pdf-to-quiz",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Create a Quiz from PDF | Testaran",
    description:
      "Use Testaran as a PDF quiz generator to create Armenian quizzes from PDF learning materials with AI.",
    url: "https://testaran.site/en/pdf-to-quiz",
    siteName: "Testaran",
    locale: "en_US",
    type: "website",
  },
};

export default function EnglishPdfToQuizPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 text-slate-950">
      <article className="mx-auto max-w-4xl">
        <Link
          href="/en"
          className="text-sm font-semibold text-cyan-700 hover:text-cyan-800"
        >
          ← Back to English homepage
        </Link>

        <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Create a Quiz from PDF
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Testaran is a PDF quiz generator that helps teachers create quiz
          questions from learning materials. Upload a readable PDF file and
          generate questions, answer options, correct answers, and explanations
          with AI.
        </p>

        <section className="mt-10 rounded-3xl border border-cyan-100 bg-cyan-50 p-6">
          <h2 className="text-2xl font-bold">
            How to create a quiz from a PDF file
          </h2>

          <ol className="mt-5 space-y-4 leading-7 text-slate-700">
            <li>
              <strong>1. Upload your PDF file.</strong> Use a textbook, lesson
              material, lecture notes, summary, or any readable educational PDF.
            </li>

            <li>
              <strong>2. Choose quiz settings.</strong> Select the difficulty
              level and question type.
            </li>

            <li>
              <strong>3. Generate the quiz.</strong> AI analyzes the PDF content
              and creates relevant quiz questions.
            </li>

            <li>
              <strong>4. Review and download.</strong> Download the generated
              quiz and review the questions before using them with students.
            </li>
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold">
            PDF quiz generator for Armenian learning materials
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Testaran is especially useful for Armenian teachers, tutors,
            schools, training centers, and education projects that need to
            create quizzes from Armenian-language PDF materials.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            Instead of writing every question manually, teachers can use AI to
            prepare a first version of a quiz faster and then review it before
            final use.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold">
            What can be generated?
          </h2>

          <ul className="mt-5 space-y-3 leading-7 text-slate-700">
            <li>• Multiple-choice questions</li>
            <li>• Questions with one correct answer</li>
            <li>• Questions with multiple correct answers</li>
            <li>• Correct answers</li>
            <li>• Explanations</li>
            <li>• Armenian quiz questions from PDF files</li>
          </ul>
        </section>

        <section className="mt-12 rounded-3xl border border-slate-200 p-6">
          <h2 className="text-2xl font-bold">Try Testaran</h2>

          <p className="mt-3 leading-7 text-slate-600">
            Upload your PDF learning material and create your first quiz with
            AI.
          </p>

          <Link
            href="/en"
            className="mt-6 inline-flex rounded-2xl bg-cyan-600 px-6 py-3 font-bold text-white hover:bg-cyan-700"
          >
            Create a quiz
          </Link>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold">FAQ</h2>

          <div className="mt-6 space-y-4">
            <details className="rounded-2xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-bold">
                Can I create a quiz from any PDF file?
              </summary>
              <p className="mt-3 leading-7 text-slate-600">
                For best results, the PDF should contain readable text. Scanned
                or image-only PDF files may not work as expected.
              </p>
            </details>

            <details className="rounded-2xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-bold">
                Can Testaran create Armenian quizzes?
              </summary>
              <p className="mt-3 leading-7 text-slate-600">
                Yes. Testaran can help create Armenian quiz questions from
                Armenian learning materials.
              </p>
            </details>

            <details className="rounded-2xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-bold">
                Should I review AI-generated questions?
              </summary>
              <p className="mt-3 leading-7 text-slate-600">
                Yes. Teachers should review AI-generated questions and answers
                before using them in class, homework, tests, or exams.
              </p>
            </details>
          </div>
        </section>
      </article>
    </main>
  );
}