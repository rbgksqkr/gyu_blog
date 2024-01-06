import axios from 'axios';

const username = 'rbgksqkr';

export const getCommitList = async () => {
	const today = new Date().toISOString().split('T')[0];
	const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
	const response = await axios.get(
		`https://api.github.com/search/commits?q=author:${username}+committer-date:${yesterday}..${today}`,
		{
			headers: {
				Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
			},
			params: {
				sort: 'updated',
			},
		},
	);

	return response.data.items;
};
