'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './post.module.css';
import { getVelogPost, getVelogUserInfo } from '@/apis/post';
import { IPost, IUserInfo } from '@/types/post';

const PostSection = () => {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [userInfo, setUserInfo] = useState<IUserInfo>();

	useEffect(() => {
		getVelogPost().then((res) => {
			setPosts(res);
		});
		getVelogUserInfo().then((res) => {
			setUserInfo(res);
		});
	}, []);

	return (
		<div className={styles.postWrapper}>
			<div className={styles.postLeftSection}>
				{userInfo ? (
					<>
						<Image src={userInfo.url} alt='profile image' width={200} height={200} priority />
						<div>{userInfo.title}</div>
					</>
				) : (
					<Image src='/default_profile.png' alt='profile image' width={200} height={200} priority />
				)}
			</div>
			<div className={styles.postRightSection}>
				{posts.length > 0 ? (
					<>
						{posts.map((post) => (
							<Link
								href={`${process.env.NEXT_PUBLIC_VELOG_BASE_URL}/${post.url_slug}`}
								className={styles.postItem}
								key={post.id}
							>
								<div className={styles.leftPost}>
									<div className={styles.postTitle}>{post.title}</div>
									<div className={styles.postContent}>{post.short_description}</div>
									<div className={styles.likeWrapper}>
										<div>좋아요 : {post.likes}</div>
										<div>댓글 : {post.comments_count}</div>
									</div>
									<div className={styles.tagWrapper}>
										{post.tags.map((tag, idx) => (
											<div className={styles.tag} key={idx}>
												{tag}
											</div>
										))}
									</div>
								</div>
								{post.thumbnail && <Image src={post.thumbnail} alt='thumbnail' width={200} height={120} />}
							</Link>
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
