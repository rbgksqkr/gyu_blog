'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './post.module.css';
import { IPost, IUserInfo } from '@/types/post';

interface PostSectionProps {
	posts: IPost[];
	userInfo: IUserInfo;
}

const PostSection = ({ posts, userInfo }: PostSectionProps) => {
	return (
		<div className={styles.postWrapper}>
			<div className={styles.postLeftSection}>
				{userInfo ? (
					<div className={styles.userInfo}>
						<Image
							className={styles.profileImage}
							src={userInfo.url}
							alt='profile image'
							width={200}
							height={200}
							priority
						/>
						<div>블로그 : {userInfo.title}</div>
						<div>{'카테고리 >'}</div>
					</div>
				) : (
					<Image src='/default_profile.png' alt='profile image' width={200} height={200} priority />
				)}
			</div>
			<div className={styles.postRightSection}>
				{posts.length > 0 ? (
					<>
						<div className={styles.sortButtonWrapper}>
							<Link href='/post/date' className={styles.link}>
								최신순
							</Link>
							<Link href='/post/like' className={styles.link}>
								좋아요순
							</Link>
							<Link href='/post/comment' className={styles.link}>
								댓글순
							</Link>
							<Link href='/post/view' className={styles.link}>
								조회순
							</Link>
						</div>

						{posts.map((post) => (
							<Link href={`https://velog.io/@ghenmaru/${post.url_slug}`} className={styles.postItem} key={post.id}>
								<div className={styles.leftPost}>
									<div className={styles.postTitle}>{post.title}</div>
									<div className={styles.postContent}>{post.short_description}</div>
									<div className={styles.likeWrapper}>
										<div>좋아요 : {post.likes}</div>
										<div>댓글 : {post.comments_count}</div>
										<div>조회수 : {post.views}</div>
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
