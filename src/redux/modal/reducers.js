
import { createReducer, createActions } from "reduxsauce";


const INITIAL_STATE = {
    modals: []
};

const { Types, Creators } = createActions({
    setModalState: ["payload"],
    openModal: ["payload"],
    closeModal: ["payload"]
});

export const ActionTypes = Types;
export const Actions = Creators;

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_MODAL_STATE]: (draft, { payload }) => ({ ...draft, ...payload }),
});
