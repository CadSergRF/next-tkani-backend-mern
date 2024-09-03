export type TOrderProduct = {
	_id: string;
	mainData: {
		articul: string;
		name: string;
		price: number;
		oldPrice: number;
		picture: string;
	};
	configCard: {
		promo: boolean;
		section: string;
		measure: string;
	};
};

export type TOrderCartItem = {
	cartProduct: TOrderProduct;
	orderQuantity: number;
};

export type TOrderCustomerData = {
	name: string;
	phoneNumber: string;
	email: string;
};

export type TOrderCustomerAddress = {
	postIndex?: string;
	town?: string;
	streetHome?: string;
	houseNumber?: string;
	apartment?: string;
	floor?: string;
	entrance?: string;
	intercom?: string;
};

export type TOrder = {
	cart: TOrderCartItem[];
	customerData: TOrderCustomerData;
	customerAddress: TOrderCustomerAddress;
	deliveryType: string;
	privacyPolicy: string;
};
