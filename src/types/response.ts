export enum ResponseCode {
    success = 1000,
    failed = 2000
}
export interface CommonResponse<T> {
    code: ResponseCode,
    message: 'success' | string
    data?: T
}