import Image from "next/image";
import type { HomeContent } from "@/lib/home-content";

type HomeHeaderProps = {
  content: HomeContent;
};

export default function HomeHeader({ content }: HomeHeaderProps) {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between py-5">
      <a href="/" aria-label="Testaran homepage">
        <Image
          src="/images/og-image.png"
          alt="Testaran - AI quiz generator"
          width={260}
          height={70}
          priority
          className="h-auto w-44 sm:w-52 md:w-56 lg:w-64"
        />
      </a>

      <nav
        aria-label="Main navigation"
        className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex"
      >
        <a href="#how-it-works" className="transition hover:text-cyan-700">
          {content.nav.howItWorks}
        </a>

        <a href="#benefits" className="transition hover:text-cyan-700">
          {content.nav.benefits}
        </a>

        <a href="#subscribe" className="transition hover:text-cyan-700">
          {content.nav.subscribe}
        </a>

        <a href="#faq" className="transition hover:text-cyan-700">
          {content.nav.faq}
        </a>
      </nav>

      <a
        href={content.langSwitchHref}
        className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:border-cyan-300 hover:text-cyan-700"
      >
        {content.langSwitchLabel}
      </a>
    </header>
  );
}
