import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from '@/components/common/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: "Gyu's blog",
	description: 'Gyuhan Park님의 개인 블로그 페이지입니다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<NavBar />
				{children}
			</body>
		</html>
	);
}
