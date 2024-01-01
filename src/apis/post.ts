import { IPost } from '@/types/post';
import axios from 'axios';

const BASE_URL = 'https://v2cdn.velog.io/graphql';
const USER_NAME = 'ghenmaru';

const getPosts = async (cursor: string): Promise<IPost[]> => {
	const response = await axios.post(BASE_URL, {
		operationName: 'Posts',
		variables: {
			username: USER_NAME,
			cursor: cursor,
		},
		query:
			'query Posts($cursor: ID, $username: String, $temp_only: Boolean, $tag: String, $limit: Int) { posts(cursor: $cursor, username: $username, temp_only: $temp_only, tag: $tag, limit: $limit) {id title thumbnail comments_count likes tags is_private, released_at updated_at short_description}}',
	});
	return response.data.data.posts;
};

export const getAllPost = async (): Promise<IPost[]> => {
	const MAX_ITERATION = 20;
	let currentCursor = '';
	const posts: IPost[] = [];
	while (MAX_ITERATION) {
		const result = await getPosts(currentCursor);
		posts.push(...result);
		const lastPost = result[result.length - 1];
		if (!lastPost) break;
		currentCursor = result[result.length - 1].id;
	}
	return posts;
};
