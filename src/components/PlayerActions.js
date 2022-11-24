import React from "react";
import { Icon, Spinner } from "@marketgoo/ola";

const PlayerActions = ({ id, handleDeletePlayer, isLoading }) => (
    <div className="actions">
        {isLoading ? (
            <Spinner />
        ) : (
            <button
                title="Remove player"
                role={"button"}
                className="action delete"
                onClick={() => handleDeletePlayer(id)}
            >
                <Icon name="close" />
            </button>
        )}
    </div>
);

export default PlayerActions;
