import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/lib/database';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || 'person1';
  
  const db = new Database(process.env.DB as any);
  const checklist = await db.getFullChecklist(userId);
  
  return NextResponse.json({ checklist });
}

export async function POST(request: NextRequest) {
  const { userId, itemId } = await request.json();
  
  if (!userId || !itemId) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }
  
  const db = new Database(process.env.DB as any);
  await db.toggleItemChecked(userId, itemId);
  
  return NextResponse.json({ success: true });
}
