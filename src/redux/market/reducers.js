
import { createReducer, createActions } from "reduxsauce";


const INITIAL_STATE = {
    list: []
};

const { Types, Creators } = createActions({
    setMarketState: ["payload"],
});

export const ActionTypes = Types;
export const Actions = Creators;

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_MARKET_STATE]: (draft, { payload }) => ({ ...draft, ...payload }),
});
