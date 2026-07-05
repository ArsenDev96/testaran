import type { HomeContent } from "@/lib/home-content";

type HomeFooterProps = {
  content: HomeContent;
  onContactClick: () => void;
};

export default function HomeFooter({ content, onContactClick }: HomeFooterProps) {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-slate-950">Testaran</h2>

        <p className="max-w-lg text-slate-600">{content.footer.description}</p>

        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-700">
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

          <button
            type="button"
            onClick={onContactClick}
            className="font-bold text-cyan-700 transition hover:text-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-100"
          >
            {content.footer.contact}
          </button>
        </div>

        <p className="text-sm text-slate-500">{content.footer.rights}</p>
      </div>
    </footer>
  );
}
