import { getVelogPost, getVelogUserInfo } from '@/apis/post';
import PostSection from '@/components/post/PostSection';

export const dynamicParams = true;

const PostCategoryPage = async ({ params }: { params: { sortBy: string } }) => {
	const posts = await getVelogPost(params.sortBy);
	const userInfo = await getVelogUserInfo();

	return (
		<>
			<PostSection posts={posts} userInfo={userInfo} />
		</>
	);
};

export default PostCategoryPage;
