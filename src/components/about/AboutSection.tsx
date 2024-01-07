'use client';

import { getProjectList } from '@/apis/user';
import { IProject } from '@/types/post';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './about.module.css';

const USER_INFO = {
	email: 'rbgks1937@naver.com',
	phoneNumber: '010-4339-1937',
	githubUrl: 'https://github.com/rbgksqkr',
	blogUrl: 'https://velog.io/@ghenmaru',
	portfolioUrl: 'https://drive.google.com/file/d/1tBL3ntsa9JCub1acXsVAljtXXNuzJkWY/view?usp=sharing',
};

const AboutSection = () => {
	const [projectList, setProjectList] = useState<IProject[]>([]);

	useEffect(() => {
		getProjectList().then((res) => {
			setProjectList(res);
		});
	}, []);

	return (
		<div className={styles.aboutWrapper}>
			<div className={styles.projectTitle}>프로덕트의 가치를 만들어내는 프론트엔드 개발자, 박규한입니다.</div>
			<div className={styles.infoContainer}>
				<Image
					className={styles.profileImage}
					src='/image/github_profile.png'
					alt=''
					width={150}
					height={200}
					priority
				/>
				<div className={styles.rightInfoContainer}>
					<div>Email.&nbsp;{USER_INFO.email}</div>
					<div>Phone.&nbsp;{USER_INFO.phoneNumber}</div>
					<div>
						Github.&nbsp;
						<Link className={styles.link} href={USER_INFO.githubUrl}>
							{USER_INFO.githubUrl}
						</Link>
					</div>
					<div>
						Blog.&nbsp;
						<Link className={styles.link} href={USER_INFO.blogUrl}>
							{USER_INFO.blogUrl}
						</Link>
					</div>
					<div>
						Portfolio.&nbsp;
						<Link className={styles.link} href={USER_INFO.portfolioUrl}>
							GyuhanPark_Portfolio
						</Link>
					</div>
				</div>
			</div>
			<div className={styles.projectTitle}>Projects</div>
			{projectList.map((project) => (
				<div className={styles.projectContainer} key={project.id}>
					<Image src='/image/wheelpass.png' alt='' width={250} height={150} priority />
					<div className={styles.projectRightWrapper}>
						<div>{project.title}</div>
						<div>{project.description}</div>
						<div className={styles.projectDate}>{project.date}</div>
						<div>
							배포사이트 :&nbsp;
							<Link className={styles.link} href={project.producturl}>
								{project.producturl}
							</Link>
						</div>
						<div>
							github :&nbsp;
							<Link className={styles.link} href={project.githuburl}>
								{project.githuburl}
							</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default AboutSection;
