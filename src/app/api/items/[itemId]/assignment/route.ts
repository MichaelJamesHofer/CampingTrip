import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/lib/database';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  const { searchParams } = new URL(request.url);
  const assignment = searchParams.get('assignment');
  
  if (!assignment || !['group', 'person1', 'person2', 'person3'].includes(assignment)) {
    return NextResponse.json(
      { error: 'Invalid assignment value' },
      { status: 400 }
    );
  }
  
  const db = new Database(process.env.DB as any);
  await db.updateItemAssignment(params.itemId, assignment);
  
  return NextResponse.json({ success: true });
}
