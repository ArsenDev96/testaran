import { NextResponse } from "next/server";

type SubscribeRequestBody = {
  email?: string;
};

type N8nSubscribeResponse = {
  success?: boolean;
  error?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubscribeRequestBody;
    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "Էլ․ հասցեն պարտադիր է։",
        },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Խնդրում ենք մուտքագրել ճիշտ էլ․ հասցե։",
        },
        { status: 400 },
      );
    }

    const webhookUrl = process.env.N8N_SUBSCRIBE_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("Missing N8N_SUBSCRIBE_WEBHOOK_URL");

      return NextResponse.json(
        {
          success: false,
          error: "Բաժանորդագրումը ժամանակավորապես հասանելի չէ։",
        },
        { status: 500 },
      );
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        source: "testaran.site",
        page: "/",
        subscribedAt: new Date().toISOString(),
      }),
    });

    const responseData = (await webhookResponse
      .json()
      .catch(() => null)) as N8nSubscribeResponse | null;

    if (!webhookResponse.ok || responseData?.success === false) {
      return NextResponse.json(
        {
          success: false,
          error:
            responseData?.error ||
            "Բաժանորդագրումը ձախողվեց։ Խնդրում ենք փորձել կրկին։",
        },
        {
          status: webhookResponse.status === 200 ? 400 : webhookResponse.status,
        },
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Subscribe error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Անհայտ սխալ է տեղի ունեցել։",
      },
      { status: 500 },
    );
  }
}