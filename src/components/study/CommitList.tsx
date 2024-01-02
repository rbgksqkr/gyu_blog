'use client';

import { getCommitList } from '@/apis/user';
import { useEffect, useState } from 'react';

interface ICommit {
	author: {
		login: string;
		avatar_url: string;
	};
	commit: {
		url: string;
		message: string;
	};
	node_id: string;
	repository: {
		id: number;
		node_id: string;
		name: string;
		full_name: string;
		private: boolean;
	};
}

const CommitList = () => {
	const [commits, setCommits] = useState<ICommit[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getCommitList().then((res) => {
			setCommits(res);
			setIsLoading(false);
		});
	}, []);
	return (
		<>
			{isLoading ? (
				<div>로딩중...</div>
			) : (
				<>
					{commits.length > 0 ? (
						<div>
							{commits.map((data) => (
								<div key={data.node_id}>
									<div>author : {data.author.login}</div>
									<div>commit : {data.commit.message}</div>
								</div>
							))}
						</div>
					) : (
						<div>오늘의 커밋 기록이 없습니다.</div>
					)}
				</>
			)}
		</>
	);
};

export default CommitList;
