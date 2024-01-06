import axios from 'axios';
import { IPost, IUserInfo } from '@/types/post';

export const getVelogPost = async (): Promise<IPost[] | undefined> => {
	try {
		const result = await axios.get('api/post');
		return result.data.posts;
	} catch (error) {
		console.error();
	}
};

export const getVelogUserInfo = async (): Promise<IUserInfo | undefined> => {
	try {
		const result = await axios.get('api/user');
		return result.data.image;
	} catch (error) {
		console.error();
	}
};
