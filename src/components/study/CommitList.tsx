import styles from './study.module.css';
import { ICommit } from '@/types/post';

const CommitList = ({ commits }: { commits: ICommit[] }) => {
	return (
		<>
			{commits.length > 0 ? (
				<div>
					{commits.map((data) => (
						<div key={data.node_id} className={styles.commitItem}>
							<div
								className={
									new Date().getDate() === new Date(data.commit.author.date).getDate() ? styles.todayCommit : ''
								}
							>
								{data.repository.full_name} : {data.commit.message} | {getYYMMDD(data.commit.author.date)}
							</div>
						</div>
					))}
				</div>
			) : (
				<div>오늘의 커밋 기록이 없습니다.</div>
			)}
		</>
	);
};

const getYYMMDD = (date: Date) => {
	return date.toLocaleString().split('T')[0];
};

export default CommitList;
