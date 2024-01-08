import { IProject } from '@/types/user';
import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const { rows } = await sql`SELECT * FROM project`;
		return NextResponse.json({ projects: rows as IProject[] }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
