import { HttpClient } from './http-client';
/**
 * Interceptors can process requests before they are sent, and responses
 * before they are returned to callers.
 */
export interface Interceptor {
    /**
     * Called with the request before it is sent. Request interceptors can modify and
     * return the request, or return a new one to be sent. If desired, the interceptor
     * may return a Response in order to short-circuit the HTTP request itself.
     *
     * @param request The request to be sent.
     * @returns The existing request, a new request or a response; or a Promise for any of these.
     */
    request?(request: Request): Request | Response | Promise<Request | Response>;
    /**
     * Handles errors generated by previous request interceptors. This function acts
     * as a Promise rejection handler. It may rethrow the error to propagate the
     * failure, or return a new Request or Response to recover.
     *
     * @param error The rejection value from the previous interceptor.
     * @returns The existing request, a new request or a response; or a Promise for any of these.
     */
    requestError?(error: unknown): Request | Response | Promise<Request | Response>;
    /**
     * Called with the response after it is received. Response interceptors can modify
     * and return the Response, or create a new one to be returned to the caller.
     *
     * @param response The response.
     * @returns The response; or a Promise for one.
     */
    response?(response: Response, request?: Request): Response | Promise<Response>;
    /**
     * Handles fetch errors and errors generated by previous interceptors. This
     * function acts as a Promise rejection handler. It may rethrow the error
     * to propagate the failure, or return a new Response to recover.
     *
     * @param error The rejection value from the fetch request or from a
     * previous interceptor.
     * @returns The response; or a Promise for one.
     */
    responseError?(error: unknown, request?: Request, httpClient?: HttpClient): Response | Promise<Response>;
}
export declare type ValidInterceptorMethodName = keyof Interceptor;
export declare type RetryableRequest = Request & {
    retryConfig?: RetryConfiguration;
};
export interface RetryConfiguration {
    maxRetries: number;
    interval?: number;
    strategy?: number | ((retryCount: number) => number);
    minRandomInterval?: number;
    maxRandomInterval?: number;
    counter?: number;
    requestClone?: Request;
    doRetry?(response: Response, request: Request): boolean | Promise<boolean>;
    beforeRetry?(request: Request, client: HttpClient): Request | Promise<Request>;
}
//# sourceMappingURL=interfaces.d.ts.map