import { AxiosInstance } from "axios";
export interface ResourceAction {
    requestFn: Function;
    onSuccess: Function;
    onError: Function;
    property: string;
    dispatchString: string;
    commitString: string;
    axios: AxiosInstance;
}
export interface ResourceActionMap {
    [action: string]: ResourceAction;
}
export interface ShorthandResourceActionOptions {
    action: string;
    property?: string;
    path: Function | string;
    onSuccess?: Function;
    onError?: Function;
    requestConfig?: Object;
    queryParams?: Boolean;
}
export interface ResourceActionOptions extends ShorthandResourceActionOptions {
    method: string;
}
export interface ResourceOptions {
    baseURL?: string;
    state?: Object;
    axios?: AxiosInstance;
    queryParams?: Boolean;
}
export declare class Resource {
    private baseURL;
    private readonly HTTPMethod;
    actions: ResourceActionMap;
    state: Object;
    axios: AxiosInstance;
    private queryParams;
    constructor(options: ResourceOptions);
    add(options: ResourceActionOptions): Resource;
    private readonly normalizedBaseURL;
    private getDispatchString(action);
    private getCommitString(action);
}
export default Resource;
