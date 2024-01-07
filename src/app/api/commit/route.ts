import { PREV_WEEK, TODAY } from '@/constants';
import { ICommit } from '@/types/post';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const today = TODAY.split('T')[0];
	const prevWeek = PREV_WEEK.split('T')[0];
	const result = await axios.get(
		`https://api.github.com/search/commits?q=author:rbgksqkr+committer-date:${prevWeek}..${today}&per_page=100`,
		{
			headers: {
				Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
			},
			params: {
				sort: 'updated',
			},
		},
	);
	const items: ICommit[] = result.data.items;
	items.sort((a, b) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime());
	return NextResponse.json({ items: result.data.items }, { status: 200 });
}
