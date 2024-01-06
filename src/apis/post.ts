import axios from 'axios';
import { IPost, IUserInfo } from '@/types/post';
import { Server } from './settings';

export const getVelogPost = async (): Promise<IPost[]> => {
	const result = await Server.get('api/post');
	return result.data.posts;
};

export const getVelogUserInfo = async (): Promise<IUserInfo> => {
	const result = await Server.get('api/user');
	return result.data.image;
};
