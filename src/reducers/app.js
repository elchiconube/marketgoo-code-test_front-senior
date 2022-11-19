export const initialState = {
    isLoading: false,
    players: null,
    error: null,
};

const reducer = (state = initialState, { type, payload, ...action }) => {
    switch (type) {
        case "DELETE_PLAYER":
        case "ADD_PLAYERS":
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
                players: payload.data.data,
            };
        case "ADD_PLAYERS_SUCCESS":
        case "DELETE_PLAYER_SUCCESS":
            return {
                ...state,
                isLoading: false,
            };
        case "ADD_PLAYERS_FAIL":
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
