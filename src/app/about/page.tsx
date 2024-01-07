import { getProjectList, getUserProfile } from '@/apis/user';
import AboutSection from '@/components/about/AboutSection';

const AboutPage = async () => {
	const projectList = await getProjectList();
	const userProfile = await getUserProfile();

	return (
		<>
			<AboutSection projectList={projectList} userProfile={userProfile} />
		</>
	);
};

export default AboutPage;
