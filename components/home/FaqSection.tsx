import type { HomeContent } from "@/lib/home-content";

type FaqSectionProps = {
  content: HomeContent;
};

export default function FaqSection({ content }: FaqSectionProps) {
  return (
    <section
      id="faq"
      className="mx-auto mt-20 w-full max-w-3xl scroll-mt-24"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-950">
          {content.faqTitle}
        </h2>

        <p className="mt-3 text-slate-600">{content.faqSubtitle}</p>
      </div>

      <div className="mt-10 space-y-4">
        {content.faqs.map((item) => (
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
  );
}
