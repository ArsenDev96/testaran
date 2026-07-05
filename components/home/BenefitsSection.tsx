import type { HomeContent } from "@/lib/home-content";

type BenefitsSectionProps = {
  content: HomeContent;
};

export default function BenefitsSection({ content }: BenefitsSectionProps) {
  return (
    <section
      id="benefits"
      className="mx-auto mt-20 w-full max-w-5xl scroll-mt-24"
    >
      <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/60 sm:p-10">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-950">
            {content.benefitsTitle}
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            {content.benefitsDescription}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {content.benefits.map((item) => (
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
  );
}
