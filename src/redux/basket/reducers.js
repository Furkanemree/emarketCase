
import { createReducer, createActions } from "reduxsauce";


const INITIAL_STATE = {
    count: 0,
    list: []
};

const { Types, Creators } = createActions({
    setBasketState: ["payload"],
});

export const ActionTypes = Types;
export const Actions = Creators;

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_BASKET_STATE]: (draft, { payload }) => ({ ...draft, ...payload }),
});
