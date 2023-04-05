import { combineReducers } from 'redux'
import * as auth from "./auth/reducers"
import * as apiCall from "./api-call/reducers"
import * as modal from "./modal/reducers"
import * as theme from "./theme/reducers"
import * as root from "./root/reducers"
import * as basket from "./basket/reducers"
import * as market from "./market/reducers"


export default combineReducers({
    auth: auth.reducer,
    apiCall: apiCall.reducer,
    modal: modal.reducer,
    theme: theme.reducer,
    root: root.reducer,
    basket: basket.reducer,
    market: market.reducer
})