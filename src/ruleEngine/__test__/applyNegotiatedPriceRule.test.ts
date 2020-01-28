import { AdType, RuleType, NegotiatedPriceRule } from "../../types";
import applyNegotiatedPriceRule from "../applyNegotiatedPriceRule";

describe('applyNegotiatedPriceRule', () => {
    const items = [
        {
            type: AdType.classic,
            name: '-some-name',
            price: 100.00,
            discountedPrice: 100.00,
        }, {
            type: AdType.classic,
            name: '-some-name',
            price: 100.00,
            discountedPrice: 100.00,
        }, {
            type: AdType.premium,
            name: '-some-premium',
            price: 300.00,
            discountedPrice: 300.00,
        } 
    ];

    const rule: NegotiatedPriceRule = {
        type: RuleType.negotiatedPrice,
        ad: AdType.classic,
        data: {
            updatedPrice: 50.00
        }
    }

    it('should apply new price to each item of the correct ad type', () => {
        const expected = [
            {
                type: AdType.classic,
                name: '-some-name',
                price: 100.00,
                discountedPrice: 50.00
            }, {
                type: AdType.classic,
                name: '-some-name',
                price: 100.00,
                discountedPrice: 50.00
            }, {
                type: AdType.premium,
                name: '-some-premium',
                price: 300.00,
                discountedPrice: 300.00
            } 
        ];

        expect(applyNegotiatedPriceRule(rule, items)).toEqual(expected);
    });

    it('should not apply discount to items with an already lower discount value', () => {
        const expected = [
            {
                type: AdType.classic,
                name: '-some-name',
                price: 100.00,
                discountedPrice: 50.00
            }, {
                type: AdType.classic,
                name: '-some-name',
                price: 100.00,
                discountedPrice: 50.00
            }, {
                type: AdType.premium,
                name: '-some-premium',
                price: 300.00,
                discountedPrice: 300.00
            }, {
                type: AdType.classic,
                name: '-some-name',
                price: 100.00,
                discountedPrice: 0.00
            } 
        ];

        const newItem = {
            type: AdType.classic,
            name: '-some-name',
            price: 100.00,
            discountedPrice: 0.00
        };

        expect(applyNegotiatedPriceRule(rule, [...items, newItem])).toEqual(expected);
    })
})