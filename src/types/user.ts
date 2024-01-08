export interface IProject {
	id: number;
	title: string;
	description: string;
	date: string;
	github_url: string;
	product_url: string;
	image_url: string;
}

export interface IUserProfile {
	email: string;
	phonenumber: string;
	githuburl: string;
	blogurl: string;
	portfoliourl: string;
}
