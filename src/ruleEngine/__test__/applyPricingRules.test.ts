import { AdType, RuleType, Rule } from "../../types";
import applyPricingRules from "../applyPricingRules";


describe('applyPricingRules', () => {
    const cart = [
        {
            type: AdType.classic,
            name: '-some-name',
            price: 100.00,
        }, {
            type: AdType.classic,
            name: '-some-name',
            price: 100.00,
        }, {
            type: AdType.premium,
            name: '-some-premium',
            price: 300.00,
        } 
    ];

    const rules: Rule[]  = [{
        type: RuleType.negotiatedPrice,
        ad: AdType.premium,
        data: {
            updatedPrice: 50.00
        }
    },
    {
        type: RuleType.xForY,
        ad: AdType.classic,
        data: {
            x: 3,
            y: 2
        }
    }]

    it('should only apply rules that are applicable', () => {
        const expected = [
            {
                type: AdType.premium,
                name: '-some-premium',
                price: 300.00,
                discountedPrice: 50.00
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

        expect(applyPricingRules(rules, cart)).toEqual(expected);
    })

    it('should all apply rules when applicable', () => {
        const expected = [
            {
                type: AdType.premium,
                name: '-some-premium',
                price: 300.00,
                discountedPrice: 50.00
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
        }

        expect(applyPricingRules(rules, [...cart, addedItem])).toEqual(expected);
    })
})