import IApiCallPaginationDto from "./api-call-pagination-dto";

export interface IApiCallPayload extends IBaseApiCallPayload {
    method: 'post' | 'get' | 'delete' | 'put',
    action: string,
    itemId: number,
    query: object,
    data: object,
}


export interface IBaseApiCallPayload {
    controller: string,
    onSuccess: ({ data, pagination }: { data: object, pagination: IApiCallPaginationDto }) => any,
    onError: ({ data, errorMessage, errorMessageTechnical }: { data: object, errorMessage: string, errorMessageTechnical: string }) => any,
    callback: ({ data, pagination, success, error, errorMessage, errorMessageTechnical }: { data: object, pagination: IApiCallPaginationDto, errorMessage: string, errorMessageTechnical: string, error: boolean, success: boolean }) => any,
    showAlertOnError?: boolean,
    showAlertOnSuccess?: boolean,
    successAlertType?: "process" | "delete" | "update" | "save",
    showLoading?: boolean,
}

export interface IListApiCallPayload extends IBaseApiCallPayload {
    action: string,
    data: object,
}

export interface IDeleteApiCallPayload extends IBaseApiCallPayload {
    itemId: number,
}

export interface IDetailApiCallPayload extends IBaseApiCallPayload {
    itemId: number,
}

export interface IUpdateApiCallPayload extends IBaseApiCallPayload {
    itemId: number,
    data: object,
}

export interface IUpdateStatusApiCallPayload extends IBaseApiCallPayload {
    itemId: number,
    status: number
}

export interface ISaveApiCallPayload extends IBaseApiCallPayload {
    data: object,
}