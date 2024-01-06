import { BASE_URL } from '@/constants';
import axios from 'axios';

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
