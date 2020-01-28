export enum AdType {
    classic = "CLASSIC",
    standOut = "STAND_OUT",
    premium = "PREMIUM"
};

export enum RuleType {
    xForY = "X_FOR_Y",
    negotiatedPrice = "NEGOTIATED_PRICE",
};

export type XForYRule = {
    type: RuleType.xForY,
    ad: AdType,
    data: {
        x: number,
        y: number
    }
}

export type NegotiatedPriceRule = {
    type: RuleType.negotiatedPrice,
    ad: AdType,
    data: {
        updatedPrice: number
    }
}

export type Rule = XForYRule | NegotiatedPriceRule;

export interface Item {
    type: AdType,
    name: string,
    price: number,
}

export interface DiscountedItem extends Item {
    discountedPrice: number 
}

export type Cart = Item[];

export type Customer = {
    id: string,
    name: string
}

export interface State {
    customerId: string,
    cart: Cart,
    items: Item[],
    customers: Customer[],
    priceRuleMap: Record<string, Rule[]>
};

export enum ActionTypes {
    successfullyLoaded = 'SUCCESS',
    updateCustomer = 'UPDATE_CUSTOMER',
    addItem = 'ADD_ITEM',
}

export interface LoadResponse {
    items: Item[],
    customers: Customer[],
    priceRuleMap: Record<string, Rule[]>
};

export type Action =
 | { type: ActionTypes.successfullyLoaded, response: LoadResponse }
 | { type: ActionTypes.addItem, item: Item }
 | { type: ActionTypes.updateCustomer, customer: string }
