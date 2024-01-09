import { PREV_WEEK, TODAY } from '@/constants';
import { ICommit } from '@/types/post';
import { IProject, IUserProfile } from '@/types/user';
import axios from 'axios';
import { Server } from './settings';

const getCommitList = async (): Promise<ICommit[]> => {
	const today = TODAY.split('T')[0];
	const prevWeek = PREV_WEEK.split('T')[0];
	const result = await axios.get(
		`https://api.github.com/search/commits?q=author:rbgksqkr+committer-date:${prevWeek}..${today}&per_page=100`,
		{
			headers: {
				Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
			},
			params: {
				sort: 'updated',
			},
		},
	);
	return result.data.items;
};

export const getRecentCommitList = async (): Promise<ICommit[]> => {
	const result = await getCommitList();
	result.sort((a, b) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime());
	return result;
};

export const getProjectList = async (): Promise<IProject[]> => {
	const result = await Server.get('api/about');
	return result.data.projects;
};

export const getUserProfile = async (): Promise<IUserProfile> => {
	const result = await Server.get('api/profile');
	return result.data.user;
};
