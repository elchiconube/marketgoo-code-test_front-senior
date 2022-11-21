import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import httpClientMiddleware from "../src/interceptors/config";

export const mockStore = configureMockStore([thunk, httpClientMiddleware()]);
