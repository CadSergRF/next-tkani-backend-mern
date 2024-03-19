// ERRORS MESSAGE
const AUTH_MESSAGE = "Необходима авторизация";
const BAD_REQUEST_MESSAGE_DATA = "Переданы не корректные данные";
const BAD_REQUEST_MESSAGE_ID = "Передан не корректный Id";
const NOT_FOUND_MESSAGE_URL = "URL не существует";
const INTERNAL_SERVER_ERROR_MESSAGE = "На сервере произошла ошибка";
const DUPLICATE_EMAIL = "Пользователь с указанным email уже зарегистрирован.";
const BAD_EMAIL_OR_PASSWORD = "Неправильные почта или пароль";
const BAD_REQUEST_CODE = "Ошибка авторизации";
const NOT_FOUND_USER = "Пользователь с указанным Id  не найден";

// SUCCESSFUL MESSAGE
const REGISTER_MESSAGE = "Вы успешно зарегистрировались";
const LOGIN_MESSAGE = "Вы успешно авторизованы";
const LOGOUT_MESSAGE = "Вы вышли из профиля";

const ErrorMessage = {
	AUTH_MESSAGE,
	BAD_REQUEST_MESSAGE_DATA,
	BAD_REQUEST_MESSAGE_ID,
	NOT_FOUND_MESSAGE_URL,
	INTERNAL_SERVER_ERROR_MESSAGE,
	BAD_EMAIL_OR_PASSWORD,
	DUPLICATE_EMAIL,
	BAD_REQUEST_CODE,
	NOT_FOUND_USER,
};

const SuccessMessage = {
	REGISTER_MESSAGE,
	LOGIN_MESSAGE,
	LOGOUT_MESSAGE,
};

export { ErrorMessage, SuccessMessage };
