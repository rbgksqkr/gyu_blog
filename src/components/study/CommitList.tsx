'use client';

import { useEffect, useState } from 'react';
import styles from './study.module.css';
import { getRecentCommitList } from '@/apis/user';
import { DAYS } from '@/constants';

interface ICommit {
	author: {
		login: string;
		avatar_url: string;
	};
	commit: {
		author: {
			date: Date;
		};
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

interface ICommitContainer {
	id: number;
	isCommitted: boolean;
	day: string;
}

const CommitList = () => {
	const [commits, setCommits] = useState<ICommit[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [dateList, setDateList] = useState<ICommitContainer[]>([]);

	useEffect(() => {
		getRecentCommitList().then((res) => {
			setCommits(res);
			convertDate(res);
			setIsLoading(false);
		});
	}, []);

	const convertDate = (res: ICommit[]) => {
		const lastWeek = [false, false, false, false, false, false, false];
		res.forEach((data) => {
			lastWeek[new Date(data.commit.author.date).getDay()] = true;
		});
		setDateList(
			DAYS.map((day, idx) => ({
				id: idx,
				isCommitted: lastWeek[idx],
				day,
			})),
		);
	};

	return (
		<>
			{isLoading ? (
				<div>로딩중...</div>
			) : (
				<>
					<div className={styles.commitTitle}> Gyuhan Park의 commit log</div>
					<div className={styles.dayContainer}>
						{dateList.map((data, idx) => (
							<div key={idx} className={styles.commitBoxContainer}>
								<div className={styles.day}>{data.day}</div>
								<div className={styles.commitBox}>{data.isCommitted ? '✔️' : ''}</div>
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
