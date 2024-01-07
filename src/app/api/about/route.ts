import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const { rows } = await sql`SELECT * FROM project`;
	return NextResponse.json({ projects: rows }, { status: 200 });
}
