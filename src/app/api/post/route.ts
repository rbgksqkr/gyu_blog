import { IPost } from '@/types/post';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const getPosts = async (cursor: string): Promise<IPost[]> => {
	const response = await axios.post(`${process.env.NEXT_PUBLIC_VELOG_BASE_URL}`, {
		operationName: 'Posts',
		variables: {
			username: 'ghenmaru',
			cursor: cursor,
		},
		query:
			'query Posts($cursor: ID, $username: String, $temp_only: Boolean, $tag: String, $limit: Int) { posts(cursor: $cursor, username: $username, temp_only: $temp_only, tag: $tag, limit: $limit) {id title thumbnail comments_count likes tags is_private, released_at updated_at short_description url_slug}}',
	});
	return response.data.data.posts;
};

export async function GET(req: NextRequest) {
	const MAX_ITERATION = 1;
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
