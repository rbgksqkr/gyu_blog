import { ICommitContainer } from '@/types/post';
import styles from './study.module.css';

const WeekCommitContainer = ({ commitWeekList }: { commitWeekList: ICommitContainer[] }) => {
	return (
		<>
			<div className={styles.commitTitle}> Gyuhan Park의 commit log</div>
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
