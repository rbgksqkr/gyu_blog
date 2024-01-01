export interface IPost {
	id: string;
	title: string;
	short_description: string;
	thumbnail: string;
	released_at: string;
	updated_at: string;
	comments_count: number;
	tags: string[];
	is_private: boolean | null;
	likes: number;
}

export interface IUserInfo {
	url: string;
	link?: string | undefined;
	title?: string | undefined;
}
