import { call, put, select, takeEvery } from "redux-saga/effects";
import apiService from "./api-service";
import { ActionTypes, Actions } from "./reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CommandBus from "../../infrastructure/command-bus/command-bus";


const exampleBaseApiCall = {
    // #region for Api service
    controller: "",
    action: "",
    query: {
        id: 1, val: 2
    },
    method: "", // get, post, put, delete
    data: {}, // for, post, put json body data
    itemId: "",
    // #endregion
    onSuccess: { data: {}, pagination: {} }, // <= call data !! Function
    onError: { data: {}, errorMessage: "", errorMessageTechnical: "" }, // <= call data !! Function
    callback: { data: {}, pagination: {}, success: false, error: false, errorMessage: "", errorMessageTechnical: "" }, // <= call data 
    showAlertOnError: true,
    showLoading: true, // NProgress or other
};


function* BaseApiCall({ payload }) {
    // if (payload.showLoading) // show loading
    //     nProgress.start();

    //const token = yield select(state => state.auth.token); // get bearer token

    try {



        const token = yield AsyncStorage.getItem("token");
        const apiCall = yield call(apiService.makeApiCall, { // make Request
            controller: payload.controller,
            action: payload.action,
            query: payload.query,
            data: payload.data,
            method: payload.method,
            itemId: payload.itemId,
            token,
        });

        // #region run callbacks
        if (apiCall.success && payload.onSuccess instanceof Function) // run onSuccess
            yield call(payload.onSuccess, { data: apiCall.data, pagination: apiCall.pagination });

        if (apiCall.error && payload.onError instanceof Function) // run onErorr
            yield call(payload.onError, { data: apiCall.data, errorMessage: apiCall.errorMessage, errorMessageTechnical: apiCall.errorMessageTechnical });

        if (payload.callback instanceof Function) // run callback
            yield call(payload.callback, apiCall) // 
        // #endregion

        if (apiCall?.success && payload?.showAlertOnSuccess) // show alert on success
        {
            switch (payload.successAlertType) {
                case "save":
                    CommandBus.sc.alertSuccess("message.success.content.add");
                    break;
                case "delete":
                    CommandBus.sc.alertSuccess("message.success.content.delete")
                    break;
                case "update":
                    CommandBus.sc.alertSuccess("message.success.content.edit")
                    break;
                default:
                    CommandBus.sc.alertSuccess("message.success.content.operation")
                    break;
            }
        }


    } catch (error) {
                // if (apiCall.error && payload.showAlertOnError) // show alert on Error
        //     general.notificationError(apiCall.errorMessage);

    }
}



function* NativeGetCall({ payload }) {
    yield put(Actions.BaseApiCall({ ...payload, method: "get" }))

}

function* NativePostCall({ payload }) {
    yield put(Actions.BaseApiCall({ ...payload, method: "post" }))
}


function* Detail({ payload }) {
    yield put(Actions.BaseApiCall({
        ...payload,
        action: null,
        itemId: payload.itemId,
        method: "get",
    }))
}


function* Update({ payload }) {
    yield put(Actions.BaseApiCall({
        ...payload,
        // action: null,
        itemId: payload.itemId,
        method: "put",
    }))
}


function* Save({ payload }) {
    yield put(Actions.BaseApiCall({
        ...payload,
        action: null,
        method: "post",
    }))
}


function* Delete({ payload }) {
    yield put(Actions.BaseApiCall({
        ...payload,
        action: null,
        itemId: payload.itemId,
        method: "delete",
    }))
}


function* List({ payload }) {
    yield put(Actions.BaseApiCall({
        action: "list",
        ...payload,
        method: "post",
    }))
}


function* Dropdown({ payload }) {
    yield put(Actions.BaseApiCall({
        action: "dropdown",
        ...payload,
        method: "post",
    }))
}


function* UpdateStatus({ payload }) {
    yield put(Actions.BaseApiCall({
        ...payload,
        action: "UpdateStatus",
        method: "put",
        itemId: payload.itemId,
        status: payload.status
    }))
}

export default [
    takeEvery(ActionTypes.NATIVE_GET, NativeGetCall),
    takeEvery(ActionTypes.NATIVE_POST, NativePostCall),
    takeEvery(ActionTypes.DELETE, Delete),
    takeEvery(ActionTypes.DETAIL, Detail),
    takeEvery(ActionTypes.SAVE, Save),
    takeEvery(ActionTypes.UPDATE, Update),
    takeEvery(ActionTypes.LIST, List),
    takeEvery(ActionTypes.UPDATE_STATUS, UpdateStatus),
    takeEvery(ActionTypes.BASE_API_CALL, BaseApiCall), ,
    takeEvery(ActionTypes.DROPDOWN, Dropdown), ,

];
