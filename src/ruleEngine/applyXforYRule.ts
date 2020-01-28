import { XForYRule, DiscountedItem } from "../types";

const discountedPriceComparator = (a: DiscountedItem, b:DiscountedItem) => {
    return a.discountedPrice - b.discountedPrice;
}


const isXForYRuleApplicable = (rule: XForYRule, discountedCart: DiscountedItem[]) => {
    const { ad, data: { x } } = rule;

    const applicableItems = discountedCart.filter(({ type }) => type === ad);

    const length = applicableItems.length;

    return (length / x) > 0
}

const applyXforYRule = (rule: XForYRule, discountedCart: DiscountedItem[]) => {
    if (!isXForYRuleApplicable(rule, discountedCart)) {
        return discountedCart;
    }

    const { ad, data: { x, y } } = rule;

    const applicableItems: DiscountedItem[] = [];
    const unapplicableItems: DiscountedItem[] = [];

    discountedCart.forEach((item) => {
        if(item.type === ad) {
            applicableItems.push(item);
        } else {
            unapplicableItems.push(item);
        }
    });

    applicableItems.sort(discountedPriceComparator);

    const numberOfTimesRuleApplies = Math.floor(applicableItems.length / x);
    const numberOfFreeItemsPerRuleApplicaton = x - y;
    const numberOfFreeItems = numberOfTimesRuleApplies * numberOfFreeItemsPerRuleApplicaton;

    const freeItems = applicableItems.slice(0, numberOfFreeItems).map(
        (item) => ({...item, discountedPrice: 0})
    );

    const unchangedItems = applicableItems.slice(numberOfFreeItems);

    const updatedCart = [...unapplicableItems, ...unchangedItems, ...freeItems];

    return updatedCart;
}

export default applyXforYRule;
