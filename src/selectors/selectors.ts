import { createSelector } from 'reselect';
import { State, Item } from '../types';
import applyPricingRules from '../ruleEngine/applyPricingRules';

const priceFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

const getCart = (state: State) => state.cart;
const getCustomerId = (state: State) => state.customerId;
const getPriceRuleMap = (state: State) => state.priceRuleMap;
const getItems = (state: State) => state.items;

const getPriceRulesForCustomer = createSelector(
    getCustomerId,
    getPriceRuleMap,
    (customerId, priceRuleMap) => priceRuleMap[customerId]
);

export const getDiscountedItems = createSelector(
    getCart,
    getPriceRulesForCustomer,
    (cart, rules) => applyPricingRules(rules, cart)
);

export const getDisplayItems = createSelector(
    getItems,
    (items) => items.map((item) => ({
        ...item,
        displayPrice: priceFormatter.format(item.price)
    }))
)

const alphabeticalItemComparator = (a: Item, b: Item) => {
    var nameA = a.name;
    var nameB = b.name;
    if (nameA < nameB) {
    return -1;
    }

    if (nameA > nameB) {
        return 1;
    }
    
    return 0;
}

export const getDisplayCart = createSelector(
    getDiscountedItems,
    items => items.map(item => ({
        ...item,
        displayPrice: priceFormatter.format(item.price),
        displayDiscountPrice: priceFormatter.format(item.discountedPrice),
    })).sort(alphabeticalItemComparator)
);

export const getTotalPrice = createSelector(
    getDiscountedItems,
    items => priceFormatter.format(items.reduce((acc, { discountedPrice }) => (acc + discountedPrice), 0))
)