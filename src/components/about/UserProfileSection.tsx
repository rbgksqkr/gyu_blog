import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUserProfile } from '@/apis/user';
import { IUserProfile } from '@/types/user';
import styles from './about.module.css';

const UserProfileSection = () => {
	const [userProfile, setUserProfile] = useState<IUserProfile>({} as IUserProfile);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getUserProfile().then((res) => {
			setUserProfile(res);
			setIsLoading(false);
		});
	}, []);

	return (
		<>
			{isLoading ? (
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
		</>
	);
};

export default UserProfileSection;
