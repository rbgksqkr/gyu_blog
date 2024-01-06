import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const today = new Date().toISOString().split('T')[0];
	const prevDay = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];

	const result = await axios.get(
		`https://api.github.com/search/commits?q=author:rbgksqkr+committer-date:${prevDay}..${today}&per_page=100`,
		{
			headers: {
				Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
			},
			params: {
				sort: 'updated',
			},
		},
	);

	return NextResponse.json({ items: result.data.items }, { status: 200 });
}
