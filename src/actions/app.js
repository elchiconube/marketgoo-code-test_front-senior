export const getPlayers = () => ({
    type: "FETCH_PLAYERS",
    payload: {
        request: {
            method: "GET",
            url: `/players`,
        },
    },
});

export const updatePlayers = () => ({
    type: "UPDATE_PLAYERS",
    payload: {
        request: {
            method: "GET",
            url: `/players`,
        },
    },
});

export const addPlayer = (data) => ({
    type: "ADD_PLAYER",
    payload: {
        request: {
            method: "POST",
            url: `/players`,
            data,
        },
    },
});

export const onAddPlayer = (data) => async (dispatch) => {
    const action = await dispatch(addPlayer(data));
    if (action.type === "ADD_PLAYER_SUCCESS") dispatch(updatePlayers());
};

export const deletePlayer = (id) => ({
    type: "DELETE_PLAYER",
    payload: {
        request: {
            method: "DELETE",
            url: `/players/${id}`,
        },
    },
});

export const onDeletePlayer = (id) => async (dispatch) => {
    const action = await dispatch(deletePlayer(id));
    if (action.type === "DELETE_PLAYER_SUCCESS") dispatch(updatePlayers());
};
