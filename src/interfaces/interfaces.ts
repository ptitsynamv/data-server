export interface ErrorResponse {
    success: boolean;
    message: string;
}

export interface ProcessEnv {
    [key: string]: string | undefined
}
