
import { createReducer, createActions } from "reduxsauce";


const INITIAL_STATE = {
    token: "",
    userInfo: {},
    roleAccess: [],
    menu: [],
    langId: null,
    isFirstLogin: true,
    chooseRole: null,
    startWork: false,
    expoPushToken: null

};

const { Types, Creators } = createActions({
    setAuthState: ["payload"],
    notificationBinding: ["payload"],
    removeNotificationBinding: ["payload"],
    saveLogin: ["payload"],
    logout: ["payload"],
});

export const ActionTypes = Types;
export const Actions = Creators;

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_AUTH_STATE]: (draft, { payload }) => ({ ...draft, ...payload }),
});
