import reducer, { initialState } from "../src/reducers/app";

describe("App reducer", () => {
    it("initialState should be like state", () => {
        expect(
            reducer(undefined, {
                type: null,
                payload: null,
            })
        ).toEqual(initialState);
    });

    it("should set isLoading when fetch players", () => {
        expect(
            reducer(
                {
                    isLoading: false,
                },
                {
                    type: "FETCH_PLAYERS",
                    payload: {
                        request: {
                            method: "GET",
                            url: `/players`,
                        },
                    },
                }
            )
        ).toEqual({
            isLoading: true,
        });
    });

    it("should not set isLoading when update players", () => {
        expect(
            reducer(
                {
                    isLoading: false,
                },
                {
                    type: "UPDATE_PLAYERS",
                    payload: {
                        request: {
                            method: "GET",
                            url: `/players`,
                        },
                    },
                }
            )
        ).toEqual({
            isLoading: false,
        });
    });
});
