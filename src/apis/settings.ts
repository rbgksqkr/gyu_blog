import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://gyu-my-blog.vercel.app/' : 'http://localhost:3000/';

export const Server = axios.create({
	baseURL: BASE_URL,
	timeout: 3000,
	headers: {
		'Content-Type': 'application/json',
	},
});

Server.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

Server.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		console.error(error);
	},
);
