import { AdType } from "../../types";
import { getDisplayItems, getDisplayCart, getTotalPrice } from "../selectors";

describe('selectors', () => {
    const emptyState = {
        customerId: '',
        cart: [],
        items: [],
        customers: [],
        priceRuleMap: {}
    }

    describe('getDisplayItems', () => {
        const state = {
            ...emptyState,
            items: [
                {
                    type: AdType.classic,
                    name: "-some-classic-val",
                    price: 100.00
                }
            ]
        };

        it('should format items correctly', () => {
            const expected = [{
                type: AdType.classic,
                name: "-some-classic-val",
                price: 100.00,
                displayPrice: "$100.00"
            }];

            expect(getDisplayItems(state)).toEqual(expected);
        });
    });

    describe('getDisplayCart', () => {
        it('should return the formatted cart to be displayed', () => {
            const discountedItems = [
                {
                    type: AdType.classic,
                    name: "-some-classic-val",
                    price: 100.00,
                    discountedPrice: 100.00,
                }, {
                    type: AdType.classic,
                    name: "-some-classic-val",
                    price: 100.00,
                    discountedPrice: 0.00,
                }
            ];

            const expected = [
                {
                    type: AdType.classic,
                    name: "-some-classic-val",
                    price: 100.00,
                    discountedPrice: 100.00,
                    displayPrice: '$100.00',
                    displayDiscountPrice: '$100.00',
                }, {
                    type: AdType.classic,
                    name: "-some-classic-val",
                    price: 100.00,
                    discountedPrice: 0.00,
                    displayPrice: '$100.00',
                    displayDiscountPrice: '$0.00',
                }
            ];
            
            expect(getDisplayCart.resultFunc(discountedItems)).toEqual(expected);
        });
    });

    describe('getTotalPrice', () =>{
        it('should return the totalPrice of the discountedItems', () => {
            const discountedItems = [
                {
                    type: AdType.classic,
                    name: "-some-classic-val",
                    price: 100.00,
                    discountedPrice: 100.00,
                }, {
                    type: AdType.classic,
                    name: "-some-classic-val",
                    price: 100.00,
                    discountedPrice: 0.00,
                }
            ];

            const expected = '$100.00';
            
            expect(getTotalPrice.resultFunc(discountedItems)).toEqual(expected);
        });
    })
});