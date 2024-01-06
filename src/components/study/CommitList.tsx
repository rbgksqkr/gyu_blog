'use client';

import { useEffect, useState } from 'react';
import styles from './study.module.css';
import { getRecentCommitList } from '@/apis/user';
import { DAYS } from '@/constants';
import { ICommit } from '@/types/post';

interface ICommitContainer {
	id: number;
	isCommitted: boolean;
	day: string;
	isToday: boolean;
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
		let todayIdx = new Date(res[res.length - 1].commit.author.date).getDay();
		res.forEach((data) => {
			lastWeek[new Date(data.commit.author.date).getDay()] = true;
		});
		setDateList(
			DAYS.map((day, idx) => ({
				id: idx,
				isCommitted: lastWeek[idx],
				day,
				isToday: idx === todayIdx ? true : false,
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
								<div className={data.isToday ? styles.today : styles.day}>
									{data.isToday ? `${data.day}(TODAY)` : data.day}
								</div>
								<div className={styles.commitBox}>{data.isCommitted ? '✔️' : ''}</div>
							</div>
						))}
					</div>

					{commits.length > 0 ? (
						<div>
							{commits.map((data) => (
								<div key={data.node_id} className={styles.commitItem}>
									<div>
										{data.repository.full_name} : {data.commit.message} |{' '}
										{data.commit.author.date.toLocaleString().split('T')[0]}
									</div>
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
