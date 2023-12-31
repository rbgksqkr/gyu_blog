'use client';

import styles from './page.module.css';
import RssParser from 'rss-parser';

const HomePage = () => {
	const handleClick = async () => {
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
	};

	return (
		<div>
			<div onClick={handleClick}>호출</div>
		</div>
	);
};

export default HomePage;
