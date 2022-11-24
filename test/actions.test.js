import { mockStore } from "./mockStore";
import * as actions from "../src/actions/app";
import { axiosInstance } from "../src/interceptors/config";
import MockAdapter from "axios-mock-adapter";

let instance = null;
let mock = null;

describe("App initialize", () => {
    beforeEach(() => {
        instance = axiosInstance();
        mock = new MockAdapter(instance);
    });

    it("should dispatch get players on start app", async () => {
        const store = mockStore({
            players: null,
        });

        mock.onGet("/players").reply(200);

        await store.dispatch(actions.getPlayers());
        const actionsDispatched = store.getActions();

        expect(actionsDispatched[0]).toEqual({
            type: "FETCH_PLAYERS",
            payload: {
                request: {
                    method: "GET",
                    url: "/players",
                },
            },
        });
    });

    it("should update players", async () => {
        const store = mockStore({
            players: null,
        });

        mock.onGet("/players").reply(200, {
            data: {
                players: [{ name: "player1", team: "team1", score: "123" }],
            },
        });

        await store.dispatch(actions.updatePlayers());
        const actionsDispatched = store.getActions();

        expect(actionsDispatched[0]).toEqual({
            type: "UPDATE_PLAYERS",
            payload: {
                request: {
                    method: "GET",
                    url: "/players",
                },
            },
        });
    });

    it("should add player", () => {
        const player = { name: "player1", team: "team1", score: "123" };

        expect(actions.addPlayer(player)).toEqual({
            type: "ADD_PLAYER",
            payload: {
                request: {
                    method: "POST",
                    url: `/players`,
                    data: player,
                },
            },
        });
    });

    it("should update players afer add player", async () => {
        const player = { name: "player1", team: "team1", score: "123" };

        const store = mockStore({
            players: null,
        });

        mock.onPost("/players").reply(200);

        await store.dispatch(actions.onAddPlayer(player));
        const actionsDispatched = store.getActions();

        expect(actionsDispatched[0]).toEqual({
            type: "ADD_PLAYER",
            payload: {
                request: {
                    method: "POST",
                    url: "/players",
                    data: player,
                },
            },
        });

        expect(actionsDispatched[1].type).toEqual("ADD_PLAYER_SUCCESS");
    });

    it("should delete player", () => {
        const id = 123;

        expect(actions.deletePlayer(id)).toEqual({
            type: "DELETE_PLAYER",
            payload: {
                request: {
                    method: "DELETE",
                    url: `/players/${id}`,
                },
            },
        });
    });

    it("should update players afer delete player", async () => {
        const id = 123;

        const store = mockStore({
            players: null,
        });

        mock.onDelete("/players/123").reply(200);

        await store.dispatch(actions.onDeletePlayer(id));
        const actionsDispatched = store.getActions();

        expect(actionsDispatched[0]).toEqual({
            type: "DELETE_PLAYER",
            payload: {
                request: {
                    method: "DELETE",
                    url: `/players/${id}`,
                },
            },
        });

        expect(actionsDispatched[1].type).toEqual("DELETE_PLAYER_SUCCESS");
        expect(actionsDispatched[2].type).toEqual("UPDATE_PLAYERS");
    });
});
