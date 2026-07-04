export const runtime = 'nodejs';
export const maxDuration = 300;


export async function POST(req: Request) {
  const formData = await req.formData();

  const pdf = formData.get('pdf');
  const difficulty = formData.get('difficulty') || 'mixed';
  const questionType = formData.get('questionType') || 'both';

  if (!(pdf instanceof File)) {
    return Response.json({ success: false, error: 'PDF file is required' }, { status: 400 });
  }

  const n8nFormData = new FormData();
  n8nFormData.append('pdf', pdf);
  n8nFormData.append('difficulty', String(difficulty));
  n8nFormData.append('questionType', String(questionType));

  const response = await fetch(process.env.N8N_WEBHOOK_URL!, {
    method: 'POST',
    body: n8nFormData,
  });

  const text = await response.text();

  console.log('n8n status:', response.status);
  console.log('n8n response:', text.slice(0, 1000));

  let data: unknown;

  try {
    data = JSON.parse(text);
  } catch {
    return Response.json(
      { success: false, error: 'n8n returned non-JSON response', details: text.slice(0, 500) },
      { status: 500 }
    );
  }

  if (!response.ok) {
    const message =
      data &&
      typeof data === 'object' &&
      'message' in data &&
      typeof data.message === 'string'
        ? data.message
        : 'Quiz generation failed';

    return Response.json(
      { success: false, error: message },
      { status: response.status }
    );
  }

  return Response.json(data);
}
