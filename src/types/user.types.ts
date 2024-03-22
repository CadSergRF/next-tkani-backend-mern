export type TUserFullName = {
	name: string;
	surname: string;
	middleName?: string;
};

export type TUserPersonalData = {
	fullName: TUserFullName;
	birthday?: string;
	email: string;
	phone: string;
};

export type TUserAddress = {
	postIndex?: string;
	town: string;
	streetHome: string;
	apartment: string;
	floor?: string;
	entrance?: string;
	intercom?: string;
};

export type TUserAuthData = {
	role?: string;
	password: string;
	acceptedCookies: boolean;
};

export type TUserMarketingData = {
	clientCard?: string;
};

export type TUser = {
	// Личные данные пользователя
	personalData: TUserPersonalData;
	// Адрес пользователя
	address?: TUserAddress;
	// Данные разрешения доступа и авторизации
	authData: TUserAuthData;
	// Данные для маркетинга
	marketingData: TUserMarketingData;
};

export type TUserId = {
	_id: string;
};

export type TUserFull = TUser & TUserId;
