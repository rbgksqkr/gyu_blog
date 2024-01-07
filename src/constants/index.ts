export const DAYS = ['SUN', 'MON', 'TUE', 'WEB', 'THR', 'FRI', 'SAT'];
export const BASE_URL =
	process.env.NODE_ENV === 'production' ? 'https://gyu-my-blog.vercel.app/' : 'http://localhost:3000/';
export const SECONDS_OF_DAY = 86400000;
export const TODAY = new Date(Date.now()).toISOString();
export const PREV_WEEK = new Date(Date.now() - 6 * SECONDS_OF_DAY).toISOString();
