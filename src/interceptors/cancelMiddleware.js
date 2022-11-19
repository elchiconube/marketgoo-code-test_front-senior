import * as axios from "axios";
import {
    CANCEL_ACTION_REQUESTS,
    CANCEL_ALL_ACTION_REQUESTS,
    CANCEL_DATA,
} from "../constants";

const cancelRequest = (token) => {
    token.cancel(CANCEL_DATA);
    token.onCancelCallback && token.onCancelCallback();
};

export const createCancellationMiddleware = () => {
    return (store) => {
        let tokensMap = {};

        return (next) => (action) => {
            const { actionType, payload, type } = action;

            if (payload && payload.request && type) {
                const source = axios.CancelToken.source();
                source.onCancelCallback = payload.request.onCancel;

                const cancelableAction = {
                    ...action,
                    payload: {
                        ...payload,
                        request: {
                            ...payload.request,
                            source,
                            cancelToken: source.token,
                        },
                    },
                };

                const actionTokens = tokensMap[type] || [];
                actionTokens.push(source);
                tokensMap[type] = actionTokens;

                return next(cancelableAction);
            }

            if (type === CANCEL_ACTION_REQUESTS) {
                const actionTokens = tokensMap[actionType];
                if (actionTokens) {
                    actionTokens.forEach(cancelRequest);
                    tokensMap[actionType] = [];
                }
            } else if (type === CANCEL_ALL_ACTION_REQUESTS) {
                Object.values(tokensMap).forEach((actionTokens) =>
                    actionTokens.forEach(cancelRequest)
                );
                tokensMap = {};
            }

            return next(action);
        };
    };
};
