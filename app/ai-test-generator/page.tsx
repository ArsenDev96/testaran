import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI թեստերի գեներատոր ուսուցիչների համար | Testaran",
  description:
    "Testaran-ը AI թեստերի գեներատոր է, որը օգնում է ուսուցիչներին PDF դասանյութերից ստեղծել հարցաշարեր՝ ճիշտ պատասխաններով և բացատրություններով։",
  alternates: {
    canonical: "/ai-test-generator",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "AI թեստերի գեներատոր ուսուցիչների համար | Testaran",
    description:
      "Ստեղծեք պատրաստի թեստեր AI-ի օգնությամբ՝ PDF դասանյութերից, ճիշտ պատասխաններով և բացատրություններով։",
    url: "https://testaran.site/ai-test-generator",
    siteName: "Testaran",
    locale: "hy_AM",
    type: "website",
  },
};

export default function AiTestGeneratorPage() {
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
          AI թեստերի գեներատոր ուսուցիչների համար
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Testaran-ը AI թեստերի գեներատոր է, որը օգնում է ուսուցիչներին,
          դասախոսներին և կրթական կենտրոններին արագ ստեղծել պատրաստի
          հարցաշարեր։ Համակարգը կարող է PDF դասանյութից ստեղծել հարցեր,
          պատասխանների տարբերակներ, ճիշտ պատասխաններ և բացատրություններ։
        </p>

        <section className="mt-10 rounded-3xl border border-cyan-100 bg-cyan-50 p-6">
          <h2 className="text-2xl font-bold">
            Ինչ կարող է անել AI թեստերի գեներատորը
          </h2>

          <ul className="mt-5 space-y-4 leading-7 text-slate-700">
            <li>• Ստեղծել հարցեր PDF դասանյութի հիման վրա</li>
            <li>• Առաջարկել պատասխանների տարբերակներ</li>
            <li>• Նշել ճիշտ պատասխանները</li>
            <li>• Ավելացնել բացատրություններ</li>
            <li>• Օգնել արագ պատրաստել ստուգողական կամ կրկնության թեստեր</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold">
            Ինչու է սա օգտակար ուսուցիչների համար
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Թեստ պատրաստելը հաճախ ժամանակատար աշխատանք է։ Պետք է կարդալ
            նյութը, առանձնացնել կարևոր մասերը, գրել հարցեր, պատրաստել
            պատասխանների տարբերակներ և ստուգել ճիշտ պատասխանները։ Testaran-ը
            օգնում է այս գործընթացը արագացնել AI-ի օգնությամբ։
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            Ուսուցիչը կարող է օգտագործել ստեղծված թեստերը դասի ընթացքում,
            տնային աշխատանքի համար, թեմայի ամփոփման կամ քննության
            նախապատրաստման նպատակով։
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold">
            Ինչպես է աշխատում Testaran-ը
          </h2>

          <ol className="mt-5 space-y-4 leading-7 text-slate-700">
            <li>
              <strong>1. Վերբեռնեք PDF ֆայլը։</strong> Դա կարող է լինել
              դասագիրք, թեմայի ամփոփում կամ ուսումնական նյութ։
            </li>
            <li>
              <strong>2. Ընտրեք հարցերի կարգավորումները։</strong> Կարող եք
              ընտրել բարդությունը և հարցերի տեսակը։
            </li>
            <li>
              <strong>3. Ստացեք պատրաստի թեստ։</strong> AI-ը կվերլուծի նյութը
              և կստեղծի հարցաշար։
            </li>
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold">
            Ինչ տեսակի հարցեր կարելի է ստեղծել
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Testaran-ը կարող է օգնել ստեղծել տարբեր ձևաչափի հարցեր՝ կախված
            դասանյութից և ուսուցչի նպատակներից։ Օրինակ՝ մեկ ճիշտ պատասխանով
            հարցեր, մի քանի ճիշտ պատասխանով հարցեր, թեմայի կրկնության հարցեր
            կամ ստուգողական հարցաշարեր։
          </p>
        </section>

        <section className="mt-12 rounded-3xl border border-slate-200 p-6">
          <h2 className="text-2xl font-bold">Ստեղծեք առաջին թեստը</h2>

          <p className="mt-3 leading-7 text-slate-600">
            Փորձեք Testaran-ը և ստեղծեք թեստ PDF դասանյութից մի քանի րոպեում։
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-2xl bg-cyan-600 px-6 py-3 font-bold text-white hover:bg-cyan-700"
          >
            Փորձել հիմա
          </Link>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold">Հաճախ տրվող հարցեր</h2>

          <div className="mt-6 space-y-4">
            <details className="rounded-2xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-bold">
                Ի՞նչ է AI թեստերի գեներատորը
              </summary>
              <p className="mt-3 leading-7 text-slate-600">
                AI թեստերի գեներատորը գործիք է, որը վերլուծում է ուսումնական
                նյութը և օգնում է ստեղծել հարցեր, պատասխաններ և բացատրություններ։
              </p>
            </details>

            <details className="rounded-2xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-bold">
                Արդյո՞ք Testaran-ը կարող է աշխատել հայերեն նյութերի հետ
              </summary>
              <p className="mt-3 leading-7 text-slate-600">
                Այո, Testaran-ը նախատեսված է նաև հայերեն դասանյութերից հայերեն
                թեստեր ստեղծելու համար։
              </p>
            </details>

            <details className="rounded-2xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-bold">
                Կարո՞ղ եմ օգտագործել ստեղծված թեստերը դասարանում
              </summary>
              <p className="mt-3 leading-7 text-slate-600">
                Այո, բայց խորհուրդ է տրվում վերջնական օգտագործումից առաջ
                վերանայել AI-ով ստեղծված հարցերը և պատասխանները։
              </p>
            </details>
          </div>
        </section>
      </article>
    </main>
  );
}