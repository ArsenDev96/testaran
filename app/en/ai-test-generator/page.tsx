import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Quiz Generator for Teachers | Testaran",
  description:
    "Use Testaran as an AI quiz generator for teachers. Create Armenian quiz questions, answers, and explanations from PDF learning materials.",
  alternates: {
    canonical: "/en/ai-test-generator",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "AI Quiz Generator for Teachers | Testaran",
    description:
      "Create quizzes from PDF files with AI. Generate Armenian quiz questions, answer options, correct answers, and explanations.",
    url: "https://testaran.site/en/ai-test-generator",
    siteName: "Testaran",
    locale: "en_US",
    type: "website",
  },
};

export default function EnglishAiTestGeneratorPage() {
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
          AI Quiz Generator for Teachers
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Testaran is an AI quiz generator that helps teachers, tutors, schools,
          and education teams create quiz questions from PDF learning materials.
          Upload a readable PDF file and generate questions, answer options,
          correct answers, and explanations with AI.
        </p>

        <section className="mt-10 rounded-3xl border border-cyan-100 bg-cyan-50 p-6">
          <h2 className="text-2xl font-bold">
            What can the AI quiz generator do?
          </h2>

          <ul className="mt-5 space-y-4 leading-7 text-slate-700">
            <li>• Generate quiz questions from PDF learning materials</li>
            <li>• Create multiple-choice answer options</li>
            <li>• Mark correct answers</li>
            <li>• Add explanations for generated questions</li>
            <li>• Help teachers prepare quizzes, homework, and revision tests faster</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold">
            AI quiz generator for Armenian learning materials
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Testaran is useful for teachers who work with Armenian educational
            content. It can help create Armenian quiz questions from Armenian
            PDF materials, making it easier to prepare classroom quizzes,
            practice tests, and learning assessments.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            Instead of creating every question manually, teachers can generate a
            first version with AI and then review it before using it with
            students.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold">How Testaran works</h2>

          <ol className="mt-5 space-y-4 leading-7 text-slate-700">
            <li>
              <strong>1. Upload your PDF file.</strong> Use a textbook, lesson
              material, topic summary, or educational document.
            </li>

            <li>
              <strong>2. Choose quiz settings.</strong> Select the difficulty
              level and the type of questions you want to generate.
            </li>

            <li>
              <strong>3. Generate the quiz.</strong> AI analyzes the PDF content
              and creates quiz questions based on the material.
            </li>

            <li>
              <strong>4. Review and download.</strong> Review the generated
              questions and download the quiz files.
            </li>
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold">
            Who is this AI quiz maker for?
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Testaran is designed for teachers, private tutors, schools, training
            centers, and online education projects that need a faster way to
            create quizzes from learning materials.
          </p>
        </section>

        <section className="mt-12 rounded-3xl border border-slate-200 p-6">
          <h2 className="text-2xl font-bold">Try the AI quiz generator</h2>

          <p className="mt-3 leading-7 text-slate-600">
            Upload your PDF material and create your first quiz with Testaran.
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
                What is an AI quiz generator?
              </summary>
              <p className="mt-3 leading-7 text-slate-600">
                An AI quiz generator is a tool that analyzes learning materials
                and creates quiz questions, answer options, correct answers, and
                explanations.
              </p>
            </details>

            <details className="rounded-2xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-bold">
                Can Testaran generate quizzes from PDF files?
              </summary>
              <p className="mt-3 leading-7 text-slate-600">
                Yes. You can upload a readable PDF file and generate quiz
                questions based on its content.
              </p>
            </details>

            <details className="rounded-2xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-bold">
                Can Testaran create Armenian quiz questions?
              </summary>
              <p className="mt-3 leading-7 text-slate-600">
                Yes. Testaran can help create Armenian quiz questions from
                Armenian learning materials.
              </p>
            </details>

            <details className="rounded-2xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-bold">
                Should teachers review AI-generated questions?
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