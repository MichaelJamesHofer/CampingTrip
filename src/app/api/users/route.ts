import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/lib/database';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const db = new Database(process.env.DB as any);
  const users = await db.getUsers();
  
  return NextResponse.json({ users });
}
