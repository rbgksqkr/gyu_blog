'use client';

import { IProject, IUserProfile } from '@/types/user';
import Image from 'next/image';
import Link from 'next/link';
import styles from './about.module.css';

interface AboutSectionProps {
	projectList: IProject[];
	userProfile: IUserProfile;
}

const AboutSection = ({ projectList, userProfile }: AboutSectionProps) => {
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
					<div>Email.&nbsp;{userProfile.email}</div>
					<div>Phone.&nbsp;{userProfile.phonenumber}</div>
					<div>
						Github.&nbsp;
						<Link className={styles.link} href={userProfile.githuburl}>
							{userProfile.githuburl}
						</Link>
					</div>
					<div>
						Blog.&nbsp;
						<Link className={styles.link} href={userProfile.blogurl}>
							{userProfile.blogurl}
						</Link>
					</div>
					<div>
						Portfolio.&nbsp;
						<Link className={styles.link} href={userProfile.portfoliourl}>
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
