'use client';

import { getProjectList } from '@/apis/user';
import { IProject } from '@/types/post';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './about.module.css';

const AboutSection = () => {
	const [projectList, setProjectList] = useState<IProject[]>([]);

	useEffect(() => {
		getProjectList().then((res) => {
			setProjectList(res);
		});
	}, []);

	return (
		<div className={styles.aboutWrapper}>
			<div>프로덕트의 가치를 만들어내는 프론트엔드 개발자, 박규한입니다.</div>
			<div className={styles.projectTitle}>프로젝트 소개</div>
			{projectList.map((project) => (
				<div className={styles.projectContainer} key={project.id}>
					<Image src='/image/wheelpass.png' alt='' width={250} height={150} priority />
					<div className={styles.projectRightWrapper}>
						<div>{project.title}</div>
						<div>{project.description}</div>
						<div className={styles.projectDate}>{project.date}</div>
						<div>
							배포사이트 : <Link href={project.producturl}>{project.producturl}</Link>
						</div>
						<div>
							github :<Link href={project.githuburl}>{project.githuburl}</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default AboutSection;
