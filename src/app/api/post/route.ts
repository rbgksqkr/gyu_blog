import { IPost } from '@/types/post';
import { NextRequest, NextResponse } from 'next/server';

const getPosts = async (cursor: string): Promise<IPost[]> => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_VELOG_BASE_URL}`, {
		method: 'POST',
		next: { revalidate: 300 },
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			operationName: 'Posts',
			variables: {
				username: 'ghenmaru',
				cursor: cursor,
			},
			query:
				'query Posts($cursor: ID, $username: String, $temp_only: Boolean, $tag: String, $limit: Int) { posts(cursor: $cursor, username: $username, temp_only: $temp_only, tag: $tag, limit: $limit) {id title thumbnail comments_count likes tags is_private, released_at updated_at short_description url_slug}}',
		}),
	});

	const data = await res.json();
	return data.data.posts;
};

const getViews = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_VELOG_BASE_URL}`, {
		method: 'POST',
		next: { revalidate: 300 },
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			cookie: `access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}; refresh_token=${process.env.NEXT_PUBLIC_REFRESH_TOKEN}`,
		},
		body: JSON.stringify({
			operationName: 'GetStats',
			variables: {
				post_id: 'a80de72a-703a-48ff-966a-64db829f252e',
			},
			query: 'query GetStats($post_id: ID!) {getStats(post_id: $post_id) {total count_by_day {count day}}}',
		}),
	});

	const data = await res.json();
	return data.data.getStats.total;
};

export async function GET(req: NextRequest) {
	const views = await getViews();
	const MAX_ITERATION = 10;
	let currentCursor = '';
	const posts: IPost[] = [];
	for (let i = 0; i < MAX_ITERATION; i++) {
		const result = await getPosts(currentCursor);
		posts.push(...result);
		const lastPost = result[result.length - 1];
		if (!lastPost) break;
		currentCursor = result[result.length - 1].id;
	}

	return NextResponse.json({ posts: posts }, { status: 200 });
}

export const dynamic = 'force-dynamic';
