import type { HomeContent } from "@/lib/home-content";

type HowItWorksSectionProps = {
  content: HomeContent;
};

export default function HowItWorksSection({ content }: HowItWorksSectionProps) {
  return (
    <section
      id="how-it-works"
      className="mx-auto mt-20 w-full max-w-5xl scroll-mt-24"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-950">
          {content.howItWorksTitle}
        </h2>

        <p className="mt-3 text-slate-600">{content.howItWorksSubtitle}</p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {content.howItWorksItems.map((item) => (
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
  );
}
