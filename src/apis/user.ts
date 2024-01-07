import { IProject } from '@/types/post';
import { Server } from './settings';

export const getRecentCommitList = async () => {
	const result = await Server.get('api/commit');
	return result.data.items;
};

export const getProjectList = async (): Promise<IProject[]> => {
	const result = await Server.get('api/about');
	return result.data.projects;
};
