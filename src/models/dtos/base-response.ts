export default interface BaseResponse<T> {
    message: string;
    payload: T;
}

export interface BaseErrorResponse extends BaseResponse<null> {
    
}