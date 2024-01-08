import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProjectList } from '@/apis/user';
import { IProject } from '@/types/user';
import styles from './about.module.css';

const ProjectSection = () => {
	const [projectList, setProjectList] = useState<IProject[]>([]);
	const [isProjectLoading, setIsProjectLoading] = useState(true);

	useEffect(() => {
		getProjectList().then((res) => {
			setProjectList(res);
			setIsProjectLoading(false);
		});
	}, []);

	return (
		<>
			{isProjectLoading ? (
				<div>프로젝트 로딩중...</div>
			) : (
				<div className={styles.projectContainer}>
					<div className={styles.projectTitle}>Projects</div>
					{projectList.map((project) => (
						<div className={styles.projectWrapper} key={project.id}>
							<div className={styles.projectLeftWrapper}>
								<Image src={project.image_url} alt='project image' width={200} height={200} priority />
							</div>
							<div className={styles.projectRightWrapper}>
								<div>{project.title}</div>
								<div>{project.description}</div>
								<div className={styles.projectDate}>{project.date}</div>
								<div>
									배포사이트 :&nbsp;
									<Link className={styles.link} href={project.product_url}>
										{project.product_url}
									</Link>
								</div>
								<div>
									github :&nbsp;
									<Link className={styles.link} href={project.github_url}>
										{project.github_url}
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default ProjectSection;
