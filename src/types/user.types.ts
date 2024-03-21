export type TUser = {
	name: string;
	role: string;
	email: string;
	password: string;
	phoneNumber: string;
	birthday?: string;
	clientCard?: string;
	address?: {
		postIndex?: string;
		town: string;
		streetHome: string;
		apartment: string;
		floor?: string;
		entrance?: string;
		intercom?: string;
	};
};

export type TUserId = {
	_id: string;
};

export type TUserFull = TUser & TUserId;
