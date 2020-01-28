import { Cart, DiscountedItem, Rule, RuleType } from "../types";
import applyXforYRule from "./applyXforYRule";
import applyNegotiatedPriceRule from "./applyNegotiatedPriceRule";

const applyPricingRules = (rules: Rule[] = [], cart: Cart) : DiscountedItem[] => {
    const discountedCart = cart.map(item => ({
        ...item,
        discountedPrice: item.price
    }));

    const updatedCart = rules.reduce((prevCart, rule) => {
        if (rule.type === RuleType.xForY) {
            return applyXforYRule(rule, prevCart);
        }

        if(rule.type === RuleType.negotiatedPrice) {
            return applyNegotiatedPriceRule(rule, prevCart);
        }

        return prevCart;
    }, discountedCart);

    return updatedCart;
};

export default applyPricingRules;