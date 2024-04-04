import {
	TProduct,
	TProductCharacteristic,
	TProductConfigCard,
	TProductMainData,
	TProductSeo,
} from "../types/product.types";

export const ParsedToReal = (data: any) => {
	const realCard: TProduct = {
		mainData: {
			articul: "",
			name: "",
			price: 0,
		},
		characteristic: {
			width: undefined,
			picture: undefined,
			color: undefined,
			countryOfOrigin: undefined,
			composition: undefined,
			weight: undefined,
		},
		seoTags: {
			header: undefined,
			description: undefined,
			keyWords: undefined,
		},
		configCard: {
			visible: data.configCard_visible,
			promo: undefined,
		},
	};
	const mainData: TProductMainData = {
		articul: "",
		name: "",
		price: 0,
	};
	const characteristic: TProductCharacteristic = {};
	const seoTags: TProductSeo = {};
	const configCard: TProductConfigCard = {
		visible: true,
	};
	mainData.articul = data.mainData_articul;
	mainData.name = data.mainData_name;
	mainData.price = data.mainData_price;
	mainData.oldPrice = data.mainData_oldPrice || 0;
	mainData.quantity = data.mainData_quantity || 0;
	mainData.picture = data.mainData_picture || "";
	mainData.description = data.mainData_description || "";
	characteristic.width = data.characteristic_width || 0;
	characteristic.picture = data.characteristic_picture || "";
	characteristic.color = data.characteristic_color || "";
	characteristic.countryOfOrigin = data.characteristic_countryOfOrigin || "";
	characteristic.composition = data.characteristic_composition || "";
	characteristic.weight = data.characteristic_weight || 0;
	seoTags.header = data.seoTags_header || "";
	seoTags.description = data.seoTags_description || "";
	seoTags.keyWords = data.seoTags_keyWords || "";
	configCard.visible = data.configCard_visible;
	configCard.promo = data.configCard_promo || false;

	realCard.mainData = mainData;
	realCard.characteristic = characteristic;
	realCard.seoTags = seoTags;
	realCard.configCard = configCard;

	return realCard;
};
