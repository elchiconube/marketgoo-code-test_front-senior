import { sortedPlayers } from "../utils";

export const initialState = {
    isLoading: false,
    players: null,
    error: null,
    sorting: { field: "score", order: "desc" },
};

const reducer = (state = initialState, { type, payload, ...action }) => {
    switch (type) {
        case "UPDATE_SORTING":
            return {
                ...state,
                sorting: payload,
                players: sortedPlayers(state.players, payload),
            };
        case "DELETE_PLAYER":
            const id = Number(payload.request.url.split("/").pop());
            const filteredPlayers = state.players.filter(
                (player) => player.id !== id
            );
            return {
                ...state,
                players: sortedPlayers(filteredPlayers, state.sorting),
                isLoading: true,
            };
        case "ADD_PLAYER":
            const newPlayers = [...state.players, payload.request.data];
            return {
                ...state,
                players: sortedPlayers(newPlayers, state.sorting),
                isLoading: true,
            };
        case "FETCH_PLAYERS":
            return {
                ...state,
                isLoading: true,
            };
        case "UPDATE_PLAYERS_SUCCESS":
        case "FETCH_PLAYERS_SUCCESS":
            return {
                ...state,
                isLoading: false,
                players: sortedPlayers(payload.data.data, state.sorting),
            };
        case "ADD_PLAYER_SUCCESS":
        case "DELETE_PLAYER_SUCCESS":
            return {
                ...state,
                isLoading: false,
            };
        case "ADD_PLAYER_FAIL":
        case "DELETE_PLAYER_FAIL":
            return {
                ...state,
                isLoading: false,
                error: action.error.message,
            };
        case "FETCH_PLAYERS_FAIL":
            return {
                ...state,
                isLoading: false,
                players: null,
                error: action.error.message,
            };
        default:
            return state;
    }
};

export default reducer;
