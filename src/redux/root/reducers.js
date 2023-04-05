
import { createReducer, createActions } from "reduxsauce";


const INITIAL_STATE = {
    currentMasterStack: ""
};

const { Types, Creators } = createActions({
    setRootState: ["payload"],
});

export const ActionTypes = Types;
export const Actions = Creators;

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_ROOT_STATE]: (draft, { payload }) => ({ ...draft, ...payload }),
});
