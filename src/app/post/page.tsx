import { getVelogPost, getVelogUserInfo } from '@/apis/post';
import PostSection from '@/components/post/PostSection';

const PostPage = async () => {
	const posts = await getVelogPost();
	const userInfo = await getVelogUserInfo();

	return (
		<>
			<PostSection posts={posts} userInfo={userInfo} />
			{/* <PostSection /> */}
		</>
	);
};

export default PostPage;
