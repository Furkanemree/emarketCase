import { call, put, takeEvery, delay, select } from "redux-saga/effects";
import { ActionTypes, Actions } from "./reducers";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from "react-native";
import general from "../../utils/general";
import apiService from "../api-call/api-service";


function* saveLogin({ payload }) {
    yield AsyncStorage.setItem("tokenv", payload?.token);
    yield put(Actions.setAuthState({
        userInfo: payload?.userInfo,
        token: payload?.token,
    }));
    global.token = payload?.token;
    global.userInfo = payload?.userInfo;
    yield call(payload?.afterSave);
    yield put(Actions.notificationBinding({
        userInfo: payload?.userInfo,
        token: payload?.token,
    }));
    global.roles = new Set(payload?.userInfo?.role?.actions?.map(act => act?.value));

}

function* NotificationBinding({ payload }) {

    let binded = false;
    let tryc = 0;
    while (!binded) {
        tryc++;
        if (tryc > 15) {
            binded = true;
            continue;
        }

        if (general.isNullOrEmpty(global?.notificationToken)) {
            yield delay(1200)
            continue;
        }
        const token = yield select(state => state.auth.token);
        const apiCall = yield call(apiService.makeApiCall, {
            controller: "notification",
            action: "Bind",
            data: {
              
                address: global?.notificationToken,
                awsSnsEndpointType: Platform.select({ ios: 1, android: 2, })
            },
            method: "post",
            token,
        });
        if (apiCall?.success)
            binded = true;
        else
            yield delay(1200)
    }


}

function* RemoveNotificationBinding({ payload }) {
    let removed = false;
    let tryc = 0;
    while (!removed) {
        tryc++;
        if (tryc > 15) {
            removed = true;
            continue;
        }
        // const token = yield select(state => state.auth.token);
        const apiCall = yield call(apiService.makeApiCall, {
            controller: "notification",
            action: "RemoveAllBinds",
            data: {
                uniqueDeviceId: getUniqueId(),
            },
            method: "post",
            token: "",
        });
        if (apiCall?.success)
            removed = true;
        else
            yield delay(1200)
    }
}



function* logout({ payload }) {

}

export default [
    takeEvery(ActionTypes.REMOVE_NOTIFICATION_BINDING, RemoveNotificationBinding),
    takeEvery(ActionTypes.NOTIFICATION_BINDING, NotificationBinding),
    takeEvery(ActionTypes.SAVE_LOGIN, saveLogin),
    takeEvery(ActionTypes.LOGOUT, logout),
];
