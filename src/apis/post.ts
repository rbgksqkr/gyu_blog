import { IPost, IUserInfo } from '@/types/post';
import { Server } from './settings';

const getDescLikePost = (posts: IPost[]) => {
	return [...posts].sort((a, b) => {
		if (a.likes < b.likes) return 1;
		else if (a.likes > b.likes) return -1;
		return 0;
	});
};

const getDescCommentPost = (posts: IPost[]) => {
	return [...posts].sort((a, b) => {
		if (a.comments_count < b.comments_count) return 1;
		else if (a.comments_count > b.comments_count) return -1;
		return 0;
	});
};

const getDescViewPost = (posts: IPost[]) => {
	return [...posts].sort((a, b) => {
		if (a.views < b.views) return 1;
		else if (a.views > b.views) return -1;
		return 0;
	});
};

export const getVelogPost = async (sortBy?: string): Promise<IPost[]> => {
	const result = await Server.get('api/post');
	if (sortBy === 'like') return getDescLikePost(result.data.posts);
	else if (sortBy === 'comment') return getDescCommentPost(result.data.posts);
	else if (sortBy === 'view') return getDescViewPost(result.data.posts);
	return result.data.posts;
};

export const getVelogUserInfo = async (): Promise<IUserInfo> => {
	const result = await Server.get('api/user');
	return result.data.image;
};
