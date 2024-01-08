'use client';

import { getProjectList, getUserProfile } from '@/apis/user';
import { IProject, IUserProfile } from '@/types/user';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './about.module.css';

const AboutSection = () => {
	const [projectList, setProjectList] = useState<IProject[]>([]);
	const [userProfile, setUserProfile] = useState<IUserProfile>({} as IUserProfile);
	const [isProjectLoading, setIsProjectLoading] = useState(true);
	const [isProfileLoading, setIsProfileLoading] = useState(true);

	useEffect(() => {
		getProjectList().then((res) => {
			setProjectList(res);
			setIsProjectLoading(false);
		});
		getUserProfile().then((res) => {
			setUserProfile(res);
			setIsProfileLoading(false);
		});
	}, []);

	return (
		<div className={styles.aboutWrapper}>
			<div className={styles.projectTitle}>프로덕트의 가치를 만들어내는 프론트엔드 개발자, 박규한입니다.</div>
			{isProfileLoading ? (
				<div>프로필 로딩중...</div>
			) : (
				<div className={`${styles.infoContainer} ${styles.hoverEvent}`}>
					<div className={styles.hoverBox}></div>
					<Image
						className={styles.profileImage}
						src='/image/github_profile.png'
						alt=''
						width={200}
						height={200}
						priority
					/>
					<div className={styles.rightInfoContainer}>
						<div>Email.&nbsp;{userProfile.email}</div>
						<div>Phone.&nbsp;{userProfile.phonenumber}</div>
						<div>
							Github.&nbsp;
							<Link className={styles.link} href={userProfile ? userProfile.githuburl : ''}>
								{userProfile.githuburl}
							</Link>
						</div>
						<div>
							Blog.&nbsp;
							<Link className={styles.link} href={userProfile ? userProfile.blogurl : ''}>
								{userProfile.blogurl}
							</Link>
						</div>
						<div>
							Portfolio.&nbsp;
							<Link className={styles.link} href={userProfile ? userProfile.portfoliourl : ''}>
								GyuhanPark_Portfolio
							</Link>
						</div>
					</div>
				</div>
			)}
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
		</div>
	);
};

export default AboutSection;
