import { Action, ActionTypes, State } from "./types";

export const initialState: State = {
    customerId: '',
    cart: [],
    items: [],
    customers: [],
    priceRuleMap: {}
};

const reducer = (state = initialState, action: Action) => {
    switch(action.type) {
        case ActionTypes.successfullyLoaded:
            return {
                ...state,
                items: action.response.items,
                customers: action.response.customers,
                priceRuleMap: action.response.priceRuleMap,
            }
        
        case ActionTypes.addItem:
            const { item } = action;

            return {
                ...state,
                cart: [...state.cart, item]
            }

        case ActionTypes.updateCustomer:
            return {
                ...state,
                customerId: action.customer,
            }
        default:
            return state;
    }
}

export default reducer;