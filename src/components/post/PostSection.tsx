'use client';

import React, { useEffect, useState } from 'react';
import RssParser from 'rss-parser';
import { getAllPost } from '@/apis/post';
import { IPost } from '@/types/post';

const PostSection = () => {
	const [posts, setPosts] = useState<IPost[]>([]);

	const handleRSS = async () => {
		const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
		const parser = new RssParser();
		await parser.parseURL(CORS_PROXY + 'https://v2.velog.io/rss/@ghenmaru', function (err, feed) {
			if (err) throw err;
			// console.log('feed :', feed);
			feed.items.forEach(function (entry) {
				// console.log('entry :', entry);
				// console.log(entry.title + ':' + entry.link);
			});
		});
		// await getPostId();
	};

	useEffect(() => {
		getAllPost().then((res) => {
			setPosts(res);
		});
	}, []);

	return <div>PostSection</div>;
};

export default PostSection;
