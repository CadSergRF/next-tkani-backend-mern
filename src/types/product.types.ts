import { Types } from "mongoose";

export type TProductMainData = {
	articul: string; // Артикул
	name: string; // Наименование
	price: number; // Цена за единицу
	oldPrice?: number; // "Старая цена" - для акций
	quantity?: number; // Количество, остаток
	picture?: string; // Изображение товара
	description?: string; // Описание товара
};

export type TProductCharacteristic = {
	width?: number; // Ширина
	picture?: string; // Рисунок
	color?: string; // Основной цвет
	countryOfOrigin?: string; // Страна производитель
	composition?: string; // Состав ткани
	weight?: string; // Плотность или вес за единицу измерения
};

export type TProductSeo = {
	header?: string; // Заголовок
	description?: string; // Описание
	keyWords?: Types.Array<string>; // Ключевые слова
};

export type TProductConfigCard = {
	visible: boolean;
	promo?: boolean;
	section?: string;
	measure?: string;
};

export type TProduct = {
	mainData: TProductMainData;
	characteristic: TProductCharacteristic;
	seoTags: TProductSeo;
	configCard: TProductConfigCard;
};

export type TProductId = {
	_id: string;
};

export type TProductFull = TProduct & TProductId;
