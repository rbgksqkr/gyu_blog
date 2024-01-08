import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import NavBar from '@/components/common/NavBar';

export const metadata: Metadata = {
	title: "Gyu's blog",
	description: 'Gyuhan Park님의 개인 블로그 페이지입니다.',
};

const notoSansKr = Noto_Sans_KR({
	weight: ['400', '700'],
	subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={notoSansKr.className}>
				<NavBar />
				{children}
			</body>
		</html>
	);
}
