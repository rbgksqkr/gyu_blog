import Link from 'next/link';
import styles from './common.module.css';

const NavBar = () => {
	return (
		<div className={styles.navBar}>
			<Link href='/' className={styles.link}>
				Home
			</Link>
			<Link href='/about' className={styles.link}>
				About
			</Link>
			<Link href='/post' className={styles.link}>
				Post
			</Link>
			<Link href='/study' className={styles.link}>
				TIL
			</Link>
		</div>
	);
};

export default NavBar;
