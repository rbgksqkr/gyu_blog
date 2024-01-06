import { Server } from './settings';

export const getRecentCommitList = async () => {
	const result = await Server.get('api/commit');
	return result.data.items;
};
