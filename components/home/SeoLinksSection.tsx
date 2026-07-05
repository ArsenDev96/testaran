import type { HomeContent } from "@/lib/home-content";

type SeoLinksSectionProps = {
  content: HomeContent;
};

export default function SeoLinksSection({ content }: SeoLinksSectionProps) {
  return (
    <section className="mx-auto mt-20 max-w-5xl px-6">
      <h2 className="text-3xl font-bold text-slate-950">
        {content.seoLinks.title}
      </h2>

      <p className="mt-4 leading-8 text-slate-600">
        {content.seoLinks.description}
      </p>

      <p className="mt-4 leading-8 text-slate-600">
        {content.seoLinks.pdfText}{" "}
        <a
            href={content.seoLinks.pdfHref}
            className="font-semibold text-cyan-700 hover:text-cyan-800"
            >
            {content.seoLinks.pdfLink}
        </a>
      </p>

      <p className="mt-4 leading-8 text-slate-600">
        {content.seoLinks.aiText}{" "}
        <a
          href={content.seoLinks.aiHref}
          className="font-semibold text-cyan-700 hover:text-cyan-800"
        >
          {content.seoLinks.aiLink}
        </a>
      </p>
    </section>
  );
}
