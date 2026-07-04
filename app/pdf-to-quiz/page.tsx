import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PDF-ից թեստ ստեղծել AI-ի օգնությամբ | Testaran",
  description:
    "Վերբեռնեք PDF դասանյութ և ստացեք պատրաստի թեստ՝ հարցերով, տարբերակներով, ճիշտ պատասխաններով և բացատրություններով։",
  alternates: {
    canonical: "/pdf-to-quiz",
  },
  openGraph: {
    title: "PDF-ից թեստ ստեղծել AI-ի օգնությամբ | Testaran",
    description:
      "Testaran-ը օգնում է PDF դասանյութերից արագ ստեղծել պատրաստի հայերեն թեստեր AI-ի օգնությամբ։",
    url: "https://testaran.site/pdf-to-quiz",
    siteName: "Testaran",
    locale: "hy_AM",
    type: "website",
  },
};

export default function PdfToQuizPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 text-slate-950">
      <article className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="text-sm font-semibold text-cyan-700 hover:text-cyan-800"
        >
          ← Վերադառնալ գլխավոր էջ
        </Link>

        <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          PDF-ից թեստ ստեղծել AI-ի օգնությամբ
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Testaran-ը օգնում է ուսուցիչներին, դասախոսներին և կրթական
          կենտրոններին PDF դասանյութերից արագ ստեղծել պատրաստի թեստեր։
          Վերբեռնեք PDF ֆայլը և ստացեք հարցեր, պատասխանների տարբերակներ,
          ճիշտ պատասխաններ և բացատրություններ։
        </p>

        <section className="mt-10 rounded-3xl border border-cyan-100 bg-cyan-50 p-6">
          <h2 className="text-2xl font-bold">
            Ինչպես ստեղծել թեստ PDF ֆայլից
          </h2>

          <ol className="mt-5 space-y-4 leading-7 text-slate-700">
            <li>
              <strong>1. Վերբեռնեք PDF դասանյութը։</strong> Կարող եք օգտագործել
              դասագիրք, դասախոսության նյութ, թեմայի ամփոփում կամ ուսումնական
              ֆայլ։
            </li>
            <li>
              <strong>2. Ընտրեք հարցերի տեսակը։</strong> Կարող եք ստեղծել մեկ
              ճիշտ պատասխանով, մի քանի ճիշտ պատասխանով կամ խառը հարցեր։
            </li>
            <li>
              <strong>3. AI-ը կստեղծի հարցաշար։</strong> Համակարգը կվերլուծի
              PDF-ի բովանդակությունը և կստեղծի թեստ։
            </li>
            <li>
              <strong>4. Վերանայեք և օգտագործեք։</strong> Թեստը կարող եք
              օգտագործել դասի, տնային աշխատանքի, ստուգման կամ կրկնության
              համար։
            </li>
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold">
            Ում համար է նախատեսված այս գործիքը
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Այս PDF quiz generator-ը նախատեսված է ուսուցիչների, դասախոսների,
            մասնավոր պարապողների, ուսումնական կենտրոնների և կրթական նախագծերի
            համար։ Այն հատկապես օգտակար է, երբ պետք է արագ պատրաստել հայերեն
            թեստեր PDF նյութերից։
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold">
            Ինչպիսի թեստեր կարող եք ստեղծել
          </h2>

          <ul className="mt-5 space-y-3 leading-7 text-slate-700">
            <li>• Մեկ ճիշտ պատասխանով հարցեր</li>
            <li>• Մի քանի ճիշտ պատասխանով հարցեր</li>
            <li>• Տարբեր բարդության հարցեր</li>
            <li>• Հայերեն հարցաշարեր</li>
            <li>• Պատասխաններով և բացատրություններով թեստեր</li>
          </ul>
        </section>

        <section className="mt-12 rounded-3xl border border-slate-200 p-6">
          <h2 className="text-2xl font-bold">Փորձեք Testaran-ը</h2>

          <p className="mt-3 leading-7 text-slate-600">
            Վերբեռնեք ձեր PDF դասանյութը և ստեղծեք առաջին թեստերը անվճար։
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-2xl bg-cyan-600 px-6 py-3 font-bold text-white hover:bg-cyan-700"
          >
            Ստեղծել թեստ
          </Link>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold">Հաճախ տրվող հարցեր</h2>

          <div className="mt-6 space-y-4">
            <details className="rounded-2xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-bold">
                Կարո՞ղ եմ ցանկացած PDF ֆայլից թեստ ստեղծել
              </summary>
              <p className="mt-3 leading-7 text-slate-600">
                Լավագույն արդյունքի համար PDF ֆայլում պետք է լինի կարդացվող
                տեքստ։ Սքանավորված կամ միայն նկարներից կազմված PDF ֆայլերը
                կարող են ճիշտ չմշակվել։
              </p>
            </details>

            <details className="rounded-2xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-bold">
                Արդյո՞ք Testaran-ը աշխատում է հայերենով
              </summary>
              <p className="mt-3 leading-7 text-slate-600">
                Այո, Testaran-ը նախատեսված է նաև հայերեն PDF դասանյութերից
                հայերեն թեստեր ստեղծելու համար։
              </p>
            </details>

            <details className="rounded-2xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-bold">
                Պետք է արդյո՞ք ստուգել AI-ով ստեղծված հարցերը
              </summary>
              <p className="mt-3 leading-7 text-slate-600">
                Այո, խորհուրդ է տրվում վերանայել AI-ով ստեղծված հարցերը
                վերջնական օգտագործումից առաջ։
              </p>
            </details>
          </div>
        </section>
      </article>
    </main>
  );
}