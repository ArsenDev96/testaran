import type { Metadata } from "next";
import HomePageClient from "@/components/home/HomePageClient";
import { homeContent } from "@/lib/home-content";

export const metadata: Metadata = {
  title: "Testaran — AI Quiz Generator from PDF",
  description:
    "Upload a PDF file and create quizzes with AI. Testaran helps teachers generate Armenian quiz questions, answers, and explanations from learning materials.",
  alternates: {
    canonical: "/en",
    languages: {
      "hy-AM": "/",
      en: "/en",
    },
  },
};

export default function EnglishHome() {
  return <HomePageClient locale="en" content={homeContent.en} />;
}