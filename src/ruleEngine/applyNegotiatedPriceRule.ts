import { DiscountedItem, NegotiatedPriceRule } from "../types";

const applyNegotiatedPriceRule = (rule: NegotiatedPriceRule, discountedCart: DiscountedItem[]) => {
    const { ad, data: { updatedPrice }} = rule;
    return discountedCart.map(item =>
        (
            item.type === ad
            ? {
                ...item,
                discountedPrice: item.discountedPrice < updatedPrice ? item.discountedPrice : updatedPrice
            }
            : item
        )
    );
}

export default applyNegotiatedPriceRule;