'use client';

import { useEffect, useState } from 'react';
import styles from './study.module.css';
import { getRecentCommitList } from '@/apis/user';
import { DAYS, PREV_WEEK, SECONDS_OF_DAY, TODAY } from '@/constants';
import { ICommit } from '@/types/post';

interface ICommitContainer {
	id: number;
	isCommitted: string | boolean;
	date: string | boolean;
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
		const todayIdx = new Date().getDay();
		const lastWeek = [
			['', false],
			['', false],
			['', false],
			['', false],
			['', false],
			['', false],
			['', false],
		];
		for (let i = 0; i < 7; i++) {
			const date = new Date(new Date(PREV_WEEK).getTime() + i * SECONDS_OF_DAY);
			const day = date.getDay();
			const offset = date.getTimezoneOffset() * 60000;
			const dateOffset = new Date(date.getTime() - offset);
			lastWeek[day][0] = dateOffset.toISOString().split('T')[0];
		}
		res.forEach((data) => {
			const date = new Date(data.commit.author.date);
			lastWeek[date.getDay()][1] = true;
		});

		setDateList(
			DAYS.map((day, idx) => ({
				id: idx,
				isCommitted: lastWeek[idx][1],
				date: lastWeek[idx][0],
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
								<div>{data.date}</div>
								<div className={styles.commitBox}>{data.isCommitted ? '✔️' : ''}</div>
							</div>
						))}
					</div>

					{commits.length > 0 ? (
						<div>
							{commits.map((data) => (
								<div key={data.node_id} className={styles.commitItem}>
									<div>
										{data.repository.full_name} : {data.commit.message} | {getYYMMDD(data.commit.author.date)}
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

const getYYMMDD = (date: Date) => {
	return date.toLocaleString().split('T')[0];
};

export default CommitList;
