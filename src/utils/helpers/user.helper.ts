import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { TUser, TUserFull } from "../../types/user.types";
import { TResShortUserData } from "../../types/response.types";

const { NODE_ENV, JWT_SECRET } = process.env;

// Формирование объекта нового пользователя для регистрации
export const handleCreateUser = async (user: TUser): Promise<TUser> => {
	const { authData } = user;
	const { password } = authData;

	if (authData && authData.role) {
		delete user.authData.role;
	}

	const hashPassword = await bcrypt.hash(password, 10);

	user.authData.password = hashPassword;

	return user;
};

// Формирование объекта для отправки на фронт
// токен, роль, согласие cookies, ФИО
export const handleResShortUserData = (user: TUserFull): TResShortUserData => {
	const { _id, personalData, authData } = user;

	const secretKey: string =
		NODE_ENV && JWT_SECRET && NODE_ENV === "production"
			? JWT_SECRET
			: "some-secret-key";
	const token = jwt.sign({ _id: _id }, secretKey, {
		expiresIn: "365d",
	});

	return {
		secret: token,
		userFullName: personalData.fullName,
		role: authData.role,
		acceptedCookies: authData.acceptedCookies,
	};
};
