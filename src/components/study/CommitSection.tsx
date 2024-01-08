'use client';

import { useCallback, useEffect, useState } from 'react';
import { getRecentCommitList } from '@/apis/user';
import { DAYS, PREV_WEEK, SECONDS_OF_DAY } from '@/constants';
import { ICommit, ICommitContainer } from '@/types/post';
import WeekCommitContainer from './WeekCommitContainer';
import CommitList from './CommitList';

const CommitSection = () => {
	const [commitWeekList, setCommitWeekList] = useState<ICommitContainer[]>([]);
	const [commits, setCommits] = useState<ICommit[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const handleDateList = useCallback((res: ICommit[]) => {
		const lastWeekCommit = convertDate(res);
		const todayIdx = new Date().getDay();
		setCommitWeekList(
			DAYS.map((day, idx) => ({
				id: idx,
				isCommitted: lastWeekCommit[idx][1],
				date: lastWeekCommit[idx][0],
				day,
				isToday: idx === todayIdx ? true : false,
			})),
		);
	}, []);

	useEffect(() => {
		getRecentCommitList().then((res) => {
			setCommits(res);
			handleDateList(res);
			setIsLoading(false);
		});
	}, [handleDateList]);

	return (
		<>
			{isLoading ? (
				<div>로딩중...</div>
			) : (
				<>
					<WeekCommitContainer commitWeekList={commitWeekList} />
					<CommitList commits={commits} />
				</>
			)}
		</>
	);
};

const convertDate = (res: ICommit[]) => {
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

	return lastWeek;
};

export default CommitSection;
