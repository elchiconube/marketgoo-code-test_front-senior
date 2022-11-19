import axiosMiddleware from "redux-axios-middleware";
import * as axios from "axios";
import { STATUS_CODE } from "../constants";

const middlewareConfig = {
    interceptors: {
        request: [
            {
                success: function (
                    { getState, dispatch, getSourceAction },
                    config
                ) {
                    config.headers["Content-Type"] = `application/json`;

                    return config;
                },
                error: function (
                    { getState, dispatch, getSourceAction },
                    error
                ) {
                    return Promise.reject(error);
                },
            },
        ],
        response: [
            {
                success: function (
                    { getState, dispatch, getSourceAction },
                    res
                ) {
                    return Promise.resolve(res);
                },
                error: function (
                    { getState, dispatch, getSourceAction },
                    request
                ) {
                    let result = request;
                    const { response: { status, data } = {} } = request;

                    if (status === STATUS_CODE.UNAUTHORIZED)
                        console.error("Unauthorized");

                    switch (true) {
                        case status === STATUS_CODE.BAD_REQUEST:
                            result = {
                                ...result,
                                meta: {
                                    code: STATUS_CODE.BAD_REQUEST,
                                    message: "Bad Request",
                                },
                            };
                            break;
                        case status === STATUS_CODE.NOT_FOUND:
                            result = {
                                ...result,
                                meta: {
                                    code: STATUS_CODE.NOT_FOUND,
                                    message: "Not Found",
                                },
                            };
                            break;
                        case status === STATUS_CODE.TOO_MANY_REQUESTS:
                            result = {
                                ...result,
                                meta: {
                                    code: STATUS_CODE.TOO_MANY_REQUESTS,
                                    message: "Too Many Requests",
                                },
                            };
                            break;
                        case status === STATUS_CODE.UNAUTHORIZED:
                            result = {
                                ...result,
                                meta: {
                                    code: STATUS_CODE.UNAUTHORIZED,
                                    message: "Unauthorized",
                                },
                            };
                            break;
                        case /^5\d{2}$/.test(String(status)):
                            result = {
                                ...result,
                                meta: {
                                    code: STATUS_CODE.INTERNAL_SERVER_ERROR,
                                    message: "Internal Server Error",
                                },
                            };
                            break;
                        default:
                            result = {
                                ...result,
                                response: request.response || {},
                                request: request.response || {},
                                meta: {
                                    code: STATUS_CODE.NETWORK,
                                    message: "Network Error",
                                },
                            };
                    }

                    return Promise.reject(result);
                },
            },
        ],
    },
};

let instance = null;

export const axiosInstance = () => {
    instance =
        instance ||
        axios.create({
            baseURL: "http://localhost:3000",
            responseType: "json",
        });

    return instance;
};

const httpClientMiddleware = () =>
    axiosMiddleware(axiosInstance(), middlewareConfig);
export default httpClientMiddleware;
