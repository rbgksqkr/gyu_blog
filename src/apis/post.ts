import { IPost, IUserInfo } from '@/types/post';
import { Server } from './settings';

// export const getVelogPost = async (): Promise<IPost[]> => {
// 	const result = await Server.get('api/post');
// 	return result.data.posts;
// };

const TEST_BASE_URL =
	process.env.NODE_ENV === 'production' ? 'https://gyu-my-blog.vercel.app/' : 'http://localhost:3000/';

export const getVelogPost = async (): Promise<IPost[]> => {
	const resultJson = await fetch(`${TEST_BASE_URL}/api/post`, { cache: 'no-store' });
	const result = await resultJson.json();
	return result.posts;
};

export const getVelogUserInfo = async (): Promise<IUserInfo> => {
	const result = await Server.get('api/user');
	return result.data.image;
};
