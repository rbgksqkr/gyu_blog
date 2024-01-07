import { IUserProfile } from '@/types/user';
import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const { rows } = await sql`SELECT * FROM users`;
	return NextResponse.json({ user: rows[0] as IUserProfile }, { status: 200 });
}
