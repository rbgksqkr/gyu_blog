export interface IPost {
	id: string;
	title: string;
	short_description: string;
	url_slug: string;
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

export interface ICommit {
	author: {
		login: string;
		avatar_url: string;
	};
	commit: {
		author: {
			date: Date;
		};
		url: string;
		message: string;
	};
	node_id: string;
	repository: {
		id: number;
		node_id: string;
		name: string;
		full_name: string;
		private: boolean;
	};
}
