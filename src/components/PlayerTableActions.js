import React from "react";
import { Icon, Spinner } from "@marketgoo/ola";

const PlayerTableActions = ({
    id,
    handleDeletePlayer,
    handleEditPlayer,
    isLoading,
}) => (
    <div className="table-actions">
        {isLoading ? (
            <Spinner />
        ) : (
            <>
                <button
                    title="Remove player"
                    role={"button"}
                    className="table-action delete"
                    onClick={() => handleDeletePlayer(id)}
                >
                    <Icon name="close" />
                </button>
                <button
                    title="Edit player"
                    role={"button"}
                    className="table-action"
                    onClick={() => handleEditPlayer(id)}
                >
                    <Icon name="user" />
                </button>
            </>
        )}
    </div>
);

export default PlayerTableActions;
