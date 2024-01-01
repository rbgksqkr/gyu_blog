import axios from 'axios';
import RssParser from 'rss-parser';
import { IPost, IUserInfo } from '@/types/post';

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
	return posts;
};

export const getRssUserInfo = async (): Promise<IUserInfo | undefined> => {
	try {
		const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
		const parser = new RssParser();
		const result = await parser.parseURL(CORS_PROXY + 'https://v2.velog.io/rss/@ghenmaru');
		// if (result.image === undefined) throw Error('[ERROR] 유저 이미지가 없습니다.');
		return result.image;
	} catch (error) {
		console.error();
	}
};
