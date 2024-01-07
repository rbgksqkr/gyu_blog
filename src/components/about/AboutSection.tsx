'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './about.module.css';

const AboutSection = () => {
	const [projectList, setProjectList] = useState([
		{
			id: 0,
			title: '휠패스',
			description: '휠체어 이용자를 위한 인근 역 엘레베이터로부터 문화시설 길 안내 서비스',
			date: '2023.07 - 2023.09',
			githubUrl: 'https://github.com/BFGGyu/BF-frontend',
			productUrl: 'https://wheelpass.shop/',
			imageUrl: '/image/wheelpass.png',
		},
	]);

	return (
		<div className={styles.aboutWrapper}>
			<div>프로덕트의 가치를 만들어내는 프론트엔드 개발자, 박규한입니다.</div>
			<div className={styles.projectTitle}>프로젝트 소개</div>
			{projectList.map((project) => (
				<div className={styles.projectContainer} key={project.id}>
					<Image src='/image/wheelpass.png' alt='' width={250} height={150} />
					<div className={styles.projectRightWrapper}>
						<div>{project.title}</div>
						<div>{project.description}</div>
						<div className={styles.projectDate}>{project.date}</div>
						<div>
							배포사이트 : <Link href={project.productUrl}>{project.productUrl}</Link>
						</div>
						<div>
							github :<Link href={project.githubUrl}>{project.githubUrl}</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default AboutSection;
