import React from "react";
import { ButtonGroup, Button } from "@marketgoo/ola";

const PlayerActions = ({ showForm, setShowForm, isLoading }) => (
    <ButtonGroup variant="reversed">
        <Button
            icon={showForm ? "close" : "add"}
            variant="pro"
            busy={isLoading && "Loading"}
            onClick={() => setShowForm(!showForm)}
        >
            {showForm ? "Hide form" : "Add player"}
        </Button>
    </ButtonGroup>
);

export default PlayerActions;
