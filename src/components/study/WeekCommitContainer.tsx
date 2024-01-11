import { ICommitContainer } from '@/types/post';
import Image from 'next/image';
import Link from 'next/link';
import styles from './study.module.css';

const WeekCommitContainer = ({
	todayCommitCount,
	lastWeekCommitCount,
	commitWeekList,
}: {
	todayCommitCount: number;
	lastWeekCommitCount: number;
	commitWeekList: ICommitContainer[];
}) => {
	return (
		<>
			<div className={styles.commitHeader}>
				<Link href='https://github.com/rbgksqkr' className={styles.githubLogo}>
					<Image src='/image/github.png' alt='github logo' width={100} height={100} />
				</Link>
				<div className={styles.commitTitle}>Gyuhan Park의 commit log</div>
				<div className={styles.commitCountWrapper}>
					<div>TODAY : {todayCommitCount}</div>
					<div>LAST WEEK : {lastWeekCommitCount}</div>
				</div>
			</div>
			<div className={styles.dayContainer}>
				{commitWeekList.map((data, idx) => (
					<div key={idx} className={styles.commitBoxContainer}>
						<div className={data.isToday ? styles.today : styles.day}>
							{data.isToday ? `${data.day}(TODAY)` : data.day}
						</div>
						<div>{data.date}</div>
						<div className={styles.commitBox}>{data.isCommitted ? '✔️' : ''}</div>
					</div>
				))}
			</div>
		</>
	);
};

export default WeekCommitContainer;
