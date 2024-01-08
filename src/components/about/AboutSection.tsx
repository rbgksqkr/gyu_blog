'use client';

import styles from './about.module.css';
import ProjectSection from './ProjectSection';
import UserProfileSection from './UserProfileSection';

const AboutSection = () => {
	return (
		<div className={styles.aboutWrapper}>
			<div className={styles.projectTitle}>프로덕트의 가치를 만들어내는 프론트엔드 개발자, 박규한입니다.</div>
			<UserProfileSection />
			<ProjectSection />
		</div>
	);
};

export default AboutSection;
