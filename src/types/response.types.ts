import { TUserFullName } from "./user.types";

export type TResShortUserData = {
	secret: string;
	userFullName: TUserFullName;
	role: string | undefined;
	acceptedCookies: boolean;
};
