export type Difficulty = "mixed" | "easy" | "medium" | "hard";
export type QuestionType = "both" | "single" | "multiple";
export type Locale = "hy" | "en";

export const homeContent = {
  hy: {
    htmlLang: "hy",
    source: "homepage",
    langSwitchLabel: "EN",
    langSwitchHref: "/en",

    nav: {
      howItWorks: "Ինչպես է աշխատում",
      benefits: "Առավելություններ",
      subscribe: "Բաժանորդագրություն",
      faq: "ՀՏՀ",
    },

    hero: {
      badge: "AI-ով աշխատող հայկական թեստերի գեներատոր",
      title: "AI թեստերի գեներատոր PDF ֆայլերից",
      description:
        "Վերբեռնեք PDF դասանյութը և մի քանի րոպեում ստացեք պատրաստի հարցաշար՝ ճիշտ պատասխաններով, տարբերակներով և բացատրություններով։ Testaran-ը օգնում է ուսուցիչներին արագ ստեղծել հայերեն թեստեր դասի, ստուգման կամ կրկնության համար։",
    },

    form: {
      uploadTitle: "Վերբեռնել PDF",
      chooseFile: "Ընտրեք PDF ֆայլ",
      difficulty: "Բարդություն",
      questionType: "Հարցերի տեսակ",
      submit: "Ստեղծել թեստ",
      loading: "Թեստը ստեղծվում է...",
      freeLimitBefore: "Այս պահին կարող եք ստեղծել մինչև ",
      freeLimitStrong: "2 թեստ",
      freeLimitAfter:
        "։ Եթե ցանկանում եք ավելի շատ օգտագործել Testaran-ը, թողեք ձեր էլ․ հասցեն ներքևում։",
    },

    difficulties: [
      { value: "mixed", label: "Խառը" },
      { value: "easy", label: "Հեշտ" },
      { value: "medium", label: "Միջին" },
      { value: "hard", label: "Բարդ" },
    ] as Array<{ value: Difficulty; label: string }>,

    questionTypes: [
      { value: "both", label: "Երկուսն էլ" },
      { value: "single", label: "Մեկ ճիշտ պատասխան" },
      { value: "multiple", label: "Մի քանի ճիշտ պատասխան" },
    ] as Array<{ value: QuestionType; label: string }>,

    subscribe: {
      icon: "✉",
      title: "Ցանկանու՞մ եք ավելի շատ օգտագործել Testaran-ը",
      descriptionBefore: "Այս պահին Testaran-ը հասանելի է անվճար մինչև",
      descriptionStrong: "2 թեստ",
      descriptionAfter:
        "ստեղծելու համար։ Եթե ցանկանում եք ավելի շատ օգտագործել համակարգը, թողեք ձեր էլ․ հասցեն, և մենք կտեղեկացնենք հասանելիության և նոր հնարավորությունների մասին։",
      emailLabel: "Էլ․ հասցե",
      placeholder: "Ձեր էլ․ հասցեն",
      button: "Բաժանորդագրվել",
      loading: "Ուղարկվում է...",
      success:
        "Շնորհակալություն։ Ձեր էլ․ հասցեն պահպանվեց, և մենք կտեղեկացնենք նոր հնարավորությունների մասին։",
    },

    errors: {
      requiredPdf: "Խնդրում ենք նախ ընտրել PDF ֆայլ։",
      onlyPdf: "Խնդրում ենք վերբեռնել միայն PDF ֆայլ։",
      requiredEmail: "Խնդրում ենք մուտքագրել էլ․ հասցե։",
      invalidEmail: "Խնդրում ենք մուտքագրել ճիշտ էլ․ հասցե։",
      unknown: "Անհայտ սխալ է տեղի ունեցել։",
      generateFailed: "Թեստի ստեղծումը ձախողվեց։",
      subscribeFailed: "Բաժանորդագրումը ձախողվեց։",
      limitReached:
        "Դուք արդեն օգտագործել եք անվճար 2 թեստի ստեղծման հնարավորությունը։ Եթե ցանկանում եք ավելի շատ օգտագործել Testaran-ը, թողեք ձեր էլ․ հասցեն ներքևում։",
    },

    softwareDescription:
      "Testaran-ը AI թեստերի գեներատոր է, որը PDF դասանյութերից ստեղծում է պատրաստի հարցաշարեր ուսուցիչների համար։",

    downloadModal: {
      defaultTitle: "✅ Թեստը հաջողությամբ ստեղծվեց",
      description: "Կարող եք ներբեռնել անհրաժեշտ տարբերակը.",
      download: "Ներբեռնել",
      close: "Փակել",
      generateAnother: "Ստեղծել նոր թեստ",
    },

    howItWorksTitle: "Ինչպես է աշխատում Testaran-ը",
    howItWorksSubtitle: "PDF-ից թեստ ստեղծելը կատարվում է երեք պարզ քայլով։",

    howItWorksItems: [
      {
        step: "1",
        title: "Վերբեռնեք PDF ֆայլը",
        text: "Ընտրեք դասագիրք, ուսումնական նյութ կամ դասախոսության PDF ֆայլ։",
      },
      {
        step: "2",
        title: "AI-ն վերլուծում է նյութը",
        text: "Համակարգը կարդում է բովանդակությունը և ստեղծում համապատասխան հարցեր։",
      },
      {
        step: "3",
        title: "Ներբեռնեք պատրաստի թեստը",
        text: "Ստացեք թեստը PDF և Excel ձևաչափերով՝ պատասխաններով կամ առանց պատասխանների։",
      },
    ],

    seoLinks: {
        title: "Ինչու օգտագործել Testaran-ը",
        description:
            "Testaran-ը AI թեստերի գեներատոր է, որը օգնում է ուսուցիչներին PDF դասանյութերից արագ ստեղծել հայերեն թեստեր։",
        pdfText: "Ցանկանու՞մ եք հասկանալ քայլ առ քայլ գործընթացը։",
        pdfLink: "Իմանալ ավելին՝ ինչպես ստեղծել թեստ PDF ֆայլից",
        pdfHref: "/pdf-to-quiz",
        aiText: "Փնտրու՞մ եք AI գործիք ուսուցիչների համար։",
        aiLink: "Կարդալ ավելին AI թեստերի գեներատորի մասին",
        aiHref: "/ai-test-generator",
    },

    benefitsTitle: "Թեստերի գեներատոր ուսուցիչների համար",
    benefitsDescription:
      "Testaran-ը ստեղծված է այն դեպքերի համար, երբ անհրաժեշտ է արագ պատրաստել հարցաշար ուսումնական նյութից։ Այն կարող է օգնել դասավանդողներին, ուսումնական կենտրոններին և մասնավոր դասախոսներին PDF ֆայլերից ստանալ օգտագործման պատրաստ թեստեր։",

    benefits: [
      {
        title: "Ուսուցիչների համար",
        text: "Արագ պատրաստեք հարցաշարեր դասի, տնային աշխատանքի, ստուգման կամ կրկնության համար։",
      },
      {
        title: "Հայերեն նյութերի համար",
        text: "Testaran-ը նախատեսված է նաև հայերեն PDF դասանյութերից հայերեն թեստեր ստեղծելու համար։",
      },
      {
        title: "Պատրաստի արտահանում",
        text: "Ստացեք թեստի տարբերակներ, ճիշտ պատասխաններ և բացատրություններ՝ հարմար օգտագործման համար։",
      },
    ],

    faqTitle: "Հաճախ տրվող հարցեր",
    faqSubtitle: "Ամենակարևոր հարցերը Testaran-ի և PDF-ից թեստ ստեղծելու մասին։",

    faqs: [
      {
        question: "Ի՞նչ է Testaran-ը",
        answer:
          "Testaran-ը AI թեստերի գեներատոր է, որը PDF դասանյութերից ստեղծում է պատրաստի հարցաշարեր՝ հարցերով, տարբերակներով, ճիշտ պատասխաններով և բացատրություններով։",
      },
      {
        question: "Կարո՞ղ եմ PDF ֆայլից թեստ ստեղծել",
        answer:
          "Այո։ Կարող եք վերբեռնել PDF ֆայլ, ընտրել բարդությունը և հարցերի տեսակը, իսկ համակարգը կստեղծի թեստ այդ նյութի հիման վրա։",
      },
      {
        question: "Արդյո՞ք Testaran-ը աշխատում է հայերենով",
        answer:
          "Այո։ Testaran-ը նախատեսված է հայերեն նյութերից հայերեն թեստեր ստեղծելու համար։",
      },
      {
        question: "Ինչպիսի՞ PDF ֆայլեր կարող եմ վերբեռնել",
        answer:
          "Լավագույն արդյունքի համար վերբեռնեք այն PDF ֆայլերը, որոնցում տեքստը հնարավոր է կարդալ։ Սքանավորված կամ նկարային PDF ֆայլերը կարող են ճիշտ չմշակվել։",
      },
      {
        question: "Արդյո՞ք AI-ով ստեղծված հարցերը պետք է ստուգել",
        answer:
          "Այո։ Testaran-ը խնայում է ժամանակ և ստեղծում է լավ նախնական տարբերակ, բայց վերջնական օգտագործումից առաջ խորհուրդ է տրվում վերանայել հարցերը։",
      },
      {
        question: "Ի՞նչ ձևաչափերով կարող եմ ներբեռնել թեստը",
        answer:
          "Թեստը կարող եք ներբեռնել PDF և Excel ձևաչափերով՝ պատասխաններով կամ առանց պատասխանների։",
      },
    ],

    footer: {
      description:
        "AI-ով թեստերի գեներատոր, որը օգնում է ուսուցիչներին մի քանի րոպեում ստեղծել պատրաստի թեստեր PDF ֆայլերից։",
      contact: "Կապվել մեզ հետ",
      rights: "© 2026 Testaran. Բոլոր իրավունքները պաշտպանված են։",
    },
  },

  en: {
    htmlLang: "en",
    source: "english_homepage",
    langSwitchLabel: "Հայ",
    langSwitchHref: "/",

    nav: {
      howItWorks: "How it works",
      benefits: "Benefits",
      subscribe: "Subscribe",
      faq: "FAQ",
    },

    hero: {
      badge: "AI-powered quiz generator for teachers",
      title: "AI Quiz Generator from PDF",
      description:
        "Upload a PDF learning material and create a ready-to-use quiz in minutes. Testaran helps teachers generate Armenian quiz questions, answer options, correct answers, and explanations from PDF files.",
    },

    form: {
      uploadTitle: "Upload PDF",
      chooseFile: "Choose a PDF file",
      difficulty: "Difficulty",
      questionType: "Question type",
      submit: "Create quiz",
      loading: "Creating quiz...",
      freeLimitBefore: "At the moment, you can create up to",
      freeLimitStrong: "2 quizzes",
      freeLimitAfter:
        "for free. If you want to use Testaran more, leave your email below.",
    },

    difficulties: [
      { value: "mixed", label: "Mixed" },
      { value: "easy", label: "Easy" },
      { value: "medium", label: "Medium" },
      { value: "hard", label: "Hard" },
    ] as Array<{ value: Difficulty; label: string }>,

    questionTypes: [
      { value: "both", label: "Both" },
      { value: "single", label: "One correct answer" },
      { value: "multiple", label: "Multiple correct answers" },
    ] as Array<{ value: QuestionType; label: string }>,

    subscribe: {
      icon: "✉",
      title: "Want to use Testaran more?",
      descriptionBefore: "Testaran is currently available for up to",
      descriptionStrong: "2 free quiz generations",
      descriptionAfter:
        ". Leave your email and we will notify you about access and new features.",
      emailLabel: "Email",
      placeholder: "Your email",
      button: "Subscribe",
      loading: "Sending...",
      success:
        "Thank you. Your email has been saved, and we will notify you about new features.",
    },

    errors: {
      requiredPdf: "Please choose a PDF file first.",
      onlyPdf: "Please upload only a PDF file.",
      requiredEmail: "Please enter your email.",
      invalidEmail: "Please enter a valid email address.",
      unknown: "An unknown error occurred.",
      generateFailed: "Quiz generation failed.",
      subscribeFailed: "Subscription failed.",
      limitReached:
        "You have already used the 2 free quiz generations. If you want to use Testaran more, leave your email below.",
    },

    softwareDescription:
      "Testaran is an AI quiz generator that helps teachers create ready-to-use quizzes from PDF learning materials.",

    downloadModal: {
      defaultTitle: "✅ Quiz created successfully",
      description: "You can download the version you need:",
      download: "Download",
      close: "Close",
      generateAnother: "Create another quiz",
    },

    howItWorksTitle: "How Testaran works",
    howItWorksSubtitle: "Create a quiz from a PDF file in three simple steps.",

    howItWorksItems: [
      {
        step: "1",
        title: "Upload your PDF",
        text: "Choose a textbook, learning material, lesson summary, or lecture PDF.",
      },
      {
        step: "2",
        title: "AI analyzes the material",
        text: "Testaran reads the content and generates relevant quiz questions.",
      },
      {
        step: "3",
        title: "Download the quiz",
        text: "Get ready-to-use quiz files in PDF and Excel formats, with or without answers.",
      },
    ],

    seoLinks: {
        title: "Why use Testaran?",
        description:
            "Testaran is an AI quiz generator that helps teachers create Armenian quizzes from PDF learning materials.",
        pdfText: "Want to understand the step-by-step process?",
        pdfLink: "Learn how to create a quiz from a PDF",
        pdfHref: "/en/pdf-to-quiz",
        aiText: "Looking for an AI tool for teachers?",
        aiLink: "Learn more about the AI quiz generator",
        aiHref: "/en/ai-test-generator",
    },

    benefitsTitle: "Quiz generator for teachers",
    benefitsDescription:
      "Testaran is built for cases where teachers need to quickly prepare quizzes from learning materials. It helps teachers, training centers, and tutors create ready-to-use quizzes from PDF files.",

    benefits: [
      {
        title: "For teachers",
        text: "Prepare quizzes faster for lessons, homework, assessment, or revision.",
      },
      {
        title: "For Armenian materials",
        text: "Testaran helps create Armenian quizzes from Armenian PDF learning materials.",
      },
      {
        title: "Ready export",
        text: "Get quiz versions, correct answers, and explanations in convenient formats.",
      },
    ],

    faqTitle: "Frequently asked questions",
    faqSubtitle: "Important questions about Testaran and PDF quiz generation.",

    faqs: [
      {
        question: "What is Testaran?",
        answer:
          "Testaran is an AI quiz generator that creates ready-to-use quizzes from PDF learning materials, including questions, answer options, correct answers, and explanations.",
      },
      {
        question: "Can I create a quiz from a PDF file?",
        answer:
          "Yes. Upload a readable PDF file, choose the difficulty and question type, and Testaran will generate a quiz from that material.",
      },
      {
        question: "Can Testaran work with Armenian content?",
        answer:
          "Yes. Testaran is designed to help create Armenian quizzes from Armenian learning materials.",
      },
      {
        question: "What PDF files work best?",
        answer:
          "Readable PDF files work best. Scanned or image-only PDF files may not be processed correctly.",
      },
      {
        question: "Should I review AI-generated questions?",
        answer:
          "Yes. Testaran saves time and creates a strong first draft, but teachers should review questions before final use.",
      },
      {
        question: "What formats can I download?",
        answer:
          "You can download quiz files in PDF and Excel formats, with or without answers.",
      },
    ],

    footer: {
      description:
        "AI quiz generator that helps teachers create ready-to-use quizzes from PDF files in minutes.",
      contact: "Contact us",
      rights: "© 2026 Testaran. All rights reserved.",
    },
  },
} as const;

export type HomeContent = (typeof homeContent)[keyof typeof homeContent];
