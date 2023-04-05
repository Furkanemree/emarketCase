import axios from "axios";
import general from "../../utils/general";
import * as ApiStatusEnum from "../../utils/enums/api-status-enum";
import { AppConfig } from "../../config/app-config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const makeApiCall = async payload => {
    try {

        payload.data = { ...payload?.data };

        let sendData = general.isNullOrEmpty(payload.data) ? {} : { ...payload.data };

        let url = `${AppConfig.API_URL}/${payload.controller}`;
        if (!general.isNullOrEmpty(payload.action))
            url += `/${payload.action}`;
        if (!general.isNullOrEmpty(payload.itemId))
            url += `/${payload.itemId}`;
        if (!general.isNullOrEmpty(payload.status))
            url += `/${payload.status}`;
        if (payload.query instanceof Object) {
            const keys = Object.keys(payload.query);
            if (keys.length > 0) url += "?";

            for (let i = 0; i < keys.length; ++i) {
                url += keys[i] + "=" + ((payload.query[keys[i]] instanceof Object || payload.query[keys[i]] instanceof Array) ? encodeURI(JSON.stringify(payload.query[keys[i]])) : encodeURI(payload.query[keys[i]]));
                if (i < keys.length - 1)
                    url += "&";
            }
        }

        let options = {
            url,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + payload.token,
            },
            method: payload.method,
            ...payload.axiosOptions
        };




        if (payload?.axiosOptions?.data == undefined && payload.method.toLowerCase() != "get")
            options.data = sendData;
        const res = await axios(options);

        if (res.status === ApiStatusEnum.Success) {
            return {
                success: true,
                data: res.data,
               
            }
        }
        return {
            error: true,
            data: res.data.data,
            errorMessage: "error.unknown_error",
            errorMessageTechnical: "Unknown response status. status: " + res.data.status,
        }

    } catch (error) {

        if (error?.response?.status === 401) {
            await AsyncStorage.removeItem("token").then((result) => {

            }).catch((err) => {
                console.log("token remove error");
            })
        }

        if (!general.isNullOrEmpty(error?.response?.data?.status)) { // error, but not network error. Have api error
            return {
                error: true,
                data: error.response.data.data,
                errorMessage: error.response.data.exceptionMessage,
                errorMessageTechnical: error.response.data.exceptionMessageTechnical,
            }
        }
        return {
            error: true,
            data: null,
            errorMessage: "error.unknown_error",
            errorMessageTechnical: error?.message,
        };
    }
};

export default {
    makeApiCall
}