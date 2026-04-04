import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { NextResponse } from 'next/server';
import { getFirebaseAdminApp } from '@/lib/firebase-admin';

const PAGE_ID_PATTERN = /^[a-zA-Z0-9/_-]{1,256}$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }

  const { pageId, vote } = body as { pageId?: unknown; vote?: unknown };

  if (typeof pageId !== 'string' || !PAGE_ID_PATTERN.test(pageId)) {
    return NextResponse.json({ error: 'invalid_page_id' }, { status: 400 });
  }

  if (vote !== 'up' && vote !== 'down') {
    return NextResponse.json({ error: 'invalid_vote' }, { status: 400 });
  }

  const app = getFirebaseAdminApp();
  if (!app) {
    return NextResponse.json({ error: 'feedback_not_configured' }, { status: 503 });
  }

  const db = getFirestore(app);
  const ref = db.collection('doc_page_feedback').doc(pageId);
  const field = vote === 'up' ? 'helpful' : 'notHelpful';

  try {
    await ref.set(
      {
        [field]: FieldValue.increment(1),
        lastVoteAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  } catch {
    return NextResponse.json({ error: 'write_failed' }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}
