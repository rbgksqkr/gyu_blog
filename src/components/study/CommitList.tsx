'use client';

import { useEffect, useState } from 'react';
import styles from './study.module.css';
import { getCommitList } from '@/apis/user';

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

const DAYS = ['MON', 'TUE', 'WEB', 'THR', 'FRI', 'SAT', 'SUN'];

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
					<div className={styles.commitTitle}> Gyuhan Park의 commit log</div>
					<div className={styles.dayContainer}>
						{DAYS.map((day, idx) => (
							<div key={idx} className={styles.commitBoxContainer}>
								<div className={styles.day}>{day}</div>
								<div className={styles.commitBox}>✔️</div>
							</div>
						))}
					</div>

					{commits.length > 0 ? (
						<div>
							{commits.map((data) => (
								<div key={data.node_id} className={styles.commitItem}>
									<div>commit message : {data.commit.message}</div>
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
