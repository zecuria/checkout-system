import { AdType, RuleType, Rule, XForYRule } from "../../types";
import applyXforYRule from "../applyXforYRule";


describe('applyPricingRules', () => {
    const cart = [
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

    const rule: XForYRule = {
        type: RuleType.xForY,
        ad: AdType.classic,
        data: {
            x: 3,
            y: 2
        }
    };

    it('should only apply rules that are applicable', () => {
        const expected = [
            {
                type: AdType.premium,
                name: '-some-premium',
                price: 300.00,
                discountedPrice: 300.00
            }, {
                type: AdType.classic,
                name: '-some-name',
                price: 100.00,
                discountedPrice: 100.00
            }, {
                type: AdType.classic,
                name: '-some-name',
                price: 100.00,
                discountedPrice: 100.00
            }
        ];

        expect(applyXforYRule(rule, cart)).toEqual(expected);
    })

    it('should all apply rules when applicable', () => {
        const expected = [
            {
                type: AdType.premium,
                name: '-some-premium',
                price: 300.00,
                discountedPrice: 300.00
            }, {
                type: AdType.classic,
                name: '-some-name',
                price: 100.00,
                discountedPrice: 100.00
            }, {
                type: AdType.classic,
                name: '-some-name',
                price: 100.00,
                discountedPrice: 100.00
            }, {
                type: AdType.classic,
                name: '-some-name',
                price: 100.00,
                discountedPrice: 0.00
            }
        ];

        const addedItem = {
            type: AdType.classic,
            name: '-some-name',
            price: 100.00,
            discountedPrice: 100.00,
        }

        expect(applyXforYRule(rule, [...cart, addedItem])).toEqual(expected);
    });

    it('should apply mulitple times when applicable', () => {
        const expected = [
            {
                type: AdType.premium,
                name: '-some-premium',
                price: 300.00,
                discountedPrice: 300.00
            },{
                type: AdType.classic,
                name: '-some-name',
                price: 100.00,
                discountedPrice: 100.00
            }, {
                type: AdType.classic,
                name: '-some-name',
                price: 100.00,
                discountedPrice: 100.00
            }, {
                type: AdType.classic,
                name: '-some-name',
                price: 100.00,
                discountedPrice: 0.00
            }, {
                type: AdType.classic,
                name: '-some-name',
                price: 100.00,
                discountedPrice: 0.00
            }
        ];

        const addedItem = {
            type: AdType.classic,
            name: '-some-name',
            price: 100.00,
            discountedPrice: 100.00,
        }

        const newRule: XForYRule = {
            type: RuleType.xForY,
            ad: AdType.classic,
            data: {
                x: 2,
                y: 1
            }
        };


        expect(applyXforYRule(newRule, [...cart, {...addedItem}, addedItem])).toEqual(expected);
    })
})