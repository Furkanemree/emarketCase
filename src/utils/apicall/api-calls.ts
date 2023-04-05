import { IApiCallPayload, IDeleteApiCallPayload, IDetailApiCallPayload, IListApiCallPayload, ISaveApiCallPayload, IUpdateApiCallPayload, IUpdateStatusApiCallPayload } from './api-call-payloads';

function List(payload: IListApiCallPayload) {
  
    return { type: "LIST", payload };
}

function Dropdown(payload: IListApiCallPayload) {
    return { type: "DROPDOWN", payload };
}

function Detail(payload: IDetailApiCallPayload) {
    return { type: "DETAIL", payload };

}

function Save(payload: ISaveApiCallPayload) {
    if (payload.showAlertOnSuccess != false) {
        payload.showAlertOnSuccess = true;
        payload.successAlertType = 'save';
    }
    return { type: "SAVE", payload };

}

function Delete(payload: IDeleteApiCallPayload) {
    if (payload.showAlertOnSuccess != false) {
        payload.showAlertOnSuccess = true;
        payload.successAlertType = 'delete';
    }
    return { type: "DELETE", payload };

}

function Update(payload: IUpdateApiCallPayload) {
    if (payload.showAlertOnSuccess != false) {
        payload.showAlertOnSuccess = true;
        payload.successAlertType = 'update';
    }
    return { type: "UPDATE", payload };

}

function UpdateStatus(payload: IUpdateStatusApiCallPayload) {
    return { type: "UPDATE_STATUS", payload };

}

function ApiCall(payload: IApiCallPayload) {
    return { type: "BASE_API_CALL", payload };

}


export default { List, Detail, Save, Delete, Update, UpdateStatus, ApiCall,Dropdown };