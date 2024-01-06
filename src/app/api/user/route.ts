import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import RssParser from 'rss-parser';

export async function GET(req: NextRequest) {
	const parser = new RssParser();
	const result = await parser.parseURL(`${process.env.NEXT_PUBLIC_RSS_BASE_URL}`);
	return NextResponse.json({ image: result.image }, { status: 200 });
}
