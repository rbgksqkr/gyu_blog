'use client';

import React, { useEffect, useState } from 'react';
import styles from './post.module.css';
import { getAllPost, getRssUserInfo } from '@/apis/post';
import { IPost, IUserInfo } from '@/types/post';
import Image from 'next/image';

const PostSection = () => {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [userInfo, setUserInfo] = useState<IUserInfo | undefined>();

	useEffect(() => {
		getAllPost().then((res) => {
			setPosts(res);
		});

		getRssUserInfo().then((res) => {
			setUserInfo(res);
		});
	}, []);

	return (
		<div className={styles.postWrapper}>
			<div className={styles.postLeftSection}>
				<Image src='/default_profile.png' alt='profile image' width={200} height={200} priority />
				{userInfo && (
					<>
						<Image src={userInfo.url} alt='profile image' width={200} height={200} priority />
						<div>{userInfo.title}</div>
					</>
				)}
			</div>
			<div className={styles.postRightSection}>
				{posts.length > 0 ? (
					<>
						{posts.map((post) => (
							<div className={styles.postItem} key={post.id}>
								<div className={styles.leftPost}>
									<div className={styles.postTitle}>{post.title}</div>
									<div className={styles.postContent}>{post.short_description}</div>
								</div>
								{post.thumbnail && <Image src={post.thumbnail} alt='thumbnail' width={200} height={120} />}
							</div>
						))}
					</>
				) : (
					<div>게시글이 없습니다.</div>
				)}
			</div>
		</div>
	);
};

export default PostSection;
